using Newtonsoft.Json;
using SAP.Middleware.Connector;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading;
using System.Timers;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Serialization;

namespace LTPCwebservice
{
    /// <summary>
    /// WebService1 的摘要说明
    /// </summary>
    [WebService(Description = "轮拖排产系统与SAP接口", Name = "LTPCwebservice", Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    // [System.Web.Script.Services.ScriptService]
    public class WebService1 : System.Web.Services.WebService
    {
        System.Timers.Timer time1;
        int i = 0;
        string g_strType = "";             //调度单是否全新执行，""：全新执行；“cg”：明细采购执行；“bj”：明细钣金执行；“jj”：明细机加执行
        BaseClass bc = new BaseClass();
        #region api登录验证
        /// <summary>
        /// api登录验证
        /// </summary>
        public MySoapHeader header;
        /// <summary>
        /// 验证是安全令牌是否正确
        /// </summary>
        /// <returns></returns>
        private bool IsValiToken()
        {
            bool flag = false;
            string userName = header.UserName;
            string passWord = header.PassWord;

            if (userName == "cc" && passWord == "admin&cc")
            {
                flag = true;
            }
            return flag;
            //return true;
        }
        #endregion

        /// <summary>
        /// 调度单需求分解
        /// </summary>
        /// <param name="strDate">库存日期</param>
        /// <param name="iDID">调度单序号</param>
        /// <param name="strType">调度单执行方式      ""：全新执行；“cg”：明细采购执行；“bj”：明细钣金执行；“jj”：明细机加执行</param>
        [WebMethod(Description = "调度单需求分解")]
        [System.Web.Services.Protocols.SoapHeader("header")]//用户身份验证的soap头 
        public int Dddxqfj(string strDate, int iDID, string strType)
        {
            try
            {
                g_strType = strType.ToLower();
                DataTable dt = new DataTable();
                string strSql = "";
                switch (g_strType)
                {
                    case "":
                        SetStatus("CgStatus", "执行中", iDID);
                        Cgxufj(strDate, "", iDID);
                        SetStatus("CgStatus", "已完成", iDID);
                        bc.WriteLog("调度单采购需求分解完成", "调度单需求分解", "", "", "", iDID.ToString());

                        SetStatus("JjStatus", "执行中", iDID);
                        Jjxufj("", iDID);
                        SetStatus("JjStatus", "已完成", iDID);
                        bc.WriteLog("调度单机加需求分解完成", "调度单需求分解", "", "", "", iDID.ToString());

                        SetStatus("BjStatus", "执行中", iDID);
                        Bjxufj("", iDID);
                        SetStatus("BjStatus", "已完成", iDID);
                        bc.WriteLog("调度单钣金需求分解完成", "调度单需求分解", "", "", "", iDID.ToString());

                        break;
                    case "cg":
                        strSql = "select ID from DdOrder_Det where cgflg = 1 AND did = " + iDID;
                        dt = bc.SearchTableSql(strSql);
                        if (dt.Rows.Count > 0)
                        {
                            SetDetStatusMx("CgStatus", "Cgflg", iDID);
                            Cgxufj(strDate, "", iDID);
                            bc.WriteLog("调度单采购需求分解完成", "调度单需求分解", "", "", "", iDID.ToString());
                        }
                        else
                        {
                            bc.WriteLog("调度单采购需求无需执行", "调度单需求分解", "", "", "", iDID.ToString());
                        }
                        break;
                    case "bj":
                        strSql = "select ID from DdOrder_Det where bjflg = 1 AND did = " + iDID;
                        dt = bc.SearchTableSql(strSql);
                        if (dt.Rows.Count > 0)
                        {
                            SetDetStatusMx("BjStatus", "bjflg", iDID);
                            Bjxufj("", iDID);
                            bc.WriteLog("调度单钣金需求分解完成", "调度单需求分解", "", "", "", iDID.ToString());
                        }
                        else
                        {
                            bc.WriteLog("调度单钣金需求无需执行", "调度单需求分解", "", "", "", iDID.ToString());
                        }
                        break;
                    case "jj":
                        strSql = "select ID from DdOrder_Det where jjflg = 1 AND did = " + iDID;
                        dt = bc.SearchTableSql(strSql);
                        if (dt.Rows.Count > 0)
                        {
                            SetDetStatusMx("JjStatus", "jjflg", iDID);
                            Jjxufj("", iDID);
                            bc.WriteLog("调度单机加需求分解完成", "调度单需求分解", "", "", "", iDID.ToString());
                        }
                        else
                        {
                            bc.WriteLog("调度单机加需求无需执行", "调度单需求分解", "", "", "", iDID.ToString());
                        }
                        break;
                }
            }
            catch (Exception e)
            {
                bc.WriteLog(e.Message.ToString(), "调度单需求分解", "", "异常", "", iDID.ToString());
            }
            finally { }
            return i;
        }

        //变更调度单执行状态
        private void SetStatus(string strType, string strStatus, int iDID)
        {
            string strSql = "update DdOrder SET " + strType + " = '" + strStatus + "' where ID = " + iDID + ";";
            bc.ExecSql(strSql);
        }

        //变更调度单明细执行状态--全新执行
        private void SetDetStatus(string strType, string strStatus, string strDatetime, int iDID)
        {
            string strSql = "update DdOrder_Det SET " + strType + "  = '" + strStatus + "' where DID = " + iDID + " AND Datetime1 = '" + strDatetime + "';";
            bc.ExecSql(strSql);
        }

        //变更调度单明细勾选--明细执行
        private void SetDetFlag(int iDID,string strType)
        {
            string strSql = "update DdOrder_Det SET "+ strType + " = 0 where DID = " + iDID + ";";
            bc.ExecSql(strSql);
        }

        //变更调度单明细执行状态--明细执行
        private void SetDetStatusMx(string strType, string strFlg, int iDID)
        {
            string strSql = "update DdOrder_Det SET " + strType + "  = '执行中' where "+ strFlg + " = 1 and DID = " + iDID + ";";
            bc.ExecSql(strSql);
        }

        //变更IMP表执行状态
        private void SetImpStatus(string strTable, string strType, string strStatus, string strUserCode)
        {
            string strSql = "update " + strTable + " SET " + strType + "  = '" + strStatus + "' where UserCode = '" + strUserCode + "';";
            bc.ExecSql(strSql);
        }

        //变更采购日期
        private void SetCgDateStatus(string strDate, int iDID)
        {
            string strSql = "update DdOrder SET CgBaseTime = '" + strDate + "' where id = " + iDID + ";";
            bc.ExecSql(strSql);
        }


        #region 采购需求分解
        /// <summary>
        /// 采购需求分解
        /// </summary>
        /// <param name="strDate">库存日期</param>
        /// <param name="strUserCode">用户帐号</param>
        /// <param name="iDID">调度单序号</param>
        /// <returns></returns>
        [WebMethod(Description = "采购需求分解")]
        [System.Web.Services.Protocols.SoapHeader("header")]//用户身份验证的soap头
        public bool Cgxufj(string strDate, string strUserCode, int iDID)
        {
            if (this.IsValiToken())
            {
                try
                {
                    DataTable dt1 = new DataTable();
                    DataTable dt2 = new DataTable();
                    DataRow[] matches;
                    string strSql = " ";
                    if (strUserCode.Trim() != "")
                    {
                        SetImpStatus("CgImp", "Status", "执行中", strUserCode);
                        //操作员手工上传需求文件时执行需求分解
                        strSql = "delete from CgInfo where UserCode = '" + strUserCode + "';";
                        bc.ExecSql(strSql);
                        strSql = "select distinct Datetime1 from CgImp where usercode = '" + strUserCode.Trim() + "'; ";
                        dt1 = bc.SearchTableSql(strSql);
                        strSql = "select MATNR,MENGE,Datetime1,SERIES,ID from CgImp where usercode = '" + strUserCode.Trim() + "'; ";
                        dt2 = bc.SearchTableSql(strSql);
                    }
                    else
                    {
                        //调度单展开
                        if (g_strType=="")
                        {
                            strSql = "delete from CgInfo where DID = " + iDID + "; ";
                            bc.ExecSql(strSql);
                            strSql = "select distinct Datetime1 from DdOrder_Det where DID = " + iDID + "; ";
                            dt1 = bc.SearchTableSql(strSql);
                            strSql = "select MATNR,num as MENGE,Datetime1,SERIES,ID from DdOrder_Det where DID = " + iDID + "; ";
                            dt2 = bc.SearchTableSql(strSql);
                        }
                        else
                        {
                            strSql = "select distinct Datetime1 from DdOrder_Det where cgflg = 1 and DID = " + iDID + "; ";
                            dt1 = bc.SearchTableSql(strSql);
                            strSql = "select MATNR,num as MENGE,Datetime1,SERIES,ID from DdOrder_Det where cgflg = 1 and DID = " + iDID + "; ";
                            dt2 = bc.SearchTableSql(strSql);
                            SetDetFlag(iDID, "cgflg");
                        }
                    }
                    if (dt1.Rows.Count > 0)
                    {
                        foreach (DataRow dr in dt1.Rows)
                        {
                            matches = dt2.Select("Datetime1 = '" + dr["Datetime1"].ToString().Trim() + "'");
                            if (matches.Length > 0)
                            {
                                Cgxufj_sap(matches, strDate, strUserCode, iDID);
                            }
                        }
                    }
                }
                catch (Exception e)
                {
                    if (strUserCode != "")
                    {
                        SetImpStatus("CgImp", "Status", "异常", strUserCode);
                    }
                    else
                    {
                        SetStatus("CgStatus", "异常", iDID);
                    }
                    bc.WriteLog(e.Message.ToString(), "采购需求分解接口", strUserCode, "异常", "", iDID.ToString());
                }
                finally { }
            }
            return true;
        }

        private void Cgxufj_sap(DataRow[] matches, string strDate, string strUserCode, int iDID)
        {
            string strDatetime = matches[0]["Datetime1"].ToString().Trim();
            try
            {
                RfcDestination dest = bc.GetDestination();
                //获取RFC
                IRfcFunction ifunc = dest.Repository.CreateFunction("ZCFJHPC_CG");
                //内表赋值

                IRfcTable rfcInputTable1 = ifunc.GetTable("I_INPUT");
                foreach (DataRow dr in matches)
                {
                    rfcInputTable1.Insert();
                    rfcInputTable1.CurrentRow.SetValue("MATNR", dr["MATNR"].ToString().Trim());
                    rfcInputTable1.CurrentRow.SetValue("MENGE", dr["MENGE"]);
                    rfcInputTable1.CurrentRow.SetValue("BUDAT", dr["Datetime1"].ToString().Trim());
                    rfcInputTable1.CurrentRow.SetValue("FLAG", "");
                    rfcInputTable1.CurrentRow.SetValue("SERIES", dr["SERIES"].ToString().Trim());
                }

                //设置输入参数
                ifunc.SetValue("P_BUDAT", strDate);

                //调用RFC
                ifunc.Invoke(dest);
                IRfcTable ENQ = ifunc.GetTable("I_OUTPUT");//返回内表
                DataTable dt = bc.GetDataTableFromRFCTable(ENQ);
                int icount = dt.Rows.Count;
                //将数据更新进数据库
                if (icount > 0)
                {
                    SaveCgData(dt, strUserCode, strDatetime, strDate, iDID);
                }
                else
                {
                    if (strUserCode != "")
                    {
                        SetImpStatus("CgImp", "status", "已完成", strUserCode);
                    }
                    else
                    {
                        SetDetStatus( "cgstatus", "已完成", strDatetime, iDID);
                    }
                }
            }
            catch (Exception e)
            {
                if (strUserCode != "")
                {
                    SetImpStatus("CgImp", "status", "异常", strUserCode);
                }
                else
                {
                    SetDetStatus( "cgstatus", "异常", strDatetime, iDID);
                }
                bc.WriteLog(e.Message.ToString(), "采购需求分解", strUserCode, "异常", "", iDID.ToString());
            }

        }

        /// <summary>
        /// 将采购需求数据更新进数据库
        /// </summary>
        /// <param name="dt"></param>
        /// <param name="strUserCode">用户帐号</param>
        /// <param name="iDID">调度单序号</param>
        private void SaveCgData(DataTable dt, string strUserCode, string strDatetime,string strDate, int iDID)
        {
            try
            {
                string strSql = "";
                ArrayList list = new ArrayList();
                if (g_strType != "")
                {
                    strSql = "delete from CgInfo where Datetime1 = '" + strDatetime + "' and did = " + iDID;
                    list.Add(strSql);
                }
                foreach (DataRow dr in dt.Rows)
                {

                    strSql = "insert CgInfo(Maktx, Matnr, Datetime1, MRP, Meins, Lifnr, Name1, Menge, PEIE, JSKC, CLKC, SHDJ,UserCode,DID,Series) values('"
                        + dr["OJTXP"].ToString().Trim() + "','"
                        + dr["IDNRK"].ToString().Trim() + "','"
                        + dr["BUDAT"].ToString().Trim() + "','"
                        + dr["DISPO"].ToString().Trim() + "','"
                        + dr["MEINS"].ToString().Trim() + "','"
                        + dr["LIFNR"].ToString().Trim() + "','"
                        + dr["NAME1"].ToString().Trim() + "',"
                        + double.Parse(dr["ZXQSL"].ToString().Trim()) + ","
                        + double.Parse(dr["PEIE"].ToString().Trim()) + ","
                        + double.Parse(dr["JSKC"].ToString().Trim()) + ","
                        + double.Parse(dr["CLKC"].ToString().Trim()) + ","
                        + double.Parse(dr["SHDJ"].ToString().Trim()) + ",'"
                        + strUserCode + "',"
                        + iDID + ",'"
                        + dr["SERIES"].ToString().Trim() + "')";
                    list.Add(strSql);
                }
                if (bc.ExecListSql(list))
                {
                    if (strUserCode != "")
                    {
                        SetImpStatus("CgImp", "status", "已完成", strUserCode);
                    }
                    else
                    {
                        SetDetStatus( "cgstatus", "已完成", strDatetime, iDID);
                        SetCgDateStatus(strDate, iDID);
                    }
                }
                else
                {
                    if (strUserCode != "")
                    {
                        SetImpStatus("CgImp", "status", "异常", strUserCode);
                    }
                    else
                    {
                        SetDetStatus( "cgstatus", "异常", strDatetime, iDID);
                    }
                }
            }
            catch (Exception e)
            {
                if (strUserCode != "")
                {
                    SetImpStatus("CgImp", "status", "异常", strUserCode);
                }
                else
                {
                    SetDetStatus( "cgstatus", "异常", strDatetime, iDID);
                }
                bc.WriteLog(e.Message.ToString(), "采购需求分解接口", strUserCode, "异常", strDatetime, iDID.ToString());
            }
        }
        #endregion

        #region 钣金需求分解
        /// <summary>
        /// 钣金需求分解
        /// </summary>
        /// <param name="strUserCode">用户帐号</param>
        /// <param name="iDID">调度单序号</param>
        /// <returns></returns>
        /// <returns></returns>
        [WebMethod(Description = "钣金需求分解")]
        [System.Web.Services.Protocols.SoapHeader("header")]//用户身份验证的soap头
        public bool Bjxufj(string strUserCode, int iDID)
        {
            if (this.IsValiToken())
            {
                try
                {
                    DataTable dt1 = new DataTable();
                    DataTable dt2 = new DataTable();
                    DataRow[] matches;
                    string strSql = " ";
                    if (strUserCode.Trim() != "")
                    {
                        //操作员手工上传需求文件时执行需求分解
                        SetImpStatus("BjImp", "Status", "执行中", strUserCode);
                        strSql = "delete from BjInfo where UserCode = '" + strUserCode + "';";
                        bc.ExecSql(strSql);
                        strSql = "select distinct Datetime1 from BjImp where usercode = '" + strUserCode.Trim() + "'; ";
                        dt1 = bc.SearchTableSql(strSql);
                        strSql = "select MATNR,MENGE,Datetime1,SERIES,ID from BjImp where usercode = '" + strUserCode.Trim() + "'; ";
                        dt2 = bc.SearchTableSql(strSql);
                    }
                    else
                    {
                        //调度单展开
                        if (g_strType == "")
                        {
                            strSql = "delete from BjInfo where DID = " + iDID + "; ";
                            bc.ExecSql(strSql);
                            strSql = "select distinct Datetime1 from DdOrder_Det where DID = " + iDID + "; ";
                            dt1 = bc.SearchTableSql(strSql);
                            strSql = "select MATNR,num as MENGE,Datetime1,SERIES,ID from DdOrder_Det where DID = " + iDID + "; ";
                            dt2 = bc.SearchTableSql(strSql);
                        }
                        else
                        {
                            strSql = "select distinct Datetime1 from DdOrder_Det where bjflg = 1 and DID = " + iDID + "; ";
                            dt1 = bc.SearchTableSql(strSql);
                            strSql = "select MATNR,num as MENGE,Datetime1,SERIES,ID from DdOrder_Det where bjflg = 1 and DID = " + iDID + "; ";
                            dt2 = bc.SearchTableSql(strSql);
                            SetDetFlag(iDID, "bjflg");
                        }
                    }
                    if (dt1.Rows.Count > 0)
                    {
                        foreach (DataRow dr in dt1.Rows)
                        {
                            matches = dt2.Select("Datetime1 = '" + dr["Datetime1"].ToString().Trim() + "'");
                            if (matches.Length > 0)
                            {
                                Bjxufj_sap(matches, strUserCode, iDID);
                            }
                        }
                    }
                }
                catch (Exception e)
                {
                    if (strUserCode != "")
                    {
                        SetImpStatus("BjImp", "Status", "异常", strUserCode);
                    }
                    else
                    {
                        SetStatus("BjStatus", "异常", iDID);
                    }
                    bc.WriteLog(e.Message.ToString(), "钣金需求分解接口", strUserCode, "异常", "", iDID.ToString());
                }
                finally { }
            }
            return true;
        }

        private void Bjxufj_sap(DataRow[] matches, string strUserCode, int iDID)
        {
            string strDatetime = matches[0]["Datetime1"].ToString().Trim();
            try
            {
                RfcDestination dest = bc.GetDestination();
                //获取RFC
                IRfcFunction ifunc = dest.Repository.CreateFunction("ZCFJHPC_BJ");
                //内表赋值

                IRfcTable rfcInputTable1 = ifunc.GetTable("I_INPUT");
                foreach (DataRow dr in matches)
                {
                    rfcInputTable1.Insert();
                    rfcInputTable1.CurrentRow.SetValue("WERKS", "");
                    rfcInputTable1.CurrentRow.SetValue("MATNR", dr["MATNR"].ToString().Trim());
                    rfcInputTable1.CurrentRow.SetValue("MENGE", dr["MENGE"]);
                    rfcInputTable1.CurrentRow.SetValue("BUDAT", dr["Datetime1"].ToString().Trim());
                    rfcInputTable1.CurrentRow.SetValue("SERIES", dr["SERIES"].ToString().Trim());
                }
                //调用RFC
                ifunc.Invoke(dest);
                IRfcTable ENQ = ifunc.GetTable("I_OUTPUT");//返回内表
                DataTable dt = bc.GetDataTableFromRFCTable(ENQ);
                int icount = dt.Rows.Count;
                //将数据更新进数据库
                if (icount > 0)
                {
                    SaveBjData(dt, strUserCode, strDatetime, iDID);
                }
                else
                {
                    if (strUserCode != "")
                    {
                        SetImpStatus("BjImp", "status", "已完成", strUserCode);
                    }
                    else
                    {
                        SetDetStatus( "bjstatus", "已完成", strDatetime, iDID);
                    }
                }
            }
            catch (Exception e)
            {
                if (strUserCode != "")
                {
                    SetImpStatus("BjImp", "status", "异常", strUserCode);
                }
                else
                {
                    SetDetStatus( "bjstatus", "异常", strDatetime, iDID);
                }
                bc.WriteLog(e.Message.ToString(), "钣金需求分解接口", strUserCode, "异常", "", iDID.ToString());
            }
        }

        /// <summary>
        /// 将钣金需求数据更新进数据库
        /// </summary>
        /// <param name="dt"></param>
        /// <param name="strUserCode">用户帐号</param>
        /// <param name="iDID">调度单序号</param>
        private void SaveBjData(DataTable dt, string strUserCode, string strDatetime, int iDID)
        {
            try
            {
                string strSql = "";
                ArrayList list = new ArrayList();
                if (g_strType != "")
                {
                    strSql = "delete from BjInfo where Datetime1 = '" + strDatetime + "' and did = " + iDID;
                    list.Add(strSql);
                }
                foreach (DataRow dr in dt.Rows)
                {
                    strSql = "insert BjInfo(FirstCode, FirstName, SecondCode, SecondName, ThirdCode, ThirdName, FourthCode, FourthName, FifthCode, FifthName, "
                        + "Num1,Num2,Num3,Num4,Num5, Meins,UserCode,DID,Datetime1,Series,Pline1,Pline2,Pline3,Pline4,Pline5,SixthCode,SixthName,Num6,Pline6) values('"
                        + dr["IDNRK1"].ToString().Trim() + "','"
                        + dr["OJTXP1"].ToString().Trim() + "','"
                        + dr["IDNRK2"].ToString().Trim() + "','"
                        + dr["OJTXP2"].ToString().Trim() + "','"
                        + dr["IDNRK3"].ToString().Trim() + "','"
                        + dr["OJTXP3"].ToString().Trim() + "','"
                        + dr["IDNRK4"].ToString().Trim() + "','"
                        + dr["OJTXP4"].ToString().Trim() + "','"
                        + dr["IDNRK5"].ToString().Trim() + "','"
                        + dr["OJTXP5"].ToString().Trim() + "','"
                        + dr["ZXQSL1"].ToString().Trim() + "','"
                        + dr["ZXQSL2"].ToString().Trim() + "','"
                        + dr["ZXQSL3"].ToString().Trim() + "','"
                        + dr["ZXQSL4"].ToString().Trim() + "','"
                        + dr["ZXQSL5"].ToString().Trim() + "','"
                        + dr["MEINS"].ToString().Trim() + "','"
                        + strUserCode + "',"
                        + iDID + ",'"
                        + dr["BUDAT"].ToString().Trim() + "','"
                        + dr["SERIES"].ToString().Trim() + "','"
                        + dr["LTXA1"].ToString().Trim() + "','"
                        + dr["LTXA2"].ToString().Trim() + "','"
                        + dr["LTXA3"].ToString().Trim() + "','"
                        + dr["LTXA4"].ToString().Trim() + "','"
                        + dr["LTXA5"].ToString().Trim() + "','"
                        + dr["IDNRK6"].ToString().Trim() + "','"
                        + dr["OJTXP6"].ToString().Trim() + "','"
                        + dr["ZXQSL6"].ToString().Trim() + "','"
                        + dr["LTXA6"].ToString().Trim() + "')";
                    list.Add(strSql);
                }
                //根据调度单执行需求分解
                
                if (bc.ExecListSql(list))
                {
                    if (strUserCode != "")
                    {
                        SetImpStatus("BjImp", "status", "已完成", strUserCode);
                    }
                    else
                    {
                        SetDetStatus( "bjstatus", "已完成", strDatetime, iDID);
                    }
                }
                else
                {
                    if (strUserCode != "")
                    {
                        SetImpStatus("BjImp", "status", "异常", strUserCode);
                    }
                    else
                    {
                        SetDetStatus( "bjstatus", "异常", strDatetime, iDID);
                    }
                }
            }
            catch (Exception e)
            {
                if (strUserCode != "")
                {
                    SetImpStatus("BjImp", "status", "异常", strUserCode);
                }
                else
                {
                    SetDetStatus( "bjstatus", "异常", strDatetime, iDID);
                }
                bc.WriteLog(e.Message.ToString(), "钣金需求分解接口", strUserCode, "异常", strDatetime, iDID.ToString());
            }
        }

        #endregion

        #region 机加需求分解
        /// <summary>
        /// 机加需求分解
        /// </summary>
        /// <param name="strUserCode">用户帐号</param>
        /// <param name="iDID">调度单序号</param>
        /// <returns></returns>
        /// <returns></returns>
        [WebMethod(Description = "机加需求分解")]
        [System.Web.Services.Protocols.SoapHeader("header")]//用户身份验证的soap头
        public bool Jjxufj(string strUserCode, int iDID)
        {
            if (this.IsValiToken())
            {
                try
                {
                    DataTable dt1 = new DataTable();
                    DataTable dt2 = new DataTable();
                    DataRow[] matches;
                    string strSql = " ";
                    if (strUserCode.Trim() != "")
                    {
                        //操作员手工上传需求文件时执行需求分解
                        SetImpStatus("JjImp", "Status", "执行中", strUserCode);
                        strSql = "delete from JjInfo where UserCode = '" + strUserCode + "';";
                        bc.ExecSql(strSql);
                        strSql = "select distinct Datetime1 from JjImp where usercode = '" + strUserCode.Trim() + "'; ";
                        dt1 = bc.SearchTableSql(strSql);
                        strSql = "select MATNR,MENGE,Datetime1,SERIES,ID from JjImp where usercode = '" + strUserCode.Trim() + "'; ";
                        dt2 = bc.SearchTableSql(strSql);
                    }
                    else
                    {
                        //调度单展开
                        if (g_strType == "")
                        {
                            strSql = "delete from JjInfo where DID = " + iDID + "; ";
                            bc.ExecSql(strSql);
                            strSql = "select distinct Datetime1 from DdOrder_Det where DID = " + iDID + "; ";
                            dt1 = bc.SearchTableSql(strSql);
                            strSql = "select MATNR,num as MENGE,Datetime1,SERIES,ID from DdOrder_Det where DID = " + iDID + "; ";
                            dt2 = bc.SearchTableSql(strSql);
                        }
                        else
                        {
                            strSql = "select distinct Datetime1 from DdOrder_Det where jjflg = 1 and DID = " + iDID + "; ";
                            dt1 = bc.SearchTableSql(strSql);
                            strSql = "select MATNR,num as MENGE,Datetime1,SERIES,ID from DdOrder_Det where jjflg = 1 and DID = " + iDID + "; ";
                            dt2 = bc.SearchTableSql(strSql);
                            SetDetFlag(iDID,"jjflg");
                        }
                    }
                    if (dt1.Rows.Count > 0)
                    {
                        foreach (DataRow dr in dt1.Rows)
                        {
                            matches = dt2.Select("Datetime1 = '" + dr["Datetime1"].ToString().Trim() + "'");
                            if (matches.Length > 0)
                            {
                                Jjxufj_sap(matches, strUserCode, iDID);
                            }
                        }
                    }
                }
                catch (Exception e)
                {
                    if (strUserCode != "")
                    {
                        SetImpStatus("jjImp", "Status", "异常", strUserCode);
                    }
                    else
                    {
                        SetStatus("jjStatus", "异常", iDID);
                    }
                    bc.WriteLog(e.Message.ToString(), "机加需求分解接口", strUserCode, "异常", "", iDID.ToString());
                }
                finally { }
            }
            return true;
        }

        private void Jjxufj_sap(DataRow[] matches, string strUserCode, int iDID)
        {
            string strDatetime = matches[0]["Datetime1"].ToString().Trim();
            try
            {
                RfcDestination dest = bc.GetDestination();
                //获取RFC
                IRfcFunction ifunc = dest.Repository.CreateFunction("ZCFJHPC_JJ");
                //内表赋值

                IRfcTable rfcInputTable1 = ifunc.GetTable("I_INPUT");
                foreach (DataRow dr in matches)
                {
                    rfcInputTable1.Insert();
                    rfcInputTable1.CurrentRow.SetValue("WERKS", "1401");
                    rfcInputTable1.CurrentRow.SetValue("MATNR", dr["MATNR"].ToString().Trim());
                    rfcInputTable1.CurrentRow.SetValue("MENGE", dr["MENGE"]);
                    rfcInputTable1.CurrentRow.SetValue("SERIES", dr["SERIES"].ToString().Trim());
                    rfcInputTable1.CurrentRow.SetValue("BUDAT", dr["Datetime1"].ToString().Trim());
                }
                //调用RFC
                ifunc.Invoke(dest);
                IRfcTable ENQ = ifunc.GetTable("I_OUTPUT");//返回内表
                DataTable dt = bc.GetDataTableFromRFCTable(ENQ);
                int icount = dt.Rows.Count;
                //将数据更新进数据库
                if (icount > 0)
                {
                    SaveJjData(dt, strUserCode, strDatetime, iDID);
                }
                else
                {
                    if (strUserCode != "")
                    {
                        SetImpStatus("JjImp", "status", "已完成", strUserCode);
                    }
                    else
                    {
                        SetDetStatus( "JjStatus", "已完成", strDatetime, iDID);
                    }
                }
            }
            catch (Exception e)
            {
                if (strUserCode != "")
                {
                    SetImpStatus("JjImp", "status", "异常", strUserCode);
                }
                else
                {
                    SetDetStatus( "JjStatus", "异常", strDatetime, iDID);
                }
                bc.WriteLog(e.Message.ToString(), "机加需求分解接口", strUserCode, "异常", strDatetime, iDID.ToString());
            }
        }

        /// <summary>
        /// 将机加需求数据更新进数据库
        /// </summary>
        /// <param name="dt"></param>
        /// <param name="strUserCode">用户帐号</param>
        /// <param name="iDID">调度单序号</param>
        private void SaveJjData(DataTable dt, string strUserCode, string strDatetime, int iDID)
        {
            try
            {
                string strSql = "";
                ArrayList list = new ArrayList();
                if (g_strType != "")
                {
                    strSql = "delete from JjInfo where Datetime1 = '" + strDatetime + "' and did = " + iDID;
                    list.Add(strSql);
                }
                foreach (DataRow dr in dt.Rows)
                {
                    strSql = "insert JjInfo(Matnr, Maktx, Menge, MRP, Meins,UserCode,DID,Datetime1,Series) values('"
                        + dr["MATNR"].ToString().Trim() + "','"
                        + dr["MAKTX"].ToString().Trim() + "','"
                        + dr["ZXQSL"].ToString().Trim() + "','"
                        + dr["POTX1"].ToString().Trim() + "','"
                        + dr["MEINS"].ToString().Trim() + "','"
                        + strUserCode + "',"
                        + iDID + ",'"
                        + dr["BUDAT"].ToString().Trim() + "','"
                        + dr["SERIES"].ToString().Trim() + "')";
                    list.Add(strSql);
                }
                //根据调度单执行需求分解
                if (bc.ExecListSql(list))
                {
                    if (strUserCode != "")
                    {
                        SetImpStatus("JjImp", "status", "已完成", strUserCode);
                    }
                    else
                    {
                        SetDetStatus( "Jjstatus", "已完成", strDatetime, iDID);
                    }
                }
                else
                {
                    if (strUserCode != "")
                    {
                        SetImpStatus("JjImp", "status", "异常", strUserCode);
                    }
                    else
                    {
                        SetDetStatus( "Jjstatus", "异常", strDatetime, iDID);
                    }
                }
            }
            catch (Exception e)
            {
                if (strUserCode != "")
                {
                    SetImpStatus("JjImp", "status", "异常", strUserCode);
                }
                else
                {
                    SetDetStatus( "Jjstatus", "异常", strDatetime, iDID);
                }
                bc.WriteLog(e.Message.ToString(), "机加需求分解接口", strUserCode, "异常", strDatetime, iDID.ToString());
            }
        }
        #endregion

        #region 物料及BOM有效性检查
        /// <summary>
        /// 物料及BOM有效性检查
        /// </summary>
        /// <param name="strType">类型：ddh 调度单；cg 采购需求单；jj 机加需求单； bj 钣金需求单</param>
        /// <param name="strUserCode">strType为cg jj bj时，需指定</param>
        /// <param name="iDID">strType 为ddh时，需指定</param>
        /// <returns>code=200 表示执行成功</returns>
        [XmlInclude(typeof(Chk))]
        [WebMethod(Description = "物料及BOM有效性检查")]
        [System.Web.Services.Protocols.SoapHeader("header")]//用户身份验证的soap头        
        public string ChkSap(string strType, string strUserCode, int iDID)
        {
            Chk chk = new Chk();
            chk.code = "400";
            if (this.IsValiToken())
            {
                try
                {
                    RfcDestination dest = bc.GetDestination();
                    //获取RFC
                    IRfcFunction ifunc = dest.Repository.CreateFunction("ZCFJHPC_CHK");
                    //内表赋值
                    string strSql = "select MATNR from ";
                    switch (strType.Trim())
                    {
                        case "ddh":
                            strSql += "  DdOrder_Det where did = " + iDID;
                            break;
                        case "cg":
                            strSql += "  CgImp where usercode = '" + strUserCode + "'"; ;
                            break;
                        case "jj":
                            strSql += "  JjImp where usercode = '" + strUserCode + "'"; ;
                            break;
                        case "bj":
                            strSql += "  BjImp where usercode = '" + strUserCode + "'"; ;
                            break;
                    }
                    DataTable dataTable = bc.SearchTableSql(strSql);
                    if (dataTable.Rows.Count > 0)
                    {
                        IRfcTable rfcInputTable1 = ifunc.GetTable("I_INPUT");
                        foreach (DataRow dr in dataTable.Rows)
                        {
                            rfcInputTable1.Insert();
                            rfcInputTable1.CurrentRow.SetValue("WERKS", "1401");
                            rfcInputTable1.CurrentRow.SetValue("MATNR", dr["MATNR"].ToString().Trim());
                            rfcInputTable1.CurrentRow.SetValue("MSG", "");
                            rfcInputTable1.CurrentRow.SetValue("ETYPE", "");
                        }

                        //调用RFC
                        ifunc.Invoke(dest);
                        IRfcTable ENQ = ifunc.GetTable("I_OUTPUT");//返回内表
                        DataTable dt = bc.GetDataTableFromRFCTable(ENQ);
                        int icount = dt.Rows.Count;
                        //将数据更新进数据库
                        if (icount > 0)
                        {
                            chk.code = "200";
                            List<SapResulr> list = new List<SapResulr>();
                            foreach (DataRow dr in dt.Rows)
                            {
                                SapResulr sapResulr = new SapResulr();
                                sapResulr.matnr = dr["MATNR"].ToString().Trim();
                                sapResulr.msg = dr["MSG"].ToString().Trim();
                                sapResulr.etype = dr["ETYPE"].ToString().Trim();
                                list.Add(sapResulr);
                            }
                            chk.sapResulrs = list;
                        }
                    }
                }
                catch (Exception e)
                {
                    bc.WriteLog(e.Message.ToString() + "strType='" + strType + "';"
                        + "UserCode=" + strUserCode.ToString() + "", "物料及BOM有效性检查", strUserCode, "异常", "", iDID.ToString());
                }
            }
            string json = JsonConvert.SerializeObject(chk);
            return json;
        }
        #endregion

        #region 获取库存
        /// <summary>
        /// 获取库存
        /// </summary>
        /// <param name="strKcDate">库存日期  格式20200101</param>
        /// <param name="strUserCode">根据usercode同步库存，必输</param>
        /// <param name="iDID">根据DID同步库存,默认为空，多个DID用逗号隔开：  1,2,3 </param>
        /// <param name="strDateB">开始日期  格式2020-01-01</param>
        /// <param name="strDateE">截至日期  格式2020-01-01</param>
        /// <param name="strSeries">系列</param>
        /// <param name="strMrp">MRP控制者</param>
        /// <param name="strMatnr">物料编码</param>
        /// <param name="strLifnr">供应商代码</param>
        /// <returns>SapKc.code=200 表示执行成功</returns>
        [XmlInclude(typeof(SapKc))]
        [WebMethod(Description = "获取库存")]
        [System.Web.Services.Protocols.SoapHeader("header")]//用户身份验证的soap头        
        public string GetKc(string strKcDate, string strUserCode, string iDID, string strDateB, string strDateE, string strSeries, string strMrp, string strMatnr, string strLifnr)
        {
            string strSql = "select * from CGINFO ";
            string strWhere = " WHERE 1 = 1 ";
            string json = "";
            SapKc sapKc = new SapKc();
            sapKc.code = "400";
            if (this.IsValiToken())
            {
                if (strKcDate != "")
                {
                    try
                    {
                        if (bc.IsLegal(strSeries) && bc.IsLegal(strMrp) && bc.IsLegal(strMatnr) && bc.IsLegal(strLifnr) && bc.IsLegal(strUserCode))
                        {
                            RfcDestination dest = bc.GetDestination();
                            //获取RFC
                            IRfcFunction ifunc = dest.Repository.CreateFunction("ZCFJHPC_GETKC");
                            //内表赋值
                           
                            if (iDID != "")
                            {
                                strWhere += "  AND did in (" + iDID + ")";
                            }
                            else
                            {
                                if (strUserCode != "")
                                {
                                    strWhere += "  AND usercode = '" + strUserCode + "'"; ;
                                }
                                else
                                {
                                    sapKc.msg = "请输入iDID或者strUserCode";
                                    json = JsonConvert.SerializeObject(sapKc);
                                    return json;
                                }
                            }
                            if (strSeries != "")
                            {
                                strWhere += "  AND Series = '" + strSeries + "'"; ;
                            }
                            if (strMrp != "")
                            {
                                strWhere += "  AND Mrp = '" + strMrp + "'"; ;
                            }
                            if (strMatnr != "")
                            {
                                strWhere += "  AND Matnr = '" + strMatnr + "'"; ;
                            }
                            if (strLifnr != "")
                            {
                                strWhere += "  AND Lifnr = '" + strLifnr + "'"; ;
                            }
                            strSql = strSql + strWhere;

                            DataTable dataTable = bc.SearchTableSql(strSql);
                            if (dataTable.Rows.Count > 0)
                            {

                                //清空cginfo_KC对应数据
                                strSql = "DELETE FROM cginfo_KC WHERE USERCODE = '" + strUserCode + "';";
                                bc.ExecSql(strSql);

                                //设置输入参数
                                ifunc.SetValue("P_BUDAT", strKcDate);

                                //设置输入内表
                                IRfcTable rfcInputTable1 = ifunc.GetTable("I_INPUT");
                                foreach (DataRow dr in dataTable.Rows)
                                {
                                    rfcInputTable1.Insert();
                                    rfcInputTable1.CurrentRow.SetValue("KUNNR", dr["LIFNR"].ToString().Trim());
                                    rfcInputTable1.CurrentRow.SetValue("MATNR", dr["MATNR"].ToString().Trim());
                                }

                                //调用RFC
                                ifunc.Invoke(dest);
                                IRfcTable ENQ = ifunc.GetTable("I_OUTPUT");//返回内表
                                DataTable dt = bc.GetDataTableFromRFCTable(ENQ);
                                int icount = dt.Rows.Count;
                                //将数据更新进数据库
                                if (icount > 0)
                                {
                                    ArrayList list = new ArrayList();
                                    //const int ii = 5000;
                                    //int iTimes = 0;
                                    //int isum = 0;
                                    //int isum1 = 0;
                                    //int i1 = 0;
                                    //iTimes = icount / ii + 1;
                                    //for (int i = 0; i < icount; i++)
                                    //{
                                    //    DataRow dr = dt.Rows[i];
                                    //    isum1++;
                                    //    isum++;
                                    //    strSql = "update cginfo set JSKC = " + dr["JSKC"].ToString().Trim() + ", CLKC = " + dr["CLKC"].ToString().Trim() + " "
                                    //      + strWhere + " AND MATNR = '" + dr["MATNR"].ToString().Trim() + "'  AND LIFNR = '" + dr["LIFNR"].ToString().Trim() + "' ";
                                    //    list.Add(strSql);
                                    //    if (isum == ii)
                                    //    {
                                    //        isum = 0;
                                    //        i1++;
                                    //        bc.ExecListSql(list);
                                    //        list.Clear();
                                    //    }
                                    //    if (isum1 == icount)
                                    //    {
                                    //        bc.ExecListSql(list);
                                    //        break;
                                    //    }
                                    //}

                                    foreach (DataRow dr in dt.Rows)
                                    {
                                        strSql = "insert into cginfo_KC(Matnr,Lifnr,JSKC, CLKC,USERCODE,CgBaseTime) values('"
                                            + dr["MATNR"].ToString().Trim() + "','"
                                            + dr["LIFNR"].ToString().Trim() + "',"
                                            + dr["JSKC"].ToString().Trim() + ","
                                            + dr["CLKC"].ToString().Trim() + ",'"
                                            + strUserCode + "','"
                                            + strKcDate + "');";

                                        list.Add(strSql);
                                    }
                                    if (bc.ExecListSql(list))
                                    {
                                        //if (iDID != "")
                                        //{
                                        //    strSql = "update DdOrder set CgBaseTime = '" + strKcDate + "' where id in (" + iDID + ");";
                                        //    bc.ExecSql(strSql);
                                        //}
                                        sapKc.code = "200";
                                        sapKc.msg = "更新完成";
                                    }
                                    else
                                    {
                                        sapKc.msg = "更新失败";
                                    }
                                }
                            }
                        }
                        else
                        {
                            sapKc.msg = "非法输入";
                            bc.WriteLog("非法输入", "获取库存", strUserCode, "异常", "", iDID);
                        }
                    }
                    catch (Exception e)
                    {
                        sapKc.msg = "更新失败";
                        bc.WriteLog(e.Message.ToString() + ";"
                            + "UserCode=" + strUserCode.ToString() + "", "获取库存", strUserCode, "异常", "", iDID);
                    }
                }
                else
                {
                    sapKc.msg = "请输入库存日期";
                }
            }
            json = JsonConvert.SerializeObject(sapKc);
            return json;
        }

        #endregion
        /// <summary>
        /// 头部验证
        /// </summary>
        public class MySoapHeader : SoapHeader
        {
            //账号
            public string UserName { get; set; }
            //密码
            public string PassWord { get; set; }
        }

        //物料及BOM有效性检查
        /// <summary>
        /// 物料及BOM有效性检查
        /// </summary>
        [Serializable]
        public class Chk
        {
            public string code { get; set; }

            public List<SapResulr> sapResulrs { get; set; }
        }

        /// <summary>
        /// 物料及BOM有效性检查
        /// </summary>
        [Serializable]
        public class SapResulr
        {
            //物料号
            public string matnr { get; set; }
            //信息
            public string msg { get; set; }
            //信息类型
            public string etype { get; set; }
        }

        /// <summary>
        /// 库存
        /// </summary>
        [Serializable]
        public class SapKc
        {
            public string code { get; set; }
            //信息
            public string msg { get; set; }
        }
    }
}