using Entity.Interface;
using Entity.Tags;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.luntuo
{
    public class CgInfo : IEntity
    {
        #region 属性

        /// <summary>
        /// 主键
        /// </summary>
        [Property("PK")]
        public long ID { get; set; }

        /// <summary>
        /// 物料描述
        /// </summary>
        [Property()]
        public string Maktx { get; set; }

        /// <summary>
        /// 物料编码
        /// </summary>
        [Property()]
        public string Matnr { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property(StringModel = 1,Model = 1)]
        public string Budat { get; set; }

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

        /// <summary>
        /// 用户名
        /// </summary>
        [Property()]
        public string Lifnr { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property()]
        public string Name1 { get; set; }

        /// <summary>
        /// 数量
        /// </summary>
        [Property(Model = 3)]
        public decimal Menge { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property( Model = 3)]
        public decimal PEIE { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property( Model = 3)]
        public decimal JSKC { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property(Model = 3)]
        public decimal CLKC { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property( Model = 3)]
        public decimal SHDJ { get; set; }

        [Property(Model = 3)]
        public int TbCount { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Property()]
        public string UserCode { get; set; }

        /// <summary>
        /// 外键 调度单
        /// </summary>
        public long DID { get; set; }

        #endregion
    }
}
