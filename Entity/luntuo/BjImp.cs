using Entity.Interface;
using Entity.Tags;

namespace Entity.luntuo
{
    public class BjImp : IEntity
    {
        #region 属性

        /// <summary>
        /// 主键
        /// </summary>
        [Property("PK")]
        public long ID { get; set; }

        [Property()]
        public string Matnr { get; set; }

        [Property(Model = 3)]
        public decimal Menge { get; set; }

        [Property()]
        public string Series { get; set; }

        /// <summary>
        /// 同步码
        /// </summary>
        [Property(Model = 3)]
        public int TbCount { get; set; }

        /// <summary>
        /// 用户编码
        /// </summary>
        [Property()]
        public string UserCode { get; set; }


        /// <summary>
        /// 状态
        /// 1.已完成
        /// 2.执行中
        /// 3.异常
        /// 4.执行超时
        /// 5.执行中
        /// </summary>
        [Property()]
        public string status { get; set; }

        [Property()]
        public string Datetime1 { get; set; }

        #endregion
    }


}
