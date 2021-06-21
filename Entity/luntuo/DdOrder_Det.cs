using Entity.Interface;
using Entity.Tags;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.luntuo
{
    public class DdOrder_Det : IEntity
    {

        #region 属性

        /// <summary>
        /// 主键
        /// </summary>
        [Property("PK")]
        public long ID { get; set; }

        /// <summary>
        /// 调度单
        /// </summary>
        [Property(Model = 3)]
        public long DID { get; set; }

        /// <summary>
        /// 状态
        /// 1.生效
        /// 0.不生效
        /// </summary>
        [Property(Model = 2)]
        public string status { get; set; }

        [Property(Model = 2, Colums = "status", NotSelect = true)]
        public string statusStr { get; set; }


        /// <summary>
        /// 投产日期
        /// char8 20200401
        /// </summary>
        [Property()]
        public string Datetime1 { get; set; }

        /// <summary>
        /// 整机编码
        /// </summary>
        [Property()]
        public string ZjNo { get; set; }

        /// <summary>
        /// 物料编码
        /// </summary>
        [Property()]
        public string Matnr { get; set; }

        /// <summary>
        /// 系列
        /// </summary>
        [Property()]
        public string Series { get; set; }

        /// <summary>
        /// 型号
        /// </summary>
        public string Model { get; set; }

        /// <summary>
        /// 分动箱
        /// </summary>
        [Property()]
        public string Box { get; set; }

        /// <summary>
        /// 数量
        /// </summary>
        [Property(Model=3)]
        public decimal Num { get; set; }

        /// <summary>
        /// 配置
        /// </summary>
        [Property()] 
        public string Config { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        [Property()]
        public string Bz { get; set; }

        /// <summary>
        /// 钣金执行状态
        /// </summary>
        [Property()]
        public string BjStatus { get; set; }

        /// <summary>
        //  机加执行状态
        /// </summary>
        [Property()]
        public string JjStatus { get; set; }

        /// <summary>
        /// 采购执行状态
        /// </summary>
        [Property()]
        public string CgStatus { get; set; }

        /// <summary>
        /// 交库时间
        /// </summary>
        [Property()]
        public string Datetime2 { get; set; }

        /// <summary>
        /// 钣金是否被勾选状态
        /// </summary>
        public int BjFlg { get; set; }

        /// <summary>
        /// 机加是否被勾选状态
        /// </summary>
        public int JjFlg { get; set; }

        /// <summary>
        /// 是否被勾选状态
        /// </summary>
        public int CgFlg { get; set; }

        #endregion

    }
}
