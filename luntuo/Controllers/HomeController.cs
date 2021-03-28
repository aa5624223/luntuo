using Entity.luntuo;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Entity.Methods;
using project_Lw_Utils;
using Newtonsoft.Json;
using System.Web.Script.Serialization;
using System.Threading.Tasks;
using luntuo.WebReference;

namespace luntuo.Controllers
{
    public class HomeController : Controller
    {
        log4net.ILog Log = log4net.LogManager.GetLogger(typeof(HomeController));

        private static WebReference.LTPCwebservice getServiceMethod()
        {
            LTPCwebservice client = new LTPCwebservice();
            WebReference.MySoapHeader myHeader = new MySoapHeader();
            myHeader.UserName = "cc";
            myHeader.PassWord = "admin&cc";
            client.MySoapHeaderValue = myHeader;
            return client;
        }

        public ActionResult Index()
        {
            Response.Redirect("/luntuo/index.html");
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        #region 获取数据
        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="fc"></param>
        /// <returns></returns>
        [HttpPost]
        public string Login(FormCollection fc)
        {
            JObject msg = new JObject();
            #region 获取数据
            UserInfo bean = new UserInfo();
            bean.UserCode = fc["username"];
            bean.PWD = fc["password"];
            if (bean.UserCode==null || bean.PWD ==null) {
                msg.Add("status", 1);
                msg.Add("data", null);
                return msg.ToString();
            }
            #endregion

            #region 查询数据
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string sql = Common.find<UserInfo>(bean);
            //只查一条消息
            JObject result = Common.findCommond(sql, typeof(UserInfo), 1, 1, ServerPath);

            #endregion

            #region 处理数据
            
            #endregion

            #region 返回数据

            msg.Add("status", 0);
            msg.Add("data", result);
            return msg.ToString();

            #endregion
        }

        /// <summary>
        /// 获取所有用户数据
        /// </summary>
        /// <param name="fc"></param>
        /// <returns></returns>
        [HttpGet]
        public string getUserList(FormCollection fc) {
            //查找用户数据
            JObject msg = new JObject();

            #region 获取数据
            UserInfo bean = new UserInfo();
            //bean.UserCode = fc["username"];
            //bean.PWD = fc["password"];
            #endregion

            #region 查询数据
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string sql = Common.find<UserInfo>(bean);
            //只查一条消息
            JObject result = Common.findCommond(sql, typeof(UserInfo), 1, 9999, ServerPath);

            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            msg.Add("status", 0);
            msg.Add("data", result);
            return msg.ToString();
            #endregion
        }

        /// <summary>
        /// 获取权限数据
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string getSite_Roles(FormCollection fc)
        {
            JObject msg = new JObject();
            string AuthString = fc["AuthConfig"];

            if (string.IsNullOrEmpty(AuthString) && 1!=1)
            {
                msg.Add("status", 1);
                msg.Add("data", new JObject());
            }
            else
            {
                Site_Roles bean = new Site_Roles();
                string ServerPath = Server.MapPath("/WebCfg/Db.json");
                string sql = Common.find<Site_Roles>(bean);
                if (!string.IsNullOrEmpty(AuthString)) {
                    sql += " WHERE id IN (" + AuthString + ") or parentId=0 or isAuth=0";
                }
                JObject result = Common.findCommond(sql, typeof(Site_Roles), 1, 99999, ServerPath);
                string length = result["Site_Roles"].ToString();
                if (length == "0")
                {
                    msg.Add("status", 1);
                    msg.Add("data", new JObject());
                }
                else
                {
                    msg.Add("status", 0);
                    msg.Add("data", result);
                }
            }
            return msg.ToString();
        }
        /// <summary>
        /// 获取功能的权限
        /// </summary>
        /// <param name="fc"></param>
        /// <returns></returns>
        [HttpPost]
        public string getSite_Roles_Opt(FormCollection fc) {
            JObject msg = new JObject();
            string Role = fc["Roles"];
            string mapKey = fc["mapKey"];

            if (string.IsNullOrEmpty(Role) || string.IsNullOrEmpty(mapKey))
            {
                msg.Add("status", 1);
                msg.Add("data", new JObject());
            }
            else
            {
                Site_Roles bean = new Site_Roles();
                bean.UrlKey = mapKey;
                string ServerPath = Server.MapPath("/WebCfg/Db.json");
                string sql = Common.find<Site_Roles>(bean);
                JObject result = Common.findCommond(sql, typeof(Site_Roles), 1, 99999, ServerPath);
                string length = result["Site_Roles"].ToString();
                if (length == "0")
                {
                    msg.Add("status", 1);
                    msg.Add("data", new JObject());
                }
                else
                {
                    //Site_Roles
                    JArray Site_Roles = result.Value<JArray>("Site_Roles");
                    string parentId = Site_Roles[0].Value<string>("ID");
                    bean = new Site_Roles();
                    sql = Common.find<Site_Roles>(bean) + " WHERE parentId=" + parentId ;
                    result = Common.findCommond(sql, typeof(Site_Roles), 1, 99999, ServerPath);
                    string[] Roles = Role.Split(',');
                    JArray ret = new JArray();
                    foreach (string item in Roles) {
                        JArray ja = result.Value<JArray>("Site_Roles");
                        foreach (JToken jt in ja) {
                            JObject jo = (JObject)jt;
                            if (jo.Value<string>("ID") == item)
                            {
                                ret.Add(jo);
                            }
                            if (jo.Value<string>("isAuth")=="False") {
                                ret.Add(jo);
                            }
                        }
                    }
                    JObject reo = new JObject();
                    reo.Add("Site_Roles",ret);
                    msg.Add("status", 0);
                    msg.Add("data", reo);
                }
            }
            return msg.ToString();
        }

        /// <summary>
        /// 获取钣金需求分解的数据
        /// </summary>
        /// <param name="fc"></param>
        /// <returns></returns>
        [HttpPost]
        public string getBjInfo(FormCollection fc) {
            //查找用户数据
            JObject msg = new JObject();
            #region 获取数据
            BjInfo bean = new BjInfo();
            bean.FirstCode = fc["FirstCode"];
            bean.FirstName = fc["FirstName"];
            bean.Prooerty = fc["Prooerty"];
            bean.SecondCode = fc["SecondCode"];
            bean.SecondName = fc["SecondName"];
            bean.ThirdCode = fc["ThirdCode"];
            bean.ThirdName = fc["ThirdName"];
            bean.FourthCode = fc["FourthCode"];
            bean.FourthName = fc["FourthName"];
            bean.FifthCode = fc["FifthCode"];
            bean.FifthName = fc["FifthName"];
            bean.Meins = fc["Meins"];
            bean.MRP = fc["MRP"];
            #endregion

            #region 查询数据
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string sql = Common.find<BjInfo>(bean);
            //查询所有数据
            JObject result = Common.findCommond(sql, typeof(BjInfo), 1, 9999, ServerPath);

            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            msg.Add("status", 0);
            msg.Add("data", result);
            return msg.ToString();
            #endregion
        }
        [HttpPost]
        public string getJjInfo(FormCollection fc)
        {
            //机加表
            JObject msg = new JObject();
            #region 获取数据
            JjInfo bean = new JjInfo();
            bean.Series = fc["Series"];
            bean.Matnr = fc["Matnr"];
            bean.Maktx = fc["Maktx"];
            //bean.Group = fc["Group"];
            #endregion

            #region 查询数据
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string sql = Common.find<JjInfo>(bean);
            //查询所有数据
            JObject result = Common.findCommond(sql, typeof(JjInfo), 1, 9999, ServerPath);

            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            msg.Add("status", 0);
            msg.Add("data", result);
            return msg.ToString();
            #endregion
        }
        [HttpPost]
        public string getCgInfo(FormCollection fc) {
            JObject msg = new JObject();
            #region 获取数据
            CgInfo bean = new CgInfo();
            bean.Maktx = fc["Matnr"];
            string str1 = fc["Budat[0]"];
            string str2 = fc["Budat[1]"];
            //str1->Date
            if (!string.IsNullOrEmpty(str1) && !string.IsNullOrEmpty(str2)) {
                bean.Budat = str1+ "," + str2;
            } else if (!string.IsNullOrEmpty(str1)) {
                bean.Budat = str1;
            } else if (!string.IsNullOrEmpty(str2)) {
                bean.Budat = ","+str2;
            }
            bean.MRP = fc["MRP"];
            bean.Name1 = fc["Name1"];
            #endregion

            #region 查询数据
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string sql = Common.find<CgInfo>(bean);
            //查询所有数据
            JObject result = Common.findCommond(sql, typeof(CgInfo), 1, 9999, ServerPath);

            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            msg.Add("status", 0);
            msg.Add("data", result);
            return msg.ToString();
            #endregion
        }
        [HttpPost]
        public string getWBInfo(FormCollection fc) {
            JObject msg = new JObject();
            #region 获取数据
            WBInfo bean = new WBInfo();
            bean.Matnr = fc["Matnr"];
            if (!string.IsNullOrEmpty(bean.Matnr)) {
                bean.Matnr = bean.Matnr.ToUpper();
            }
            bean.Maktx = fc["Maktx"];
            #endregion

            #region 查询数据
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string sql = Common.find<WBInfo>(bean);
            //查询所有数据
            JObject result = Common.findCommond(sql, typeof(WBInfo), 1, 9999, ServerPath);

            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            msg.Add("status", 0);
            msg.Add("data", result);
            return msg.ToString();
            #endregion
        }

        /// <summary>
        /// 获得MRP
        /// </summary>
        /// <param name="fc"></param>
        /// <returns></returns>
        [HttpPost]
        public string getV_MRPInfo(FormCollection fc) {
            JObject msg = new JObject();
            #region 获取数据
            V_MRPInfo bean = new V_MRPInfo();
            bean.MRP = fc["MRP"];
            if (!string.IsNullOrEmpty(bean.MRP)) {
                bean.MRP = bean.MRP.ToUpper();
            }
            if (fc["TypeID"]!=null) {
                bean.TypeID = int.Parse(fc["TypeID"]);
            }
            #endregion

            #region 获取sql
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string sql;
            if (string.IsNullOrEmpty(bean.MRP) && !string.IsNullOrEmpty(fc["TypeID"])) {
                sql = Common.find<V_MRPInfo>(bean) + " WHERE TypeID= " + bean.TypeID;
            }
            else
            {
                if (!string.IsNullOrEmpty(fc["TypeID"])) { 
                    sql = Common.find<V_MRPInfo>(bean) + " AND TypeID= " + bean.TypeID;
                }
                else
                {
                    sql = Common.find<V_MRPInfo>(bean);
                }
            }
            
            //查询所有数据
            JObject result = Common.findCommond(sql, typeof(V_MRPInfo), 1, 9999, ServerPath);

            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            msg.Add("status", 0);
            msg.Add("data", result);
            return msg.ToString();
            #endregion
        }
        
        public string getTypeInfo(FormCollection fc) {
            JObject msg = new JObject();
            #region 获取数据
            TypeInfo bean = new TypeInfo();
            #endregion

            #region 获取sql
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string sql = Common.find<TypeInfo>(bean);
            //查询所有数据
            JObject result = Common.findCommond(sql, typeof(TypeInfo), 1, 9999, ServerPath);
            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            msg.Add("status", 0);
            msg.Add("data", result);
            return msg.ToString();
            #endregion
        }

        /// <summary>
        /// 钣金需求单查询
        /// </summary>
        /// <param name="fc"></param>
        /// <returns></returns>
        [HttpPost]
        public string getV_BjInfo(FormCollection fc)
        {
            JObject msg = new JObject();
            #region 获取数据
            V_BjInfo bean = new V_BjInfo();
            string OptUserCode = fc["OptUserCode"];
            bean.UserCode = OptUserCode;
            #endregion

            #region 获取sql
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string sql = Common.find<V_BjInfo>(bean);
            //查询所有数据
            JObject result = Common.findCommond(sql, typeof(V_BjInfo), 1, 9999, ServerPath);
            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            msg.Add("status", 0);
            msg.Add("data", result);
            return msg.ToString();
            #endregion
        }
        [HttpPost]
        public string getV_JjInfo(FormCollection fc)
        {
            JObject msg = new JObject();
            #region 获取数据
            V_JjInfo bean = new V_JjInfo();
            string OptUserCode = fc["OptUserCode"];
            bean.UserCode = OptUserCode;
            //型号 子件编号、子件名称、
            bean.Series = fc["Series"];
            bean.Matnr = fc["Matnr"];
            bean.Maktx = fc["Maktx"];
            #endregion

            #region 获取sql
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string sql = Common.find<V_JjInfo>(bean);
            //查询所有数据
            JObject result = Common.findCommond(sql, typeof(V_JjInfo), 1, 9999, ServerPath);
            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            msg.Add("status", 0);
            msg.Add("data", result);
            return msg.ToString();
            #endregion
        }
        [HttpPost]
        public string getV_CgInfo(FormCollection fc) {
            JObject msg = new JObject();
            #region 获取数据
            V_CgInfo bean = new V_CgInfo();
            string OptUserCode = fc["OptUserCode"];
            bean.UserCode = OptUserCode;
            //物料编码、物料描述、需求日期、供应商代码、供应商名称
            bean.Matnr = fc["Matnr"];
            bean.Maktx = fc["Maktx"];
            bean.MRP = fc["MRP"];
            string str1 = fc["Budat[0]"];
            string str2 = fc["Budat[1]"];
            if (!string.IsNullOrEmpty(str1) && !string.IsNullOrEmpty(str2))
            {
                bean.Budat = str1 + "," + str2;
            }else if (!string.IsNullOrEmpty(str1))
            {
                bean.Budat = str1+"";
            }else if (!string.IsNullOrEmpty(str2)) {
                bean.Budat = "," + str2;
            }
            bean.Lifnr = fc["Lifnr"];
            bean.Name1 = fc["Name1"];
            #endregion

            #region 获取sql
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string sql = Common.find<V_CgInfo>(bean);
            //查询所有数据
            JObject result = Common.findCommond(sql, typeof(V_CgInfo), 1, 9999, ServerPath);
            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            msg.Add("status", 0);
            msg.Add("data", result);
            return msg.ToString();
            #endregion
        }

        /// <summary>
        /// 获得文件上传的数据
        /// </summary>
        /// <param name="fc"></param>
        /// <returns></returns>
        [HttpPost]
        public string getUploadInfo(FormCollection fc) {
            JObject msg = new JObject();
            #region 获取数据
            UploadInfo bean = new UploadInfo();
            #endregion

            #region 获取sql
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string sql = Common.find<UploadInfo>(bean) + " ORDER BY Budat DESC";
            //查询所有数据
            JObject result = Common.findCommond(sql, typeof(UploadInfo), 1, 9999, ServerPath);
            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            msg.Add("status", 0);
            msg.Add("data", result);
            return msg.ToString();
            #endregion
        }
        #endregion

        public string getLogInfo(FormCollection fc)
        {
            JObject msg = new JObject();
            #region 获取数据
            V_LogInfo bean = new V_LogInfo();
            int page = 1;
            int pageSize = 20;
            if (!string.IsNullOrEmpty(fc["page"])) {
                page = int.Parse(fc["page"]);
            }
            if (!string.IsNullOrEmpty(fc["pageSize"])) {
                pageSize = int.Parse(fc["pageSize"]);
            }
            //TypeName DateTime1[0] DateTime1[1] UserName: page:pageSize:
            bean.TypeName = fc["TypeName"];
            string str1 = fc["DateTime1[0]"];
            string str2 = fc["DateTime1[1]"];
            bean.UserName = fc["UserName"];


            #endregion

            #region 获取sql

            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string sql = Common.find<V_LogInfo>(bean);
            if (string.IsNullOrEmpty(bean.TypeName) && string.IsNullOrEmpty(bean.UserName))
            {
                if (!string.IsNullOrEmpty(str1) && !string.IsNullOrEmpty(str2)) {
                    sql +=  $"WHERE DateTime1 BETWEEN '{str1}' AND '{str2}'";
                }
                else if (!string.IsNullOrEmpty(str1))
                {
                    sql +=  $"WHERE DateTime1 <= '{str1}'";
                } else if (!string.IsNullOrEmpty(str2)) {
                    sql +=  $"WHERE DateTime1 >= '{str2}'";
                }
            }
            else
            {
                if (!string.IsNullOrEmpty(str1) && !string.IsNullOrEmpty(str2))
                {
                    sql +=  $" AND DateTime1 BETWEEN '{str1}' AND '{str2}'";
                }
                else if (!string.IsNullOrEmpty(str1))
                {
                    sql += $" AND DateTime1 <= '{str1}'";
                }
                else if (!string.IsNullOrEmpty(str2))
                {
                    sql +=  $" AND DateTime1 >= '{str2}'";
                }
            }
            sql += " ORDER BY DateTime1 DESC";
            JObject result = null;
            //查询所有数据
            try
            {
                result = Common.findCommond(sql, typeof(V_LogInfo), page, pageSize, ServerPath);
            }
            catch (Exception _e)
            {
                Log.Error("",_e);
                throw;
            }
            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            msg.Add("status", 0);
            msg.Add("data", result);
            return msg.ToString();
            #endregion
        }

        #region add Update

        public string getBjImp(FormCollection fc) {
            JObject msg = new JObject();
            #region 获取数据
            BjImp bean = new BjImp();
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string OptUserCode = fc["OptUserCode"];
            bean.UserCode = OptUserCode;
            #endregion

            #region 查询前查询 是否生成了Info数据

            string TbCountMaxsql = $"SELECT MAX(TbCount) AS TbCount FROM BjInfo WHERE UserCode='{OptUserCode}'";
            JObject MaxJo = Common.findCommond(TbCountMaxsql, typeof(BjInfo), 1, 1, ServerPath); 
            int MaxInfoTab = -1;
            bool Tabflg = false;
            if (MaxJo["BjInfo"] != null && MaxJo["BjInfo"].ToString()!="[]" && MaxJo["BjInfo"][0] != null && MaxJo["BjInfo"][0]["TbCount"] != null)
            {
                Tabflg = int.TryParse(MaxJo["BjInfo"][0]["TbCount"].ToString(), out MaxInfoTab);
                if (!Tabflg)
                {
                    MaxInfoTab = -1;
                }
            }

            #endregion

            #region 获取sql

            
            string sql = Common.find<BjImp>(bean);
            JObject result = null;
            //查询所有数据
            try
            {
                result = Common.findCommond(sql, typeof(BjImp), 1, 9999, ServerPath);
                Tabflg = false;
                int MaxTab = -2;
                if (result["BjImp"]!=null && result["BjImp"].ToString()!="[]" && result["BjImp"][0]!=null && result["BjImp"][0]["TbCount"] != null && result["BjImp"][0]["status"].ToString()!="已完成") {
                    Tabflg = int.TryParse(result["BjImp"][0]["TbCount"].ToString(), out MaxTab);
                    if (Tabflg) {
                        if (MaxTab == MaxInfoTab) {
                            List<string> sqls = new List<string>();
                            string optSql = $"UPDATE BjImp SET status='已完成' WHERE UserCode='{OptUserCode}' AND TbCount='{MaxTab}'";
                            string logSql = InsertLog("钣金需求接口","执行完成",OptUserCode);
                            sqls.Add(optSql);
                            sqls.Add(logSql);
                            Tabflg = Common.OptCommond(sqls, ServerPath);
                        }
                    }
                }
            }
            catch (Exception _e)
            {
                Log.Error("",_e);
                throw;
            }
            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            msg.Add("status", 0);
            msg.Add("data", result);
            return msg.ToString();
            #endregion
        }

        public string getJjImp(FormCollection fc)
        {
            JObject msg = new JObject();
            #region 获取数据
            JjImp bean = new JjImp();
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string OptUserCode = fc["OptUserCode"];
            bean.UserCode = OptUserCode;
            #endregion

            #region 查询前查询 是否生成了Info数据

            string TbCountMaxsql = $"SELECT MAX(TbCount) AS TbCount FROM JjInfo WHERE UserCode='{OptUserCode}'";
            JObject MaxJo = Common.findCommond(TbCountMaxsql, typeof(JjInfo), 1, 1, ServerPath);
            int MaxInfoTab = -1;
            bool Tabflg = false;
            if (MaxJo["JjInfo"] != null && MaxJo["JjInfo"].ToString()!="[]" && MaxJo["JjInfo"][0] != null && MaxJo["JjInfo"][0]["TbCount"] != null)
            {
                Tabflg = int.TryParse(MaxJo["JjInfo"][0]["TbCount"].ToString(), out MaxInfoTab);
                if (!Tabflg)
                {
                    MaxInfoTab = -1;
                }
            }

            #endregion


            #region 获取sql
            
            string sql = Common.find<JjImp>(bean);
            JObject result = null;
            //查询所有数据
            try
            {
                result = Common.findCommond(sql, typeof(JjImp), 1, 9999, ServerPath);
                Tabflg = false;
                int MaxTab = -2;
                if (result["JjImp"] != null && result["JjImp"].ToString()!="[]" && result["JjImp"][0] != null && result["JjImp"][0]["TbCount"] != null && result["JjImp"][0]["status"].ToString() != "已完成")
                {
                    Tabflg = int.TryParse(result["JjImp"][0]["TbCount"].ToString(), out MaxTab);
                    if (Tabflg)
                    {
                        if (MaxTab == MaxInfoTab)
                        {
                            List<string> sqls = new List<string>();
                            string optSql = $"UPDATE JjImp SET status='已完成' WHERE UserCode='{OptUserCode}' AND TbCount='{MaxTab}'";
                            string logSql = InsertLog("机加需求接口", "执行完成", OptUserCode);
                            sqls.Add(optSql);
                            sqls.Add(logSql);
                            Tabflg = Common.OptCommond(sqls, ServerPath);
                        }
                    }
                }
            }
            catch (Exception _e)
            {
                Log.Error("", _e);
                throw;
            }
            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            msg.Add("status", 0);
            msg.Add("data", result);
            return msg.ToString();
            #endregion
        }

        public string getCgImp(FormCollection fc)
        {
            JObject msg = new JObject();
            #region 获取数据
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            CgImp bean = new CgImp();
            string OptUserCode = fc["OptUserCode"];
            
            bean.UserCode = OptUserCode;
            #endregion

            #region 查询前查询 是否生成了Info数据

            string TbCountMaxsql = $"SELECT MAX(TbCount) AS TbCount FROM CgInfo WHERE UserCode='{OptUserCode}'";
            JObject MaxJo = Common.findCommond(TbCountMaxsql, typeof(CgInfo), 1, 1, ServerPath);
            int MaxInfoTab = -1;
            bool Tabflg = false;
            if (MaxJo["CgInfo"] != null && MaxJo["CgInfo"].ToString() != "[]" && MaxJo["CgInfo"][0] != null && MaxJo["CgInfo"][0]["TbCount"] != null)
            {
                Tabflg = int.TryParse(MaxJo["CgInfo"][0]["TbCount"].ToString(), out MaxInfoTab);
                if (!Tabflg)
                {
                    MaxInfoTab = -1;
                }
            }

            #endregion

            #region 获取sql

            string sql = Common.find<CgImp>(bean);
            JObject result = null;
            //查询所有数据
            try
            {
                result = Common.findCommond(sql, typeof(CgImp), 1, 9999, ServerPath);
                Tabflg = false;
                int MaxTab = -2;
                if (result["CgImp"] != null && result["CgImp"].ToString()!="[]" && result["CgImp"][0] != null && result["CgImp"][0]["TbCount"] != null && result["CgImp"][0]["status"].ToString() != "已完成")
                {
                    Tabflg = int.TryParse(result["CgImp"][0]["TbCount"].ToString(), out MaxTab);
                    if (Tabflg)
                    {
                        if (MaxTab == MaxInfoTab)
                        {
                            List<string> sqls = new List<string>();
                            string optSql = $"UPDATE CgImp SET status='已完成' WHERE UserCode='{OptUserCode}' AND TbCount='{MaxTab}'";
                            string logSql = InsertLog("采购需求接口", "执行完成", OptUserCode);
                            sqls.Add(optSql);
                            sqls.Add(logSql);
                            Tabflg = Common.OptCommond(sqls, ServerPath);
                        }
                    }
                }
            }
            catch (Exception _e)
            {
                Log.Error("", _e);
                throw;
            }
            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            msg.Add("status", 0);
            msg.Add("data", result);
            return msg.ToString();
            #endregion
        }

        #endregion

        #region 添加数据

        /// <summary>
        /// 添加用户
        /// </summary>
        /// <param name="fc"></param>
        /// <returns></returns>
        [HttpPost]
        public string addUser(FormCollection fc) {
            //查找用户数据
            JObject msg = new JObject();
            #region 获取数据
            string OptUserCode = fc["OptUserCode"];
            UserInfo bean = new UserInfo();
            bean.PWD = fc["PWD"];
            bean.UserCode = fc["UserCode"];
            bean.UserName = fc["UserName"];
            #endregion

            #region 添加数据
            List<string> sqls = new List<string>();
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string sql = Common.add<UserInfo>(bean);
            string logSql = InsertLog("添加用户", $"成功添加用户,用户编号:{bean.UserCode},用户名:{bean.UserName}", OptUserCode);
            sqls.Add(sql);
            sqls.Add(logSql);
            //只查一条消息
            bool flg = Common.OptCommond(sqls, ServerPath);

            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            if (flg) {
                msg.Add("status", 0);
                msg.Add("data", "OK");
            }
            else
            {
                msg.Add("status", 1);
                msg.Add("data", "fail");
            }
            return msg.ToString();

            #endregion
        }
        /// <summary>
        /// 同步更新BjImp
        /// </summary>
        /// <param name="fc"></param>
        /// <returns></returns>
        [HttpPost]
        public string submitBjImp(FormCollection fc) {
            JObject msg = new JObject();
            JavaScriptSerializer jsonReader = new JavaScriptSerializer();
            string OptUserCode = fc["OptUserCode"];
            int Count = int.Parse(fc["Count"]);
            int type = int.Parse(fc["type"]);
            string ServerPath = Server.MapPath("/WebCfg/Db.json");

            #region 找tbCount最大值

            string TbCountMaxsql = $"SELECT MAX(TbCount) AS TbCount FROM BjImp WHERE UserCode='{OptUserCode}'";
            JObject MaxJo = Common.findCommond(TbCountMaxsql,typeof(BjImp),1,1, ServerPath);
            int MaxTab = -1;
            bool Tabflg = false;
            if (MaxJo["BjImp"]!=null && MaxJo["BjImp"].ToString()!="[]" && MaxJo["BjImp"][0] !=null  && MaxJo["BjImp"][0]["TbCount"]!=null) {
                Tabflg = int.TryParse(MaxJo["BjImp"][0]["TbCount"].ToString(),out MaxTab);
                if (!Tabflg) {
                    MaxTab = -1;
                }
                else
                {
                    MaxTab++;
                }
            }

            #endregion

            List<BjImp> beans = new List<BjImp>();
            for (int i=0;i<Count;i++) {
                BjImp bean = jsonReader.Deserialize<BjImp>(fc[$"list[{i}]"]);
                bean.UserCode = OptUserCode;
                bean.TbCount = MaxTab;
                bean.status = "执行中";
                beans.Add(bean);
            }
            List<string> sqls = Common.adds<BjImp>(beans);
            if (type == 1)
            {
                string Delsql = $"Delete BjImp where UserCode='{OptUserCode}'";
                sqls.Insert(0, Delsql);
            }
            string logSql = InsertLog("钣金需求接口", "执行中", OptUserCode);
            sqls.Add(logSql);
            //Tabflg = Common.OptCommond(sqls, ServerPath);

            bool flg = Common.OptCommond(sqls, ServerPath);
            
            LTPCwebservice client = getServiceMethod();
            Task.Run(() =>
            {
                try
                {
                    bool flg1 = false;
                    if (type == 1)
                    {
                        flg1 = client.Bjxufj(true, MaxTab, OptUserCode);
                    }
                    else
                    {
                        flg1 = client.Bjxufj(false,MaxTab, OptUserCode);
                    }
                    if (flg1) {
                        //判断是否成功 
                        BjInfo bean = new BjInfo();
                        bean.UserCode = OptUserCode;
                        bean.TbCount = MaxTab;
                        string sql = Common.find<BjInfo>(bean);
                        //找info表的最大值
                        JObject InfoJo = Common.findCommond(sql,typeof(BjInfo),1,1,ServerPath);
                        Tabflg = false;
                        int InfoMaxTab = -2;
                        if (InfoJo["BjInfo"]!=null && InfoJo["BjInfo"].ToString()!="[]" && InfoJo["BjInfo"][0]!=null && InfoJo["BjInfo"][0]["TbCount"]!=null) {
                            Tabflg = int.TryParse(InfoJo["BjInfo"][0]["TbCount"].ToString(), out InfoMaxTab);
                            if (!Tabflg) {
                                InfoMaxTab = -2;
                            }
                        }
                        if (InfoMaxTab == MaxTab) {
                            List<string> sqls1 = new List<string>();
                            string optSql = $"UPDATE BjImp SET status='已完成' WHERE UserCode='{OptUserCode}' AND TbCount={MaxTab}";
                            string logSql1 = InsertLog("钣金需求接口", "执行完成", OptUserCode);
                            sqls1.Add(optSql);
                            sqls1.Add(logSql1);
                            flg1 = Common.OptCommond(sqls1, ServerPath);
                        }
                    }
                    else//异常处理
                    {
                        List<string> sqls1 = new List<string>();
                        string optSql = $"UPDATE BjImp SET status='异常' WHERE UserCode='{OptUserCode}' AND TbCount={MaxTab}";
                        string logSql1 = InsertLog("钣金需求接口", "异常", OptUserCode);
                        sqls1.Add(optSql);
                        sqls1.Add(logSql1);
                        flg1 = Common.OptCommond(sqls1, ServerPath);
                    }
                } catch (Exception _e) {
                    //超时处理
                    bool flg1 = false;
                    List<string> sqls1 = new List<string>();
                    string optSql = $"UPDATE BjImp SET status='执行超时' WHERE UserCode='{OptUserCode}' AND TbCount={MaxTab}";
                    string logSql1 = InsertLog("钣金需求接口", "执行超时", OptUserCode);
                    sqls1.Add(optSql);
                    sqls1.Add(logSql1);
                    flg1 = Common.OptCommond(sqls1, ServerPath);
                }
            });
            #region 返回结果
            if (flg)
            {
                msg.Add("status", 0);
            }
            else
            {
                msg.Add("status", 1);
            }
            return msg.ToString();
            #endregion
        }

        [HttpPost]
        public string submitCgImp(FormCollection fc) {
            JObject msg = new JObject();
            string BaseDate = fc["BaseDate"];
            string OptUserCode = fc["OptUserCode"];
            JavaScriptSerializer jsonReader = new JavaScriptSerializer();
            int Count = int.Parse(fc["Count"]);
            int type = int.Parse(fc["type"]);
            string ServerPath = Server.MapPath("/WebCfg/Db.json");

            #region 找tbCount最大值

            string TbCountMaxsql = $"SELECT MAX(TbCount) AS TbCount FROM CgImp WHERE UserCode='{OptUserCode}'";
            JObject MaxJo = Common.findCommond(TbCountMaxsql, typeof(CgImp), 1, 1, ServerPath);
            int MaxTab = -1;
            bool Tabflg = false;
            if (MaxJo["CgImp"] != null && MaxJo["CgImp"].ToString()!="[]" && MaxJo["CgImp"][0] != null && MaxJo["CgImp"][0]["TbCount"] != null)
            {
                Tabflg = int.TryParse(MaxJo["CgImp"][0]["TbCount"].ToString(), out MaxTab);
                if (!Tabflg)
                {
                    MaxTab = -1;
                }
                else
                {
                    MaxTab++;
                }
            }

            #endregion

            List<CgImp> beans = new List<CgImp>();
            for (int i = 0; i < Count; i++)
            {
                CgImp bean = (CgImp)jsonReader.Deserialize<CgImp>(fc[$"list[{i}]"]);
                bean.UserCode = OptUserCode;
                bean.TbCount = MaxTab;
                bean.status = "执行中";
                beans.Add(bean);
            }
            
            List<string> sqls = Common.adds<CgImp>(beans);
            if (type == 1)
            {
                string Delsql = $"Delete CgImp WHERE UserCode='{OptUserCode}'";
                sqls.Insert(0, Delsql);
            }
            string logSql = InsertLog("采购需求接口", "执行中", OptUserCode);
            sqls.Add(logSql);
            bool flg = Common.OptCommond(sqls, ServerPath);
            
            //Task.Run(async () =>
            //{
            //    //update
            //    //await update()
            //});
            LTPCwebservice client = getServiceMethod();
            Task.Run(() =>
            {
                try
                {
                    BaseDate = BaseDate.Replace("-", "");
                    bool flg1 = false;
                    if (type == 1)
                    {
                        flg1 = client.Cgxufj(BaseDate, true, MaxTab,OptUserCode);
                    }
                    else
                    {
                        flg1 = client.Cgxufj(BaseDate, false, MaxTab, OptUserCode);
                    }
                    if (flg1) {
                        CgInfo bean = new CgInfo();
                        bean.UserCode = OptUserCode;
                        bean.TbCount = MaxTab;
                        string sql = Common.find<CgInfo>(bean);
                        JObject InfoJo = Common.findCommond(sql, typeof(CgInfo), 1, 1, ServerPath);
                        Tabflg = false;
                        int InfoMaxTab = -2;
                        if (InfoJo["CgInfo"] != null && InfoJo["CgInfo"].ToString()!="[]" && InfoJo["CgInfo"][0] != null && InfoJo["CgInfo"][0]["TbCount"] != null)
                        {
                            Tabflg = int.TryParse(InfoJo["CgInfo"][0]["TbCount"].ToString(), out InfoMaxTab);
                            if (!Tabflg)
                            {
                                InfoMaxTab = -2;
                            }
                        }
                        if (InfoMaxTab == MaxTab)
                        {
                            List<string> sqls1 = new List<string>();
                            string optSql = $"UPDATE CgImp SET status='已完成' WHERE UserCode='{OptUserCode}' AND TbCount={MaxTab}";
                            string logSql1 = InsertLog("采购需求接口", "执行完成", OptUserCode);
                            sqls.Add(optSql);
                            sqls.Add(logSql1);
                            flg1 = Common.OptCommond(sqls, ServerPath);
                        }
                    }
                    else
                    {
                        List<string> sqls1 = new List<string>();
                        string optSql = $"UPDATE CgImp SET status='异常' WHERE UserCode='{OptUserCode}' AND TbCount={MaxTab}";
                        string logSql1 = InsertLog("采购需求接口", "异常", OptUserCode);
                        sqls.Add(optSql);
                        sqls.Add(logSql1);
                        flg1 = Common.OptCommond(sqls, ServerPath);
                    }
                }
                catch (Exception _e)
                {
                    bool flg1 = false;
                    List<string> sqls1 = new List<string>();
                    string optSql = $"UPDATE CgImp SET status='执行超时' WHERE UserCode='{OptUserCode}' AND TbCount={MaxTab}";
                    string logSql1 = InsertLog("采购需求接口", "执行超时", OptUserCode);
                    sqls.Add(optSql);
                    sqls.Add(logSql1);
                    flg1 = Common.OptCommond(sqls, ServerPath);
                }

            });
            if (flg)
            {
                msg.Add("status", 0);
            }
            else
            {
                msg.Add("status", 1);
            }
            return msg.ToString();
        }

        [HttpPost]
        public string submitJjImp(FormCollection fc) {
            JObject msg = new JObject();
            JavaScriptSerializer jsonReader = new JavaScriptSerializer();
            string OptUserCode = fc["OptUserCode"];
            int Count = int.Parse(fc["Count"]);
            int type = int.Parse(fc["type"]);
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            #region 找tbCount最大值

            string TbCountMaxsql = $"SELECT MAX(TbCount) AS TbCount FROM JjImp WHERE UserCode='{OptUserCode}'";
            JObject MaxJo = Common.findCommond(TbCountMaxsql, typeof(JjImp), 1, 1, ServerPath);
            int MaxTab = -1;
            bool Tabflg = false;
            if (MaxJo["JjImp"] != null && MaxJo["JjImp"].ToString() !="[]" && MaxJo["JjImp"][0] != null && MaxJo["JjImp"][0]["TbCount"] != null)
            {
                Tabflg = int.TryParse(MaxJo["JjImp"][0]["TbCount"].ToString(), out MaxTab);
                if (!Tabflg)
                {
                    MaxTab = -1;
                }
                else
                {
                    MaxTab++;
                }
            }

            #endregion


            List<JjImp> beans = new List<JjImp>();
            for (int i = 0; i < Count; i++)
            {
                JjImp bean = (JjImp)jsonReader.Deserialize<JjImp>(fc[$"list[{i}]"]);
                bean.UserCode = OptUserCode;
                bean.TbCount = MaxTab;
                bean.status = "执行中";
                beans.Add(bean);
            }
            
            List<string> sqls = Common.adds<JjImp>(beans);
            if (type == 1)
            {
                string Delsql = $"Delete JjImp where UserCode='{OptUserCode}'";
                sqls.Insert(0, Delsql);
            }
            string logSql = InsertLog("机加需求接口", "执行中", OptUserCode);
            sqls.Add(logSql);
            bool flg = Common.OptCommond(sqls, ServerPath);
            
            LTPCwebservice client = getServiceMethod();
            Task.Run(() =>
            {
                try
                {
                    bool flg1 = false;
                    if (type == 1)
                    {
                        flg1 = client.Jjxufj(true,MaxTab,OptUserCode);
                    }
                    else
                    {
                        flg1 = client.Jjxufj(false, MaxTab, OptUserCode);
                    }
                    if (flg1) {
                        JjInfo bean = new JjInfo();
                        bean.UserCode = OptUserCode;
                        bean.TbCount = MaxTab;
                        string sql = Common.find<JjInfo>(bean);
                        JObject InfoJo = Common.findCommond(sql, typeof(JjInfo), 1, 1, ServerPath);
                        Tabflg = false;
                        int InfoMaxTab = -2;
                        if (InfoJo["JjInfo"] != null && InfoJo["JjInfo"].ToString()!="[]" && InfoJo["JjInfo"][0] != null && InfoJo["JjInfo"][0]["TbCount"] != null)
                        {
                            Tabflg = int.TryParse(InfoJo["JjInfo"][0]["TbCount"].ToString(), out InfoMaxTab);
                            if (!Tabflg)
                            {
                                InfoMaxTab = -2;
                            }
                        }
                        if (InfoMaxTab == MaxTab)
                        {
                            List<string> sqls1 = new List<string>();
                            string optSql = $"UPDATE JjImp SET status='已完成' WHERE UserCode='{OptUserCode}' AND TbCount={MaxTab}";
                            string logSql1 = InsertLog("机加需求接口", "执行完成", OptUserCode);
                            sqls.Add(optSql);
                            sqls.Add(logSql1);
                            flg1 = Common.OptCommond(sqls, ServerPath);
                        }
                    }
                    else
                    {
                        List<string> sqls1 = new List<string>();
                        string optSql = $"UPDATE JjImp SET status='异常' WHERE UserCode='{OptUserCode}' AND TbCount={MaxTab}";
                        string logSql1 = InsertLog("机加需求接口", "异常", OptUserCode);
                        sqls.Add(optSql);
                        sqls.Add(logSql1);
                        flg1 = Common.OptCommond(sqls, ServerPath);
                    }
                }
                catch (Exception _e)
                {
                    bool flg1 = false;
                    List<string> sqls1 = new List<string>();
                    string optSql = $"UPDATE JjInfo SET status='执行超时' WHERE UserCode='{OptUserCode}' AND TbCount={MaxTab}";
                    string logSql1 = InsertLog("机加需求接口", "执行超时", OptUserCode);
                    sqls.Add(optSql);
                    sqls.Add(logSql1);

                    flg1 = Common.OptCommond(sqls, ServerPath);
                }

            });
            #region 返回结果
            if (flg)
            {
                msg.Add("status", 0);
            }
            else
            {
                msg.Add("status", 1);
            }
            return msg.ToString();
            #endregion
        }

        [HttpPost]
        public string submitWBInfo(FormCollection fc)
        {
            JObject msg = new JObject();
            string OptUserCode = fc["OptUserCode"];
            JavaScriptSerializer jsonReader = new JavaScriptSerializer();
            int Count = int.Parse(fc["Count"]);
            //int type = int.Parse(fc["type"]);
            List<WBInfo> beans = new List<WBInfo>();
            string Matnrs = "";
            for (int i = 0; i < Count; i++)
            {
                WBInfo bean = (WBInfo)jsonReader.Deserialize<WBInfo>(fc[$"list[{i}]"]);
                Matnrs += bean.Matnr+",";
                beans.Add(bean);
            }
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            List<string> sqls = Common.adds<WBInfo>(beans);
            string logSql = InsertLog("Excel导入添加物料班组", $"物料:{Matnrs}", OptUserCode);
            sqls.Add(logSql);
            bool flg = Common.OptCommond(sqls, ServerPath);
            if (flg)
            {
                msg.Add("status", 0);
            }
            else
            {
                msg.Add("status", 1);
            }
            //Task.Run(async () =>
            //{
            //    //update
            //    //await update()
            //});
            return msg.ToString();
        }

        [HttpPost]
        public string addWBInfo(FormCollection fc) {
            JObject msg = new JObject();
            #region 获取数据
            string OptUserCode = fc["OptUserCode"];
            WBInfo bean = new WBInfo();
            bean.Matnr = fc["Matnr"];
            if (!string.IsNullOrEmpty(bean.Matnr))
            {
                bean.Matnr = bean.Matnr.ToUpper();
            }
            bean.Maktx = fc["Maktx"];
            bean.Bz = fc["Bz"];
            if (!string.IsNullOrEmpty(bean.Bz))
            {
                bean.Bz = bean.Bz.ToUpper();
            }
            #endregion

            #region 获得sql
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            List<string> sqls = new List<string>();
            string sql = Common.add<WBInfo>(bean);
            //只查一条消息
            string logSql = InsertLog("添加物料班组", "物料:"+bean.Matnr, OptUserCode);
            sqls.Add(sql);
            sqls.Add(logSql);
            bool flg = Common.OptCommond(sqls, ServerPath);

            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            if (flg)
            {
                msg.Add("status", 0);
                msg.Add("data", "OK");
            }
            else
            {
                msg.Add("status", 1);
                msg.Add("data", "fail");
            }
            return msg.ToString();

            #endregion
        }

        [HttpPost]
        public string addMRPInfo(FormCollection fc) {
            JObject msg = new JObject();
            #region 获取数据
            string OptUserCode = fc["OptUserCode"];
            MRPInfo bean = new MRPInfo();
            bean.MRP = fc["MRP"];
            if (!string.IsNullOrEmpty(bean.MRP))
            {
                bean.MRP = bean.MRP.ToUpper();
            }
            if (!string.IsNullOrEmpty(fc["TypeID"])) {
                bean.TypeID = int.Parse(fc["TypeID"]);
            }
            #endregion

            #region 获得sql
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string sql = Common.add<MRPInfo>(bean);
            //只查一条消息
            List<string> sqls = new List<string>();
            string logSql = InsertLog("添加MRP", "MRP:"+bean.MRP, OptUserCode);
            sqls.Add(sql);
            sqls.Add(logSql);
            bool flg = Common.OptCommond(sql, ServerPath);

            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            if (flg)
            {
                msg.Add("status", 0);
                msg.Add("data", "OK");
            }
            else
            {
                msg.Add("status", 1);
                msg.Add("data", "fail");
            }
            return msg.ToString();

            #endregion
        }



        #endregion

        #region 修改数据

        /// <summary>
        /// 修改用户数据
        /// </summary>
        /// <param name="fc"></param>
        /// <returns></returns>
        public string editUser(FormCollection fc) {
            //查找用户数据
            JObject msg = new JObject();
            string OptUserCode = fc["OptUserCode"];
            #region 获取数据
            UserInfo bean = new UserInfo();
            bean.PWD = fc["PWD"];
            bean.UserCode = fc["UserCode"];
            bean.UserName = fc["UserName"];
            bean.Roles = fc["Roles"];
            UserInfo bean2 = new UserInfo();
            bean2.ID = int.Parse(fc["ID"]);

            #endregion

            #region 获得sql
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string sql = Common.updata<UserInfo>(bean,bean2);
            //只查一条消息
            List<string> sqls = new List<string>();
            string logSql = InsertLog("修改用户", "修改的用户ID:"+bean2.ID, OptUserCode);
            sqls.Add(sql);
            sqls.Add(logSql);
            bool flg = Common.OptCommond(sqls, ServerPath);

            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            if (flg)
            {
                msg.Add("status", 0);
                msg.Add("data", "OK");
            }
            else
            {
                msg.Add("status", 1);
                msg.Add("data", "fail");
            }
            return msg.ToString();

            #endregion
        }

        public string editWBInfo(FormCollection fc) {
            JObject msg = new JObject();
            #region 获取数据
            string OptUserCode = fc["OptUserCode"];
            WBInfo bean = new WBInfo();
            bean.Matnr = fc["Matnr"];
            if (!string.IsNullOrEmpty(bean.Matnr))
            {
                bean.Matnr = bean.Matnr.ToUpper();
            }
            bean.Maktx = fc["Maktx"];
            bean.Bz = fc["Bz"];
            if (!string.IsNullOrEmpty(bean.Bz)) {
                bean.Bz = bean.Bz.ToUpper();
            }
            WBInfo bean2 = new WBInfo();
            bean2.ID = int.Parse(fc["ID"]);
            #endregion

            #region 获得sql
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string sql = Common.updata<WBInfo>(bean,bean2);
            List<string> sqls = new List<string>();
            string logSql = InsertLog("修改物料班组", "修改的物料班组ID:"+bean2.ID, OptUserCode);
            sqls.Add(sql);
            sqls.Add(logSql);
            //只查一条消息
            bool flg = Common.OptCommond(sqls, ServerPath);

            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            if (flg)
            {
                msg.Add("status", 0);
                msg.Add("data", "OK");
            }
            else
            {
                msg.Add("status", 1);
                msg.Add("data", "fail");
            }
            return msg.ToString();

            #endregion
        }

        public string editMRPInfo(FormCollection fc) {
            JObject msg = new JObject();
            #region 获取数据
            string OptUserCode = fc["OptUserCode"];
            MRPInfo bean = new MRPInfo();
            bean.MRP = fc["MRP"];
            if (!string.IsNullOrEmpty(bean.MRP)) {
                bean.MRP = bean.MRP.ToUpper();
            }
            if (!string.IsNullOrEmpty(fc["TypeID"])) {
                bean.TypeID = int.Parse(fc["TypeID"]);
            }
            MRPInfo bean2 = new MRPInfo();
            bean2.ID = int.Parse(fc["ID"]);
            #endregion

            #region 获得sql
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string sql = Common.updata<MRPInfo>(bean, bean2);
            //只查一条消息
            List<string> sqls = new List<string>();
            string logSql = InsertLog("修改MRP", "修改的MRP ID:" + bean2.ID, OptUserCode);
            sqls.Add(sql);
            sqls.Add(logSql);
            bool flg = Common.OptCommond(sqls, ServerPath);

            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            if (flg)
            {
                msg.Add("status", 0);
                msg.Add("data", "OK");
            }
            else
            {
                msg.Add("status", 1);
                msg.Add("data", "fail");
            }
            return msg.ToString();

            #endregion
        }

        #endregion

        #region 删除数据

        /// <summary>
        /// 删除用户数据
        /// </summary>
        /// <param name="fc"></param>
        /// <returns></returns>
        [HttpPost]
        public string delUser(FormCollection fc)
        {
            //查找用户数据
            JObject msg = new JObject();
            #region 获取数据
            string OptUserCode = fc["OptUserCode"];
            UserInfo bean = new UserInfo();
            bean.ID = int.Parse(fc["ID"]);


            #endregion

            #region 查询数据
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string sql = Common.del<UserInfo>(bean);
            //只查一条消息
            List<string> sqls = new List<string>();
            string logSql = InsertLog("删除用户", "删除用户ID："+bean.ID, OptUserCode);
            sqls.Add(sql);
            sqls.Add(logSql);
            bool flg = Common.OptCommond(sqls, ServerPath);

            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            if (flg)
            {
                msg.Add("status", 0);
                msg.Add("data", "OK");
            }
            else
            {
                msg.Add("status", 1);
                msg.Add("data", "fail");
            }
            return msg.ToString();

            #endregion
        }
        /// <summary>
        /// 删除物料数据
        /// </summary>
        /// <param name="fc"></param>
        /// <returns></returns>
        [HttpPost]
        public string delWBInfo(FormCollection fc)
        {
            JObject msg = new JObject();
            #region 获取数据
            string OptUserCode = fc["OptUserCode"];
            WBInfo bean = new WBInfo();
            bean.ID = int.Parse(fc["ID"]);
            #endregion

            #region 获得sql
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string sql = Common.del<WBInfo>(bean);
            //只查一条消息
            List<string> sqls = new List<string>();
            string logSql = InsertLog("删除物料班组", "删除物料班组ID：" + bean.ID, OptUserCode);
            sqls.Add(sql);
            sqls.Add(logSql);
            bool flg = Common.OptCommond(sqls, ServerPath);

            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            if (flg)
            {
                msg.Add("status", 0);
                msg.Add("data", "OK");
            }
            else
            {
                msg.Add("status", 1);
                msg.Add("data", "fail");
            }
            return msg.ToString();

            #endregion
        }

        /// <summary>
        /// 删除MRP
        /// </summary>
        /// <param name="fc"></param>
        /// <returns></returns>
        public string delMRPInfo(FormCollection fc)
        {
            JObject msg = new JObject();
            #region 获取数据
            string OptUserCode = fc["OptUserCode"];
            MRPInfo bean = new MRPInfo();
            bean.ID = int.Parse(fc["ID"]);
            #endregion

            #region 获得sql
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string sql = Common.del<MRPInfo>(bean);
            //只查一条消息
            List<string> sqls = new List<string>();
            string logSql = InsertLog("删除MRP", "删除MRP ID：" + bean.ID, OptUserCode);
            sqls.Add(sql);
            sqls.Add(logSql);
            bool flg = Common.OptCommond(sqls, ServerPath);

            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            if (flg)
            {
                msg.Add("status", 0);
                msg.Add("data", "OK");
            }
            else
            {
                msg.Add("status", 1);
                msg.Add("data", "fail");
            }
            return msg.ToString();

            #endregion
        }
        [HttpPost]
        public string delMRPInfos(FormCollection fc)
        {
            JObject msg = new JObject();
            #region 获取数据
            string OptUserCode = fc["OptUserCode"];
            string[] IDS = fc["IDS"].Split(',');
            List<MRPInfo> beans = new List<MRPInfo>();
            foreach (string str in IDS) {
                MRPInfo bean = new MRPInfo()
                {
                    ID = int.Parse(str)
                };
                beans.Add(bean);
            }
            #endregion

            #region 获得sql
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            List<string> sqls = Common.dels<MRPInfo>(beans);
            //只查一条消息
            string logSql = InsertLog("批量删除MRP", "删除MRP IDS：" + fc["IDS"], OptUserCode);
            sqls.Add(logSql);
            bool flg = Common.OptCommond(sqls, ServerPath);

            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            if (flg)
            {
                msg.Add("status", 0);
                msg.Add("data", "OK");
            }
            else
            {
                msg.Add("status", 1);
                msg.Add("data", "fail");
            }
            return msg.ToString();

            #endregion
        }

        [HttpPost]
        public string delWBInfos(FormCollection fc)
        {
            JObject msg = new JObject();
            #region 获取数据
            string OptUserCode = fc["OptUserCode"];
            string[] IDS = fc["IDS"].Split(',');
            List<WBInfo> beans = new List<WBInfo>();
            foreach (string str in IDS)
            {
                WBInfo bean = new WBInfo()
                {
                    ID = int.Parse(str)
                };
                beans.Add(bean);
            }
            #endregion

            #region 获得sql
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            List<string> sqls = Common.dels<WBInfo>(beans);
            //只查一条消息
            string logSql = InsertLog("批量删除物料班组", "删除物料班组IDS：" + fc["IDS"], OptUserCode);
            sqls.Add(logSql);
            bool flg = Common.OptCommond(sqls, ServerPath);

            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            if (flg)
            {
                msg.Add("status", 0);
                msg.Add("data", "OK");
            }
            else
            {
                msg.Add("status", 1);
                msg.Add("data", "fail");
            }
            return msg.ToString();

            #endregion
        }

        /// <summary>
        /// 删除调度单 并且删除文件
        /// </summary>
        /// <param name="fc"></param>
        /// <returns></returns>
        public string delUploadInfo(FormCollection fc) {
            JObject msg = new JObject();
            #region 获取数据
            string OptUserCode = fc["OptUserCode"];
            UploadInfo bean = new UploadInfo();
            bean.ID = int.Parse(fc["ID"]);
            bean.Path = fc["Path"];
            #endregion

            #region 获得sql
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            string sql = Common.del<UploadInfo>(bean);
            //只查一条消息
            List<string> sqls = new List<string>();
            string logSql = InsertLog("删除调度单", "调度单ID：" + bean.ID+",文件名路径:"+bean.Path, OptUserCode);
            sqls.Add(sql);
            sqls.Add(logSql);
            bool flg = Common.OptCommond(sql, ServerPath);
            if (flg) {
                System.IO.File.Delete(bean.Path);
            }
            #endregion

            #region 处理数据

            #endregion

            #region 返回数据
            if (flg)
            {
                msg.Add("status", 0);
                msg.Add("data", "OK");
            }
            else
            {
                msg.Add("status", 1);
                msg.Add("data", "fail");
            }
            return msg.ToString();

            #endregion
        }

        #endregion

        #region 文件上传 
        [HttpPost]
        public string uploadfile(FormCollection fc) {
            JObject msg = new JObject();
            string OptUserCode = fc["OptUserCode"];
            string ServerPath = Server.MapPath("/WebCfg/Db.json");
            try
            {
                string url = HttpContext.Server.MapPath("/uploadFile");
                string FileName = Lw_Utils.CreatenTimestamp() + "";
                if (Request.Files.Count > 0)
                {
                    foreach (string key in Request.Files.AllKeys)
                    {
                        UploadInfo bean = new UploadInfo();
                        HttpPostedFileBase file = Request.Files.Get(key);
                        string Full_FileName = FileName + Lw_Utils.GetFileSuf(file.FileName);
                        file.SaveAs(url +"\\"+ Full_FileName);
                        bean.FileName = Full_FileName;
                        bean.Path = url + "\\" + Full_FileName;
                        bean.Budat = DateTime.Now.ToString("yyy-MM-dd HH:mm:ss");
                        List<string> sqls = new List<string>();
                        string sql = Common.add<UploadInfo>(bean);
                        string logSql = InsertLog("添加调度单", "文件路径：" + bean.Path, OptUserCode);
                        sqls.Add(sql);
                        sqls.Add(logSql);
                        Common.OptCommond(sqls, ServerPath);
                    }
                }
                msg.Add("status", 0);
                msg.Add("data", "OK");
            }
            catch (Exception) {
                msg.Add("status", 1);
                msg.Add("data", "fail");
                throw;
            }
            return msg.ToString();
        }

        #endregion

        #region 日志操作
        public string InsertLog(string TypeName,string Contents,string UserCode) {
            LogInfo log = new LogInfo()
            {
                TypeName = TypeName,
                Contents = Contents,
                UserCode = UserCode,
                DateTime1 = DateTime.Now
            };
            return Common.add<LogInfo>(log);
        }
        #endregion
    }
}