using Entity.Tags;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.luntuo
{
    /// <summary>
    /// 采购表 总计
    /// </summary>
    public class V_Sum_Num_CgInfo
    {
        /// <summary>
        /// 主键 调度单
        /// </summary>
        [Property("PK")]
        public long DID { get; set; }

        /// <summary>
        /// 物料编码
        /// </summary>
        [Property()]
        public string Matnr { get; set; }

        /// <summary>
        /// 数量
        /// </summary>
        [Property(Model = 3)]
        public decimal Num { get; set; }

        /// <summary>
        /// 系列
        /// </summary>
        [Property()]
        public string Series { get; set; }


    }
}
