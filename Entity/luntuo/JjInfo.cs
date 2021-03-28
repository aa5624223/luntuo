using Entity.Interface;
using Entity.Tags;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.luntuo
{
    public class JjInfo : IEntity
    {
        #region 属性

        /// <summary>
        /// 主键
        /// </summary>
        [Property("PK")]
        public long ID { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property()]
        public string Series { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property()]
        public string Matnr { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property()]
        public string Maktx { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property(Model=3)]
        public decimal Menge { get; set; }

        ///// <summary>
        ///// 用户名
        ///// </summary>
        //[Property()]
        //public string Group { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property()]
        public string MRP { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property()]
        public string Meins { get; set; }

        [Property(Model = 3)]
        public int TbCount { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Property()]
        public string UserCode { get; set; }

        #endregion
    }
}
