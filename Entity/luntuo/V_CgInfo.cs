using Entity.Interface;
using Entity.Tags;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.luntuo
{
    public class V_CgInfo : IEntity
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
        [Property(Model = 1)]
        public string Maktx { get; set; }

        /// <summary>
        /// 物料编码
        /// </summary>
        [Property()]
        public string Matnr { get; set; }

        /// <summary>
        /// 需求日期
        /// </summary>
        [Property(StringModel=1,Model = 1)]
        public string Budat { get; set; }

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

        /// <summary>
        /// 供应商代码
        /// </summary>
        [Property()]
        public string Lifnr { get; set; }

        /// <summary>
        /// 供应商名称
        /// </summary>
        [Property(Model = 3)]
        public string Name1 { get; set; }

        /// <summary>
        /// 数量
        /// </summary>
        [Property(Model = 3)]
        public decimal Menge { get; set; }

        /// <summary>
        /// 配额
        /// </summary>
        [Property(Model = 3)]
        public decimal PEIE { get; set; }

        /// <summary>
        /// 9001轮拖寄售库存
        /// </summary>
        [Property(Model = 3)]
        public decimal JSKC { get; set; }

        /// <summary>
        /// 4101轮拖材料库存
        /// </summary>
        [Property(Model = 3)]
        public decimal CLKC { get; set; }

        /// <summary>
        /// 收货冻结数量
        /// </summary>
        [Property(Model = 3)]
        public decimal SHDJ { get; set; }

        [Property()]
        public string UserCode { get; set; }

        #endregion
    }
}
