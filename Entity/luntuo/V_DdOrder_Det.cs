using Entity.Interface;
using Entity.Tags;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.luntuo
{
    public class V_DdOrder_Det : IEntity
    {
        /// <summary>
        /// 主键
        /// </summary>
        [Property("PK")]
        public long ID { get; set; }

        /// <summary>
        /// 主订单号
        /// </summary>
        [Property()]
        public string LTOrder { get; set; }

        /// <summary>
        /// 主订单号 版本号
        /// </summary>
        [Property(Model = 3)]
        public int TbCount { get; set; }

        /// <summary>
        /// 主订单号 状态 是-否
        /// </summary>
        [Property()]
        public string status { get; set; }

        /// <summary>
        /// 主订单号 产线 
        /// </summary>
        [Property()]
        public string Faline { get; set; }

        /// <summary>
        /// 主订单号 上传时间
        /// </summary>
        [Property()]
        public DateTime UpTime { get; set; }

        /// <summary>
        /// 主订单号 钣金状态
        /// </summary>
        [Property()]
        public string BjStatus { get; set; }

        /// <summary>
        /// 主订单号 机加状态
        /// </summary>
        [Property()]
        public string JjStatus { get; set; }

        /// <summary>
        /// 主订单号 采购状态
        /// </summary>
        [Property()]
        public string CgStatus { get; set; }

        /// <summary>
        /// 主订单号 最近执行时间
        /// </summary>
        [Property()]
        public string RecTime { get; set; }

        /// <summary>
        /// 主订单号 计划月份 20200401
        /// </summary>
        [Property()]
        public string PlanDt { get; set; }

        /// <summary>
        /// 主订单号 序号
        /// </summary>
        [Property()]
        public string NO { get; set; }

        /// <summary>
        /// 主订单号 ID
        /// </summary>
        [Property(Model = 3 )]
        public long DID { get; set; }

        /// <summary>
        /// 明细状态 待执行
        /// </summary>
        [Property()]
        public string Det_status { get; set; }

        /// <summary>
        /// 明细 投产日期 20200401
        /// </summary>
        [Property()]
        public string Datetime1 { get; set; }

        /// <summary>
        /// 明细 整机编码
        /// </summary>
        [Property()]
        public string ZjNo { get; set; }

        /// <summary>
        /// 明细 物料编码
        /// </summary>
        [Property()]
        public string Matnr { get; set; }

        /// <summary>
        /// 明细 系列
        /// </summary>
        [Property()]
        public string Series { get; set; }

        /// <summary>
        /// 明细 分动箱
        /// </summary>
        [Property()]
        public string Box { get; set; }

        /// <summary>
        /// 明细 数量
        /// </summary>
        [Property(Model = 3)]
        public decimal Num { get; set; }

        /// <summary>
        /// 明细 配置
        /// </summary>
        [Property()]
        public string Config { get; set; }

        /// <summary>
        /// 明细 备注
        /// </summary>
        [Property()]
        public string Bz { get; set; }

        /// <summary>
        /// 明细 交库时间 20200401
        /// </summary>
        [Property()]
        public string Datetime2 { get; set; }

    }
}
