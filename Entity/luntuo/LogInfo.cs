﻿using Entity.Interface;
using Entity.Tags;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.luntuo
{
    public class LogInfo : IEntity
    {
        #region 属性

        /// <summary>
        /// 主键
        /// </summary>
        [Property("PK")]
        public long ID { get; set; }

        /// <summary>
        /// 操作类型
        /// </summary>
        [Property()]
        public string TypeName { get; set; }

        /// <summary>
        /// 操作内容
        /// </summary>
        [Property()]
        public string Contents { get; set; }

        /// <summary>
        /// 操作时间
        /// </summary>
        [Property()]
        public DateTime DateTime1 { get; set; }

        /// <summary>
        /// 操作人
        /// </summary>
        [Property()]
        public string UserCode { get; set; }

        #endregion
    }
}
