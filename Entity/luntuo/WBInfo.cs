using Entity.Interface;
using Entity.Tags;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.luntuo
{
    public class WBInfo : IEntity
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
        [Property(Model = 1)]
        public string Matnr { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property(Model = 1)]
        public string Maktx { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property()]
        public string Bz { get; set; }

        #endregion
    }
}
