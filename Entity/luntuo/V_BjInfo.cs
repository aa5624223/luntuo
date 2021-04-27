using Entity.Interface;
using Entity.Tags;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.luntuo
{
    public class V_BjInfo : IEntity
    {
        #region 属性

        /// <summary>
        /// 主键
        /// </summary>
        [Property("PK")]
        public long ID { get; set; }

        /// <summary>
        /// 一层编码
        /// </summary>
        [Property(Model = 1)]
        public string FirstCode { get; set; }

        /// <summary>
        /// 一层名称
        /// </summary>
        [Property(Model = 1)]
        public string FirstName { get; set; }

        /// <summary>
        /// 属性
        /// </summary>
        [Property()]
        public string Prooerty { get; set; }

        /// <summary>
        /// 二层编码
        /// </summary>
        [Property()]
        public string SecondCode { get; set; }

        /// <summary>
        /// 二层名称
        /// </summary>
        [Property()]
        public string SecondName { get; set; }

        /// <summary>
        /// 三层编码
        /// </summary>
        [Property()]
        public string ThirdCode { get; set; }

        /// <summary>
        /// 三层名称
        /// </summary>
        [Property()]
        public string ThirdName { get; set; }

        /// <summary>
        /// 四层编码
        /// </summary>
        [Property()]
        public string FourthCode { get; set; }

        /// <summary>
        /// 四层名称
        /// </summary>
        [Property()]
        public string FourthName { get; set; }

        /// <summary>
        /// 五层编码
        /// </summary>
        [Property()]
        public string FifthCode { get; set; }

        /// <summary>
        /// 五层名称
        /// </summary>
        [Property()]
        public string FifthName { get; set; }

        /// <summary>
        /// 单位
        /// </summary>
        [Property()]
        public string Meins { get; set; }

        /// <summary>
        /// MRP控制者
        /// </summary>
        [Property()]
        public string MRP { get; set; }

        /// <summary>
        /// 1层数量
        /// </summary>
        [Property(Model = 3)]
        public decimal Num1 { get; set; }

        /// <summary>
        /// 2层数量
        /// </summary>
        [Property(Model = 3)]
        public decimal Num2 { get; set; }

        /// <summary>
        /// 3层数量
        /// </summary>
        [Property(Model = 3)]
        public decimal Num3 { get; set; }

        /// <summary>
        /// 4层数量
        /// </summary>
        [Property(Model = 3)]
        public decimal Num4 { get; set; }

        /// <summary>
        /// 5层数量
        /// </summary>
        [Property(Model = 3)]
        public decimal Num5 { get; set; }

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
        [Property]
        public DateTime Datetime1 { get; set; }

        [Property]
        public string Series { get; set; }

        #endregion
    }
}
