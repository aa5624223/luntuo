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
        [Property()]
        public string FirstCode { get; set; }

        /// <summary>
        /// 一层名称
        /// </summary>
        [Property()]
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
        /// 用户名
        /// </summary>
        [Property(Model = 3)]
        public decimal menge { get; set; }

        [Property()]
        public string UserCode { get; set; }

        #endregion
    }
}
