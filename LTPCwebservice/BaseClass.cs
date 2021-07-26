using System;
using System.Collections.Generic;
//using System.Linq;
using System.Web;
using System.Collections;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using SAP.Middleware.Connector;
using SAPTableFactoryCtrl;

namespace LTPCwebservice
{
    public class BaseClass
    {

        #region SQLSERVER操作
        //获取数据库链接
        public SqlConnection Get_con()
        {
            SqlConnection con = new SqlConnection(ConfigurationManager.AppSettings["DBConncetion"]);
            return con;
        }

        //获取数据库链接
        public SqlConnection Get_conSap()
        {
            SqlConnection con = new SqlConnection(ConfigurationManager.AppSettings["DBConncetionSap"]);
            return con;
        }

        // 查询SQLSERVER返回单条数据以‘@’ 号隔开
        public string SearchOneSql(string strSql)
        {
            string strReturn = "";
            try
            {
                SqlConnection con = Get_con();
                con.Open();
                SqlCommand cmd = new SqlCommand(strSql, con);
                try
                {
                    cmd.CommandTimeout = 0;
                    cmd.ExecuteNonQuery();
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        if (dr.Read())
                        {
                            for (int i = 0; i < dr.FieldCount; i++)
                            {
                                strReturn += dr[i].ToString() + "@";
                            }
                            strReturn = strReturn.Substring(0, strReturn.Length - 1);
                        }
                    }
                    con.Close();
                    cmd.Dispose();
                }
                catch (Exception e)
                {
                    // WriteLog(e.Message.ToString());
                }
            }
            catch
            {
                return strReturn;
            }
            return strReturn;
        }

        // 查询SQLSERVER返回DataTable
        public DataTable SearchTableSqlSap(string strSql)
        {
            DataSet ds = new DataSet();
            DataTable dt = new DataTable();
            try
            {
                SqlConnection con = Get_conSap();
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(strSql, con);
                sda.SelectCommand.CommandTimeout = 0;
                try
                {
                    sda.Fill(ds);
                    if (ds.Tables.Count > 0)
                    {
                        dt = ds.Tables[0];
                    }
                    con.Close();
                    sda.Dispose();
                }
                catch (Exception e)
                {
                    // WriteLog(e.Message.ToString());
                    throw e;
                }
            }
            catch
            {
                return dt;
            }
            return dt;
        }

        // 查询SQLSERVER返回DataTable
        public DataTable SearchTableSql(string strSql)
        {
            DataSet ds = new DataSet();
            DataTable dt = new DataTable();
            try
            {
                SqlConnection con = Get_con();
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(strSql, con);
                sda.SelectCommand.CommandTimeout = 0;
                try
                {
                    sda.Fill(ds);
                    if (ds.Tables.Count > 0)
                    {
                        dt = ds.Tables[0];
                    }
                    con.Close();
                    sda.Dispose();
                }
                catch (Exception e)
                {
                    // WriteLog(e.Message.ToString());
                    throw e;
                }
            }
            catch
            {
                return dt;
            }
            return dt;
        }

        //执行SQLSERVER数据库插入\更新\删除操作
        public bool ExecSql(string strSql)
        {
            try
            {
                string strSql1 = "";
                SqlConnection con = Get_con();
                con.Open();
                SqlTransaction transaction = null;
                transaction = con.BeginTransaction();
                try
                {
                    SqlCommand cmd;
                    cmd = new SqlCommand(strSql, con);
                    cmd.Connection = con;
                    cmd.Transaction = transaction;
                    cmd.ExecuteNonQuery();
                    cmd.CommandTimeout = 0;
                    transaction.Commit();
                    con.Close();
                    return true;
                }
                catch (Exception e)
                {
                    transaction.Rollback();
                    // WriteLog(e.Message.ToString() + strSql1);
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }

        //执行SQLSERVER数据库插入\更新\删除操作
        public bool ExecListSql(ArrayList listSql)
        {
            try
            {
                string strSql1 = "";
                SqlConnection con = Get_con();
                con.Open();
                SqlTransaction transaction = null;
                transaction = con.BeginTransaction();
                try
                {
                    SqlCommand cmd;
                    foreach (string strSql in listSql)
                    {
                        strSql1 = strSql;
                        cmd = new SqlCommand(strSql, con);
                        cmd.Connection = con;
                        cmd.Transaction = transaction;
                        cmd.ExecuteNonQuery();
                        cmd.CommandTimeout = 0;
                    }
                    transaction.Commit();
                    con.Close();
                    return true;
                }
                catch (Exception e)
                {
                    transaction.Rollback();
                    // WriteLog(e.Message.ToString() + strSql1);
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }
        #endregion

        //读取txt文件的内容
        public string GetInterIDList(string strfile)
        {
            string strout;
            strout = "";
            if (!File.Exists(System.Web.HttpContext.Current.Server.MapPath(strfile)))
            {
                strout = "ERROR";
            }
            else
            {
                StreamReader sr = new StreamReader(System.Web.HttpContext.Current.Server.MapPath(strfile), System.Text.Encoding.Default);
                String input = sr.ReadToEnd();
                sr.Close();
                strout = input;
            }
            return strout;
        }

        //序列化
        public byte[] SerializeObject(object pObj)
        {
            if (pObj == null)
                return null;
            System.IO.MemoryStream memoryStream = new System.IO.MemoryStream();
            BinaryFormatter formatter = new BinaryFormatter();
            formatter.Serialize(memoryStream, pObj);
            memoryStream.Position = 0;
            byte[] read = new byte[memoryStream.Length];
            memoryStream.Read(read, 0, read.Length);
            memoryStream.Close();
            return read;
        }

        //反序列化
        public object DeserializeObject(byte[] pBytes)
        {
            object newOjb = null;
            if (pBytes == null)
            {
                return newOjb;
            }


            System.IO.MemoryStream memoryStream = new System.IO.MemoryStream(pBytes);
            memoryStream.Position = 0;
            BinaryFormatter formatter = new BinaryFormatter();
            newOjb = formatter.Deserialize(memoryStream);
            memoryStream.Close();


            return newOjb;
        }

        //获取SAP连接
        private RfcConfigParameters GetConfigParams()
        {
            try
            {
                string strSql = "select top 1 CLIENT, [SERVER], [USER], PASSWORD, SYSTEMID, NUMBER, LANGUAGE from conn";
                DataTable dt = SearchTableSqlSap(strSql);
                DataRow dr = dt.Rows[0];
                RfcConfigParameters configParams = new RfcConfigParameters();
                // Name property is neccessary, otherwise, NonInvalidParameterException will be thrown
                configParams.Add(RfcConfigParameters.Name, "ECC");
                configParams.Add(RfcConfigParameters.AppServerHost, dr["SERVER"].ToString().Trim());
                configParams.Add(RfcConfigParameters.SystemNumber, dr["NUMBER"].ToString().Trim());
                configParams.Add(RfcConfigParameters.SystemID, "ED1");

                configParams.Add(RfcConfigParameters.User, dr["USER"].ToString().Trim());
                configParams.Add(RfcConfigParameters.Password, dr["PASSWORD"].ToString().Trim());
                configParams.Add(RfcConfigParameters.Client, dr["CLIENT"].ToString().Trim());
                configParams.Add(RfcConfigParameters.Language, dr["LANGUAGE"].ToString().Trim());
                configParams.Add(RfcConfigParameters.PoolSize, "5");
                configParams.Add(RfcConfigParameters.MaxPoolSize, "10");
                configParams.Add(RfcConfigParameters.IdleTimeout, "30");
                configParams.Add(RfcConfigParameters.Codepage, "8400");

                //string strSql = "select top 1 CLIENT, [SERVER], [USER], PASSWORD, SYSTEMID, NUMBER, LANGUAGE from conn";
                //DataTable dt = SearchTableSqlSap(strSql);
                //DataRow dr = dt.Rows[0];
                //RfcConfigParameters configParams = new RfcConfigParameters();
                //// Name property is neccessary, otherwise, NonInvalidParameterException will be thrown
                //configParams.Add(RfcConfigParameters.Name, "ECC");
                ////configParams.Add(RfcConfigParameters.AppServerHost, dr["SERVER"].ToString().Trim());
                //configParams.Add(RfcConfigParameters.AppServerHost, "172.31.16.31");
                //configParams.Add(RfcConfigParameters.SystemNumber, dr["NUMBER"].ToString().Trim()); // instance number
                //configParams.Add(RfcConfigParameters.SystemID, dr["SYSTEMID"].ToString().Trim());

                //configParams.Add(RfcConfigParameters.User, dr["USER"].ToString().Trim());
                //configParams.Add(RfcConfigParameters.Password, dr["PASSWORD"].ToString().Trim());
                //configParams.Add(RfcConfigParameters.Client, dr["CLIENT"].ToString().Trim());
                //configParams.Add(RfcConfigParameters.Language, "ZH");
                //configParams.Add(RfcConfigParameters.PoolSize, "5");
                //configParams.Add(RfcConfigParameters.MaxPoolSize, "10");
                //configParams.Add(RfcConfigParameters.IdleTimeout, "30");
                return configParams;
            }
            catch(Exception e)
            {
                throw (e);
            }
        }

        public RfcDestination GetDestination()
        {
            RfcConfigParameters configParams = this.GetConfigParams();
            RfcDestination dest = RfcDestinationManager.GetDestination(configParams);

            return dest;
        }

        //将Table 转换成DataTable
        public System.Data.DataTable ConvertTable(Table ENQ, int[] str)
        {
            int len = str.Length;
            int j = ENQ.RowCount;
            int count = ENQ.ColumnCount;
            System.Data.DataTable dt = new System.Data.DataTable();
            try
            {
                for (int i = 1; i <= count; i++)
                {
                    for (int ii = 0; ii < len; ii++)
                    {
                        if (i == str[ii])
                        {
                            string columnName = ENQ.get_ColumnName(i);
                            dt.Columns.Add(columnName, typeof(string));
                        }
                    }
                }
                for (int i = 1; i <= j; i++)
                {
                    DataRow dr = dt.NewRow();
                    for (int jj = 1; jj <= count; jj++)
                    {
                        for (int ii = 0; ii < len; ii++)
                        {
                            if (jj == str[ii])
                            {
                                dr[ENQ.get_ColumnName(jj)] = ENQ.get_Cell(i, ENQ.get_ColumnName(jj)).ToString().Trim();
                            }
                        }
                    }
                    dt.Rows.Add(dr);
                }
            }
            catch (Exception e)
            {
            }
            return dt;
        }

        //frcTable转成datatable
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
   
        //写日志
        public void WriteLog(string strLog, string strTypeName,string strUsercode,string strType,string strDatetime, string iDid)
        {
            try
            {
                string strDatetime1 = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                string strSql = "insert into LogInfo(TypeName,Contents,DateTime,UserCode,LogType,Datetime1,DID) values('"
                    + strTypeName + "', '"
                    + strLog + "', '"
                    + strDatetime + "', '"
                    + strUsercode + "', '"
                    + strType + "', '"
                    + strDatetime1 + "', '"
                    + iDid + "')";
                ExecSql(strSql);
            }
            catch { }
        }

        //补足前导0   length为字符串标准长度
        public string AddZero(string strIn, int length)
        {
            strIn = strIn.Trim();
            string strOut = string.Empty;
            const string strzero = "000000000000000000000000000000";   //30位全0字符串
            if (strIn.Trim() != "")
            {
                if (IsIntNum(strIn))
                {
                    if (strIn.Length < length)
                    {
                        strOut = strzero.ToString().Substring(0, length - strIn.Length) + strIn.Trim();   //补足前导0
                    }
                    else
                    {
                        strOut = strIn;
                    }
                }
                else
                {
                    strOut = strIn;
                }
            }
            else
            {
                strOut = strIn;
            }
            return strOut;
        }

        //去除前导0
        public string DelZero(string strIn)
        {
            string strReturn = strIn.ToString().Trim();
            int iLen = strReturn.Length;
            if (IsIntNum(strReturn))
            {
                for (int i = 0; i < iLen; i++)
                {
                    if (strReturn.Substring(i, 1) != "0")
                    {
                        strReturn = strReturn.Substring(i, iLen - i);
                        break;
                    }
                }
            }
            return strReturn;
        }

        //判断输入的是否是数字
        public bool IsIntNum(string str)
        {
            System.Text.RegularExpressions.Regex reg1 = new System.Text.RegularExpressions.Regex("^[0-9]*$");
            bool bIsmatch = reg1.IsMatch(str);
            return bIsmatch;
        }

        //判断输入的是否合法
        public bool IsLegal(string str)
        {
            if(str.Contains("'"))
            {
                return false;
            }
            if (str.Contains(";"))
            {
                return false;
            }
            if (str.Contains("\""))
            {
                return false;
            }
            if (str.ToLower().Contains("insert"))
            {
                return false;
            }
            if (str.ToLower().Contains("update"))
            {
                return false;
            }
            if (str.ToLower().Contains("delete"))
            {
                return false;
            }
            return true;
        }
    }
}