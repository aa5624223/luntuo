using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.SapConn
{
    /// <summary>
    /// 轮托连接的配置数据
    /// </summary>
    class SapConn
    {
        #region 数据库的配置 

        /// <summary>
        /// 端口号
        /// </summary>
        public string CLIENT { get; set; }

        /// <summary>
        /// 服务器地址
        /// </summary>
        public string SERVER { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        public string USER { get; set; }

        /// <summary>
        /// 密码
        /// </summary>
        public string PASSWORD { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string SYSTEMID { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string NUMBER { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string LANGUAGE { get; set; }

        #endregion

        #region 静态的配置

        /// <summary>
        /// 
        /// </summary>
        public string Name { get; set; }

        public string SystemID { get; set; }

        public string PoolSize { get; set; }

        public string MaxPoolSize { get; set; }

        public string IdleTimeout { get; set; }

        public string Codepage { get; set; }

        #endregion

    }
}
