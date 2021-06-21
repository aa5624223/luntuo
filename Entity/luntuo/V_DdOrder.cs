using Entity.Interface;
using Entity.Tags;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.luntuo
{
    public class V_DdOrder : IEntity
    {
        #region 属性

        /// <summary>
        /// 主键
        /// </summary>
        [Property("PK")]
        public long ID { get; set; }

        /// <summary>
        /// 订单号
        /// 格式 LT+YYYY+MM+(ID%100)
        /// </summary>
        [Property(Model = 1)]
        public string LTOrder { get; set; }

        /// <summary>
        /// 版本号
        /// </summary>
        [Property(Model = 3)]
        public int TbCount { get; set; } = -1;

        /// <summary>
        /// 状态
        /// 1.生效
        /// 0.不生效
        /// </summary>
        [Property(Model = 0)]
        public string status { get; set; }

        [Property(Model = 2, Colums = "status", NotSelect = true)]
        public string statusStr { get; set; }

        /// <summary>
        /// 产线 南线/北线
        /// </summary>
        [Property()]
        public string Faline { get; set; }

        /// <summary>
        /// 上传时间
        /// </summary>
        [Property()]
        public DateTime UpTime { get; set; }

        /// <summary>
        /// 钣金需求单状态
        /// </summary>
        [Property()]
        public string BjStatus { get; set; }

        /// <summary>
        /// 机加需求单状态
        /// </summary>
        [Property()]
        public string JjStatus { get; set; }

        /// <summary>
        /// 采购需求单状态
        /// </summary>
        [Property()]
        public string CgStatus { get; set; }

        /// <summary>
        /// 最近需求执行时间
        /// </summary>
        [Property()]
        public DateTime RecTime { get; set; }

        /// <summary>
        /// 计划月份
        /// </summary>
        [Property()]
        public string PlanDt { get; set; }

        /// <summary>
        /// 序号
        /// </summary>
        [Property(Model = 3)]
        public int NO { get; set; } = -1;

        [Property()]
        public string BjStatus1 { get; set; }

        [Property()]
        public string JjStatus1 { get; set; }

        [Property()]
        public string CgStatus1 { get; set; }


        /// <summary>
        /// 采购最近执行时间
        /// </summary>
        [Property()]
        public DateTime CgTime { get; set; }

        /// <summary>
        /// 采购最近执行人
        /// </summary>
        [Property()]
        public string CgPer { get; set; }

        /// <summary>
        /// 钣金最近执行时间
        /// </summary>
        [Property()]
        public DateTime BjTime { get; set; }


        /// <summary>
        /// 钣金最近执行人
        /// </summary>
        [Property()]
        public string BjPer { get; set; }

        /// <summary>
        /// 机加最近执行时间
        /// </summary>
        [Property()]
        public DateTime JjTime { get; set; }

        /// <summary>
        /// 机加最近执行人
        /// </summary>
        [Property()]
        public string JjPer { get; set; }

        /// <summary>
        /// 库存基准日期
        /// </summary>
        [Property()]
        public DateTime CgBaseTime { get; set; }


        #endregion
    }
}
