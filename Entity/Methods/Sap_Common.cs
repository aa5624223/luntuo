using Entity.luntuo;
using Entity.MsgEntiry;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using project_Lw_Utils;
using SAP.Middleware.Connector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;


namespace Entity.Methods
{
    class Sap_Common
    {

        #region 接口实现

        /// <summary>
        /// 钣金需求分解
        /// 1.传值用户账号时，使用的非调度单展开Imp表
        /// 2.strUserCode 为空字符串时，使用iDID 为调度单展开
        /// 两个参数必须传值一个
        /// </summary>
        /// <param name="strUserCode">用户账号</param>
        /// <param name="iDID">调度单号</param>
        /// <param name="isNews">是否全新执行</param>
        /// <returns></returns>
        public MsgInfo Bjxufj(string strUserCode, int iDID ,bool isNews, string ConnPath)
        {
            MsgInfo msg = new MsgInfo();
            //传值没有完整
            if (string.IsNullOrEmpty(strUserCode) && iDID<=0)
            {
                msg.Code = 400;
                msg.Info = "用户编号、调度单ID传值都为空";
                return msg;
            }
            List<string> sqls = new List<string>();
            if (!string.IsNullOrEmpty(strUserCode))//Imp展开
            {
                strUserCode = strUserCode.Trim();//去空格
                //更新中间表状态未执行中
                string sql = $" UPDATE BjImp SET Status = '执行中' WHERE UserCode = '{strUserCode}' ";
                sqls.Add(sql);
                //删除掉生成的数据
                sql = $"DELETE FROM BjInfo Where UserCode = '{strUserCode}'  ";
                sqls.Add(sql);
                //执行事务
                bool flg = Common.OptCommond(sqls, ConnPath);
                if (!flg)
                {
                    msg.Code = 500;
                    msg.Info = "执行BjImp表、或BjInfo表错误";
                    return msg;
                }
                //查出所有的日期
                sql = $"SELECT DISTINCT Datetime1 FROM BjImp WHERE UserCode = '{strUserCode}' ";
                JObject joBean =  Common.findCommond(sql,typeof(BjImp),1,99999, ConnPath);
                List<BjImp> Dates = JsonConvert.DeserializeObject<List<BjImp>>(joBean["BjImp"].ToString());
                //查询出明细数据
                sql = $"SELECT MATNR,MENGE,Datetime1,SERIES,ID FROM BjImp WHERE usercode = '{strUserCode}'; ";
                joBean = Common.findCommond(sql, typeof(BjImp), 1, 99999, ConnPath);
                List<BjImp> Beans = JsonConvert.DeserializeObject<List<BjImp>>(joBean["BjImp"].ToString());
                
                foreach (BjImp dateBean in Dates)
                {
                    List<BjImp> newBeans = Beans.FindAll(t=>t.Datetime1==dateBean.Datetime1);
                    if (newBeans.Count > 0)
                    {
                        //SAP
                    }
                }
            }
            else//调度单展开
            {
                List<DdOrder_Det> Dates;
                List<DdOrder_Det> Beans;
                if (isNews)//全新执行 需要删除之前的数据
                {
                    string sql = sql = $"DELETE FROM BjInfo WHERE DID = {iDID}  ";
                    //查询出所有日期
                    sql = $"SELECT DISTINCT Datetime1 FROM DdOrder_Det WHERE DID = {iDID} ";
                    JObject joBean = Common.findCommond(sql, typeof(DdOrder_Det), 1, 99999, ConnPath);
                    Dates = JsonConvert.DeserializeObject<List<DdOrder_Det>>(joBean["BjImp"].ToString());
                    //查询出明细数据
                    sql = $"SELECT Matnr,num as MENGE,Datetime1,SERIES,ID from DdOrder_Det where DID = {iDID} ";
                    joBean = Common.findCommond(sql, typeof(DdOrder_Det), 1, 99999, ConnPath);
                    Beans = JsonConvert.DeserializeObject<List<DdOrder_Det>>(joBean["DdOrder_Det"].ToString());
                }
                else//非全新执行
                {
                    string sql = $"SELECT DISTINCT Datetime1 FROM DdOrder_Det WHERE bjflg = 1 and DID = {iDID} ";
                    JObject joBean = Common.findCommond(sql, typeof(DdOrder_Det), 1, 99999, ConnPath);
                    Dates = JsonConvert.DeserializeObject<List<DdOrder_Det>>(joBean["BjImp"].ToString());

                    sql = $"select MATNR,num as MENGE,Datetime1,SERIES,ID from DdOrder_Det where bjflg = 1 and DID ={iDID} ";
                    joBean = Common.findCommond(sql, typeof(DdOrder_Det), 1, 99999, ConnPath);
                    Beans = JsonConvert.DeserializeObject<List<DdOrder_Det>>(joBean["DdOrder_Det"].ToString());
                }

            }
            return null;
        }

        #endregion

        #region SAP连接相关

        /// <summary>
        /// 通过数据库的配置
        /// 获取SAP的链接
        /// </summary>
        /// <param name="ConnPath"></param>
        /// <returns></returns>
        private RfcDestination getSapConnectiton(string ConnPath)
        {
            //查询数据库中的SAP配置
            string strSql = "select top 1 CLIENT, [SERVER], [USER], PASSWORD, SYSTEMID, NUMBER, LANGUAGE from conn";
            string ConnStr = Lw_Utils.getConnStr2(ConnPath, "SAP");
            SqlConnection conn = new SqlConnection(ConnStr);
            SqlDataAdapter ada = null;
            try
            {
                conn.Open();
                ada = new SqlDataAdapter(strSql, conn);
                DataSet ds = new DataSet();
                ada.Fill(ds);
                if (ds.Tables.Count == 0 || ds.Tables[0].Rows.Count==0)
                {
                    return null;
                }
                DataRow dr = ds.Tables[0].Rows[0];
                SapConn.SapConn bean = new SapConn.SapConn();
                //获取数据库的配置
                bean.SERVER = dr["SERVER"].ToString().Trim();
                bean.NUMBER = dr["NUMBER"].ToString().Trim();
                bean.NUMBER = dr["USER"].ToString().Trim();
                bean.NUMBER = dr["PASSWORD"].ToString().Trim();
                bean.NUMBER = dr["LANGUAGE"].ToString().Trim();
                bean.NUMBER = dr["NUMBER"].ToString().Trim();
                //获取静态配置
                bean.Name = "ECC";
                bean.SystemID = "ED1";
                bean.PoolSize = "5";
                bean.MaxPoolSize = "10";
                bean.IdleTimeout = "30";
                bean.Codepage = "8400";
                //设置SAP连接
                RfcConfigParameters configParams = SetSapConnectiton(bean);
                RfcDestination dest = RfcDestinationManager.GetDestination(configParams);
                return dest;
            }
            catch(Exception _e)
            {
                throw _e;
            }
            finally
            {
                if (conn != null && conn.State != System.Data.ConnectionState.Closed)
                {
                    conn.Close();
                }
                if (ada != null)
                {
                    ada.Dispose();
                }
            }
        }
        /// <summary>
        /// 通过实体类设置 并且放回 SAP的连接
        /// </summary>
        /// <param name="bean"></param>
        /// <returns></returns>
        private RfcConfigParameters SetSapConnectiton(SapConn.SapConn bean)
        {
            RfcConfigParameters configParams = new RfcConfigParameters();

            #region 数据库配置的字段

            configParams.Add(RfcConfigParameters.AppServerHost,bean.SERVER);
            configParams.Add(RfcConfigParameters.SystemNumber, bean.NUMBER);
            configParams.Add(RfcConfigParameters.User, bean.USER);
            configParams.Add(RfcConfigParameters.Password, bean.PASSWORD);
            configParams.Add(RfcConfigParameters.Client, bean.CLIENT);
            configParams.Add(RfcConfigParameters.Language, bean.LANGUAGE);

            #endregion

            #region 静态配置的字段

            configParams.Add(RfcConfigParameters.Name, "5");
            configParams.Add(RfcConfigParameters.Name, "10");
            configParams.Add(RfcConfigParameters.Name, "30");
            configParams.Add(RfcConfigParameters.Name, "8400");

            #endregion

            return configParams;
        }

        

        private bool Bjxufj_sap(List<BjImp> beans,string strUserCode,int iDID, string ConnPath)
        {
            string strDatetime = beans[0].Datetime1;
            try
            {
                //获取连接
                RfcDestination dest = getSapConnectiton(ConnPath);
                //获取函数
                IRfcFunction ifunc = dest.Repository.CreateFunction("ZCFJHPC_BJ_TEST20210803");
                IRfcTable rfcInputTable1 = ifunc.GetTable("I_INPUT");
                foreach (BjImp bean in beans)
                {
                    rfcInputTable1.Insert();
                    rfcInputTable1.CurrentRow.SetValue("WERKS", "");
                    rfcInputTable1.CurrentRow.SetValue("MATNR", bean.Matnr.Trim());
                    rfcInputTable1.CurrentRow.SetValue("MENGE", bean.Menge);
                    rfcInputTable1.CurrentRow.SetValue("BUDAT", bean.Datetime1.Trim());
                    rfcInputTable1.CurrentRow.SetValue("SERIES", bean.Series.Trim());
                }
                //调用RFC
                ifunc.Invoke(dest);
                IRfcTable ENQ = ifunc.GetTable("I_OUTPUT");//返回内表
                //DataTable dt = bc.GetDataTableFromRFCTable(ENQ);
                //int icount = dt.Rows.Count;

            }
            catch (Exception _e)
            {
                throw _e;
            }
            return true;
        }

        #endregion

        #region SAP工具方法

        /// <summary>
        /// frcTable转成datatable
        /// </summary>
        /// <param name="myrfcTable"></param>
        /// <returns></returns>
        public DataTable GetDataTableFromRFCTable(IRfcTable myrfcTable)

        {

            DataTable loTable = new DataTable();

            int liElement = 0;

            for (liElement = 0; liElement <= myrfcTable.ElementCount - 1; liElement++)

            {

                RfcElementMetadata metadata = myrfcTable.GetElementMetadata(liElement);

                loTable.Columns.Add(metadata.Name);

            }

            foreach (IRfcStructure Row in myrfcTable)

            {

                DataRow ldr = loTable.NewRow();

                for (liElement = 0; liElement <= myrfcTable.ElementCount - 1; liElement++)

                {

                    RfcElementMetadata metadata = myrfcTable.GetElementMetadata(liElement);

                    ldr[metadata.Name] = Row.GetString(metadata.Name);

                }

                loTable.Rows.Add(ldr);

            }

            return loTable;

        }

        #endregion

    }
}
