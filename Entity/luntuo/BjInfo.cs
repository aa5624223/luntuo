using Entity.Interface;
using Entity.Tags;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.luntuo
{
    public class BjInfo : IEntity
    {
        #region 属性

        /// <summary>
        /// 主键
        /// </summary>
        [Property("PK")]
        public long ID { get; set; }

        [Property()]
        public string FirstCode { get; set; }

        [Property()]
        public string FirstName { get; set; }

        [Property(Model = 3)]
        public decimal Num1 { get; set; }

        [Property()]
        public string Prooerty { get; set; }

        [Property()]
        public string SecondCode { get; set; }
        [Property()]
        public string SecondName { get; set; }

        [Property(Model = 3)]
        public decimal Num2 { get; set; }

        [Property()]
        public string ThirdCode { get; set; }
        [Property()]
        public string ThirdName { get; set; }

        [Property(Model = 3)]
        public decimal Num3 { get; set; }

        [Property()]
        public string FourthCode { get; set; }

        [Property()]
        public string FourthName { get; set; }

        [Property(Model = 3)]
        public decimal Num4 { get; set; }

        [Property()]
        public string FifthCode { get; set; }

        [Property()]
        public string FifthName { get; set; }

        [Property()]
        public string SixthCode { get; set; }

        [Property()]
        public string SixthName { get; set; }


        [Property(Model = 3)]
        public decimal Num5 { get; set; }

        [Property()]
        public string Meins { get; set; }

        [Property()]
        public string MRP { get; set; }

        [Property(Model = 3)]
        public int TbCount { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Property()]
        public string UserCode { get; set; }

        [Property(Model =3)]
        public long DID { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Property(Model = 3 )]
        public string Series { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Property()]
        public DateTime Datetime1 { get; set; }

        [Property]
        public string Pline1 { get; set; }

        [Property]
        public string Pline2 { get; set; }

        [Property]
        public string Pline3 { get; set; }

        [Property]
        public string Pline4 { get; set; }

        [Property]
        public string Pline5 { get; set; }

        #endregion
    }
}
