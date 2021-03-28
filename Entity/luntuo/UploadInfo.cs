using Entity.Interface;
using Entity.Tags;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.luntuo
{
    public class UploadInfo : IEntity
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
        public string FileName { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property()]
        public string Path { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property()]
        public string Budat { get; set; }

        #endregion
    }
}
