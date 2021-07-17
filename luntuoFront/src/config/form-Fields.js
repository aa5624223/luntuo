//导入模拟的数据
import {Werks} from "../anaData"

//获得工厂搜索框的options
export const FactoryList = ()=>{
  //Werks
  const Options = Werks.map(item=>{
    return {value:item.ID,text:item.Name}
  })
  return Options;
}
//获得业务类别下拉框
const TypeList = (TypeInfo)=>{
  //Werks
  const Options = TypeInfo.map(item=>{
    return {value:item.ID,text:item.Name}
  })
  return Options;
} 
//获得工厂类别下拉列表
export const GetFalineList = ()=>{
  return [
    {label:'南线',value:'南线'},
    {label:'北线',value:'北线'}
  ]
}
//入库单的搜索表单配置
/*
    类型 
    Input, 文本搜索框
    Select, 选择框
    DateTime, 日期框 带开始和结束日期，获取字段为 name[]
    SelectFind, 带搜索功能的选择框
*/
export const polistFielsds = [
    {
      key:'Fiels_0',
      span:5,//input长度
      name:'status',//Form的名字
      label:'状态',//对应的label
      //rules:[{ required: true,message: 'Input something!',}],//对应规则
      type:'Select',//类型 Input,Select,DateTime 等等
      Options:[//如果时Select时必须有这个
        {value:'',text:''},
        {value:'待确认',text:'待确认'},
        {value:'已确认',text:'已确认'},
      ],
      defaultValue:'待确认',//默认值
      placeholder:'状态',//不填写时显示的
    },
    {
      key:'Fiels_1',
      span:6,//input长度
      name:'CPOID',//Form的名字
      label:'采购单号',//对应的label
      //rules:[{ required: true,message: 'Input something!',}],//对应规则
      type:'Input',//类型 Input,Select,DateTime 等等
      placeholder:'采购单号',//不填写时显示的
    },
    {
      key:'Fiels_2',
      span:8,//input长度
      name:'DPODATE',//Form的名字
      label:'订单日期',//对应的label
      //rules:[{ required: true,message: 'Input something!',}],//对应规则
      type:'DateTime',//类型 Input,Select,DateTime 等等
      placeholder:'订单日期',//不填写时显示的
    },
    {
      key:'Fiels_3',
      span:12,//input长度
      name:'CVenCode',//Form的名字
      label:'供应商',//对应的label
      //rules:[{ required: true,message: 'Input something!',}],//对应规则
      type:'SelectFind',//类型 Input,Select,DateTime 等等
      Options:[//如果是Select时必须有这个
        {value:'',text:''},
        {value:'602209',text:'602209--常州市金坛隆宇铸造厂(普通合伙)'},
        {value:'602237',text:'602237--常州宏仁工具有限公司'},
        {value:'602270',text:'602270--常州市聚商商贸有限公司'},
        {value:'601140',text:'601140--常州凯瑟琳物资有限公司'},
        {value:'604091',text:'604091--兴化市合鑫机械设备厂'},
        {value:'601162',text:'601162--江苏亚美特传动科技股份有限公司'},
      ],
      defaultValue:'输入搜索',//默认值
      placeholder:'供应商',//不填写时显示的
    },
]

//用户搜索文本框
export const UserConfigFielsds=[
  {
    key:'Fiels_1',
    span:20,//input长度
    name:'UserName',//Form的名字
    label:'用户名',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'用户名',//不填写时显示的
  },
]
//MRP表搜索框
export const MRPFielsds = (TypeInfo)=>{

  return [
    {
      key:'Fiels_2',
      span:5,//input长度
      name:'TypeID',//Form的名字
      label:'业务',
      type:'SelectFind',//类型 Input,Select,DateTime 等等
      Options:TypeList(TypeInfo),
      defaultValue:'输入搜索',//默认值
      placeholder:'业务',//不填写时显示的
    },
    {
        key:'Fiels_3',
        span:4,//input长度
        name:'MRP',//Form的名字
        label:'MRP',//对应的label
        //rules:[{ required: true,message: 'Input something!',}],//对应规则
        type:'Input',//类型 Input,Select,DateTime 等等
        placeholder:'MRP',//不填写时显示的
    }
  ]
} 
//WBInfo 搜索框
export const WBInfoFielsds=[
  {
    key:'Fiels_2',
    span:4,//input长度
    name:'Matnr',//Form的名字
    label:'物料编码',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'物料编码',//不填写时显示的
  },
  {
    key:'Fiels_3',
    span:4,//input长度
    name:'Maktx',//Form的名字
    label:'物料名称',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'物料名称',//不填写时显示的
  },
  // {
  //   key:'Fiels_4',
  //   span:4,//input长度
  //   name:'Group',//Form的名字
  //   label:'班组',//对应的label
  //   //rules:[{ required: true,message: 'Input something!',}],//对应规则
  //   type:'Input',//类型 Input,Select,DateTime 等等
  //   placeholder:'班组',//不填写时显示的
  // }
]
//BjInfo 钣金需求 搜索框
export const BjInfoFielsds=[
  {
    key:'Fiels_1',
    span:6,//input长度
    name:'Prooerty',//Form的名字
    label:'属性',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'属性',//不填写时显示的
  },
  {
    key:'Fiels_2',
    span:6,//input长度
    name:'FirstCode',//Form的名字
    label:'一层编码',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'一层编码',//不填写时显示的
  },
  {
    key:'Fiels_3',
    span:6,//input长度
    name:'FirstName',//Form的名字
    label:'一层名称',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'一层名称',//不填写时显示的
  },
  {
    key:'Fiels_4',
    span:6,//input长度
    name:'SecondCode',//Form的名字
    label:'二层编码',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'二层编码',//不填写时显示的
  },
  {
    key:'Fiels_5',
    span:6,//input长度
    name:'SecondName',//Form的名字
    label:'二层名称',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'二层名称',//不填写时显示的
  },
  {
    key:'Fiels_6',
    span:6,//input长度
    name:'ThirdCode',//Form的名字
    label:'三层编码',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'三层编码',//不填写时显示的
  },
  {
    key:'Fiels_7',
    span:6,//input长度
    name:'ThirdName',//Form的名字
    label:'三层名称',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'三层名称',//不填写时显示的
  },
  {
    key:'Fiels_8',
    span:6,//input长度
    name:'FourthCode',//Form的名字
    label:'四层编码',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'四层编码',//不填写时显示的
  },
  {
    key:'Fiels_9',
    span:6,//input长度
    name:'FourthName',//Form的名字
    label:'四层名称',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'四层名称',//不填写时显示的
  },
  {
    key:'Fiels_10',
    span:6,//input长度
    name:'FifthCode',//Form的名字
    label:'五层编码',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'五层编码',//不填写时显示的
  },
  {
    key:'Fiels_11',
    span:6,//input长度
    name:'FifthName',//Form的名字
    label:'五层名称',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'五层名称',//不填写时显示的
  },
]
//JjInfo 机加需求表
export const JjInfoFielsds=[
  {
    key:'Fiels_1',
    span:6,//input长度
    name:'Series',//Form的名字
    label:'系列',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'系列',//不填写时显示的
  },
  {
    key:'Fiels_2',
    span:6,//input长度
    name:'Matnr',//Form的名字
    label:'子键物料号',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'子键物料号',//不填写时显示的
  },
  {
    key:'Fiels_3',
    span:6,//input长度
    name:'Maktx',//Form的名字
    label:'子键物料描述',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'子键物料描述',//不填写时显示的
  },
  {
    key:'Fiels_4',
    span:6,//input长度
    name:'Group',//Form的名字
    label:'班组',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'班组',//不填写时显示的
  },
]
//CgInfo 采购需求表
export const CgInfoFielsds=[
  {
    key:'Fiels_1',
    span:6,//input长度
    name:'Matnr',//Form的名字
    label:'物料编码',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'物料编码',//不填写时显示的
  },
  {
    key:'Fiels_2',
    span:6,//input长度
    name:'Budat',//Form的名字
    label:'需求日期',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'DateTime',//类型 Input,Select,DateTime 等等
    placeholder:'需求日期',//不填写时显示的
  },
  {
    key:'Fiels_3',
    span:6,//input长度
    name:'MRP',//Form的名字
    label:'MRP控制者',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'MRP控制者',//不填写时显示的
  },
  {
    key:'Fiels_6',
    span:6,//input长度
    name:'Lifnr',//Form的名字
    label:'供应商代码',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'供应商代码',//不填写时显示的
  },
  {
    key:'Fiels_7',
    span:6,//input长度
    name:'Name1',//Form的名字
    label:'供应商名称',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'供应商名称',//不填写时显示的
  },
]
//机加需求表 搜索框
export const V_JjInfoFielsds=[
  {
    key:'Fiels_1',
    span:6,//input长度
    name:'Series',//Form的名字
    label:'型号',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'型号',//不填写时显示的
  },
  {
    key:'Fiels_2',
    span:6,//input长度
    name:'Matnr',//Form的名字
    label:'子键物料号',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'子键物料号',//不填写时显示的
  },
  {
    key:'Fiels_3',
    span:6,//input长度
    name:'Maktx',//Form的名字
    label:'子键物料描述',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'子键物料描述',//不填写时显示的
  }
]
//采购需求表 搜索框
export const V_CgInfoFielsds=[
  {
    key:'Fiels_1',
    span:6,//input长度
    name:'Matnr',//Form的名字
    label:'物料编码',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'物料编码',//不填写时显示的
  },
  {
    key:'Fiels_2',
    span:6,//input长度
    name:'Maktx',//Form的名字
    label:'物料描述',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'物料描述',//不填写时显示的
  },
  {
    key:'Fiels_3',
    span:6,//input长度
    name:'Budat',//Form的名字
    label:'需求日期',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'DateTime',//类型 Input,Select,DateTime 等等
    placeholder:'需求日期',//不填写时显示的
  },
  {
    key:'Fiels_6',
    span:6,//input长度
    name:'Lifnr',//Form的名字
    label:'供应商代码',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'供应商代码',//不填写时显示的
  },
  {
    key:'Fiels_7',
    span:6,//input长度
    name:'Name1',//Form的名字
    label:'供应商名称',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'供应商名称',//不填写时显示的
  },
  {
    key:'Fiels_8',
    span:6,//input长度
    name:'MRP',//Form的名字
    label:'MRP控制者',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'MRP控制者',//不填写时显示的
  },
]
//操作记录
export const V_LogInfoFielsds=[
  {
    key:'Fiels_1',
    span:6,//input长度
    name:'TypeName',//Form的名字
    label:'操作类型',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'操作类型',//不填写时显示的
  },
  {
    key:'Fiels_2',
    span:6,//input长度
    name:'DateTime1',//Form的名字
    label:'操作时间',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'DateTime',//类型 Input,Select,DateTime 等等
    placeholder:'操作时间',//不填写时显示的
  },
  {
    key:'Fiels_3',
    span:6,//input长度
    name:'UserName',//Form的名字
    label:'操作人',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'操作人',//不填写时显示的
  }
]
export const DdOrder = [
  {
    key:'Fiels_2',
    span:6,//input长度
    name:'DateTime1',//Form的名字
    label:'计划月份',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'DateTime',//类型 Input,Select,DateTime 等等
    placeholder:'计划月份',//不填写时显示的
  },
  {
    key:'Fiels_3',
    span:6,//input长度
    name:'status',//Form的名字
    label:'是否生效',//对应的label
    //rules:[{ required: true,message: 'Input something!',}],//对应规则
    type:'Input',//类型 Input,Select,DateTime 等等
    placeholder:'是否生效',//不填写时显示的
  }
]