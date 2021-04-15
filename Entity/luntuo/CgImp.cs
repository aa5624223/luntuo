using Entity.Interface;
using Entity.Tags;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.luntuo
{
    public class CgImp : IEntity
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
        public string MATNR { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property()]
        public string Menge { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property()]
        public string Datetime1 { get; set; }

        /// <summary>
        /// 同步码
        /// </summary>
        [Property(Model = 3)]
        public int TbCount { get; set; }

        /// <summary>
        /// 用户编码
        /// </summary>
        [Property()]
        public string UserCode { get; set; }


        /// <summary>
        /// 状态
        /// 1.已完成
        /// 2.执行中
        /// 3.异常
        /// 4.执行超时
        /// 5.执行中
        /// </summary>
        [Property()]
        public string status { get; set; }

        #endregion
    }
}
