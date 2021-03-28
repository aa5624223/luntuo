 using Entity.Interface;
using Entity.Tags;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.luntuo
{
    public class MRPInfo : IEntity
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
        public string MRP { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property(Model = 3)]
        public long TypeID { get; set; }



        #endregion
    }
}
