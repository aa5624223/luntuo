using Entity.Interface;
using Entity.Tags;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.luntuo
{
    public class V_JjInfo : IEntity
    {
        #region 属性

        /// <summary>
        /// 主键
        /// </summary>
        [Property("PK")]
        public long ID { get; set; }

        /// <summary>
        /// 系列
        /// </summary>
        [Property()]
        public string Series { get; set; }

        /// <summary>
        /// 子键物料号
        /// </summary>
        [Property(Model = 1)]
        public string Matnr { get; set; }

        /// <summary>
        /// 子键物料描述
        /// </summary>
        [Property(Model =1)]
        public string Maktx { get; set; }

        /// <summary>
        /// 数量
        /// </summary>
        [Property(Model = 3)]
        public decimal Menge { get; set; }

        /// <summary>
        /// 班组
        /// </summary>
        [Property()]
        public string bz { get; set; }

        /// <summary>
        /// MRP控制者
        /// </summary>
        [Property()]
        public string MRP { get; set; }

        /// <summary>
        /// 单位
        /// </summary>
        [Property()]
        public string Meins { get; set; }

        [Property()]
        public string UserCode { get; set; }

        /// <summary>
        /// 调度单
        /// </summary>
        [Property(Model = 3)]
        public long DID { get; set; }

        /// <summary>
        /// 投产日期
        /// </summary>
        public DateTime Datetime1 { get; set; }

        #endregion
    }
}
