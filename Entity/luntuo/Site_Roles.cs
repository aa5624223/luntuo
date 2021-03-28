using Entity.Interface;
using Entity.Tags;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.luntuo
{
    public class Site_Roles : IEntity
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
        public string title { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property()]
        public string UrlKey { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property(Model = 3)]
        public long parentId { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property(Model = 3)]
        public int isOpt { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property(Model = 3)]
        public long cOrder { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property(Model = 3)]
        public int isMenu { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property()]
        public string cComponey { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property(Model = 3)]
        public int isAuth { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property(Model = 3)]
        public int isSubMenu { get; set; }

        #endregion
    }
}
