 using Entity.Interface;
using Entity.Tags;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.luntuo
{
    public class V_MRPInfo : IEntity
    {
        #region 属性

        /// <summary>
        /// 主键
        /// </summary>
        [Property("PK")]
        public long ID { get; set; }


        /// <summary>
        /// MRP
        /// </summary>
        [Property()]
        public string MRP { get; set; }

        /// <summary>
        /// 业务名称
        /// </summary>
        [Property()]
        public string Name { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Property(Model = 3)]
        public long TypeID { get; set; }



        #endregion
    }
}
