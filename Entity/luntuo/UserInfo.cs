using Entity.Interface;
using Entity.Tags;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.luntuo
{
    public class UserInfo : IEntity
    {
        #region 属性

        /// <summary>
        /// 主键
        /// </summary>
        [Property("PK")]
        public long ID { get; set; }

        /// <summary>
        /// 用户名编号 登录
        /// </summary>
        [Property()]
        public string UserCode { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property()]
        public string UserName { get; set; }

        /// <summary>
        /// 密码
        /// </summary>
        [Property()]
        public string PWD { get; set; }

        /// <summary>
        /// 权限
        /// </summary>
        [Property()]
        public string Roles { get; set; }

        #endregion
    }
}
