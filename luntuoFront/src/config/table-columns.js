import { Tag,Button} from 'antd';
import { getColumnSearchProps,getColumnSearchPropsSelect} from "../utils";
import LinkButton from "../components/link-button"
import moment from 'moment'

/* 配置数据 */
//采购订单的表格配置
export const Polist_columns = [
    {
        title: '状态', 
        dataIndex: 'Status',
        key: 'Status',
        width: 80,
        fixed: 'left',
    },
    {
        title: '采购单号',
        dataIndex: 'Cpoid',
        key: 'Cpoid',
        width: 170,
        fixed: 'left',
    },
    {
        title: '项次',
        dataIndex: 'Detailsid',
        key: 'Detailsid', 
        width: 120,
    },
    {
        title: '供应商编号',
        dataIndex: 'CVenCode',
        key: 'CVenCode',
        width: 100,
    },
    {
        title: '供应商名称',
        dataIndex: 'Cvenname',
        key: 'Cvenname',
        ellipsis: true,
    },
    {
        title: '订单日期',
        dataIndex: 'Dpodate',
        key: 'Dpodate',
        width: 120,
    },
    {
        title: '物料号',
        dataIndex: 'Cinvcode',
        key: 'Cinvcode',
        width: 170,
    },
    {
        title: '物料描述',
        dataIndex: 'Cinvname',
        key: 'Cinvname',
        width: 270,
        ellipsis: true,
    },
    {
        title: '订单数量',
        dataIndex: 'IQUANTITY',
        key: 'IQUANTITY',
        width: 100,
    },
    {
        title: '税率',
        dataIndex: 'Itaxrate',
        key: 'Itaxrate',
        width: 70,
    },
    {
        title: '要求到货日期',
        dataIndex: 'DArriveDate',
        key: 'DArriveDate',
        width: 120,
    },
    {
        title: '确认数量',
        dataIndex: 'QrIquantity',
        key: 'QrIquantity',
        width: 100,
    },
    {
        title: '确认到货日期',
        dataIndex: 'QrArriveDate',
        key: 'QrArriveDate',
        width: 150,
    },
    {
        title: '业务员名称',
        dataIndex: 'Cpersonname',
        key: 'Cpersonname',
        width: 100,
    },
    {
        title: '到货数',
        dataIndex: 'z_PoArrQuantity',
        key: 'z_PoArrQuantity',
        width: 100,
    },
    {
        title: '入库数',
        dataIndex: 'z_freceivedqty',
        key: 'z_freceivedqty',
        width: 100,
    },
    {
        title: '确认日期',
        dataIndex: 'Qrrq',
        key: 'Qrrq',
        width: 150,
    },
    {
        title: '备注',
        dataIndex: 'Bz',
        key: 'Bz',
        ellipsis: true,
    },
];
//UserInfo 用户管理的表格配置
export const UserConfig_columns = [
    {
        title: '编号',
        dataIndex: 'UserCode',
        key: 'UserCode',
        width: 50,
    },
    {
        title: '用户名',
        dataIndex: 'UserName',
        key: 'UserName',
        ellipsis: true,
        width: 40,
    },
    // {
    //     title: '密码',
    //     dataIndex: 'PWD',
    //     key: 'PWD',
    //     width: 100,
    // }
]
//MRPInfo MRP控制者维护
export const V_MRPInfo_columns =[
    {
        title: '业务名称',
        dataIndex: 'Name',
        key: 'Name',
        width: 60,
    },
    {
        title: 'MRP',
        dataIndex: 'MRP',
        key: 'MRP',
        width: 60,
        render:function(val){
            return val.toUpperCase();
        }
    }
]
//WBInfo 物料班组对照表
export const WBInfo_columns = [
    {
        title: '物料编码',
        dataIndex: 'Matnr',
        key: 'Matnr',
        width: 60,
        render:function(val){
            if(val){

                return (val+"").toUpperCase();
            }
        }
    },
    {
        title: '物料名称',
        dataIndex: 'Maktx',
        key: 'Maktx',
        width: 60,
    },
    {
        title: '班组',
        dataIndex: 'Bz',
        key: 'Bz',
        width: 60,
        render:function(val){
            if(val){
                return val.toUpperCase();
            }
            
        }
    }
]
//BjInfo 钣金需求分解
export const BjInfo_columns = [
    {
        title: '一层编码',
        dataIndex: 'FirstCode',
        key: 'FirstCode',
        width: 60,
    },
    {
        title: '一层名称',
        dataIndex: 'FirstName',
        key: 'FirstName',
        width: 60,
    },
    {
        title: '二层编码',
        dataIndex: 'SecondCode',
        key: 'SecondCode',
        width: 60,
    },
    {
        title: '二层名称',
        dataIndex: 'SecondName',
        key: 'SecondName',
        width: 60,
    },
    {
        title: '三层编码',
        dataIndex: 'ThirdCode',
        key: 'ThirdCode',
        width: 60,
    },
    {
        title: '三层名称',
        dataIndex: 'ThirdName',
        key: 'ThirdName',
        width: 60,
    },
    {
        title: '四层编码',
        dataIndex: 'FourthCode',
        key: 'FourthCode',
        width: 60,
    },
    {
        title: '四层名称',
        dataIndex: 'FourthName',
        key: 'FourthName',
        width: 60,
    },
    {
        title: '五层编码',
        dataIndex: 'FifthCode',
        key: 'FifthCode',
        width: 60,
    },
    {
        title: '五层名称',
        dataIndex: 'FifthName',
        key: 'FifthName',
        width: 60,
    },
    {
        title: '需求数量',
        dataIndex: 'Menge',
        key: 'Menge',
        width: 30,
    },
]
//BjImp 钣金需求Excel上传表
export const BjImp_columns =[
    {
        title: '物料编码',
        dataIndex: 'Matnr',
        key: 'Matnr',
        width: 60,
    },
    {
        title: '数量',
        dataIndex: 'Menge',
        key: 'Menge',
        width: 60,
    },
    {
        title: '日期',
        dataIndex: 'Datetime1',
        key: 'Datetime1',
        width: 60,
    },
    {
        title:'状态',
        dataIndex: 'status',
        key: 'status',
        width: 30,
        render:function(val){
            let NewVal;
            switch(val){
                case "已完成":
                    NewVal = <Tag color="success">已完成</Tag>
                    break;
                case "执行中":
                    NewVal = <Tag color="processing">执行中</Tag>
                    break;
                case "异常":
                    NewVal = <Tag color="error">异常</Tag>
                    break;
                case "执行超时":
                    NewVal = <Tag color="warning">执行超时</Tag>
                    break;
                default:
                    NewVal = <Tag color="processing">执行中</Tag>
                    break;
            }
            return NewVal;
        }
    }
]
//JjInfo 机加需求表
export const JjInfo_columns =[
    {
        title: '系列',
        dataIndex: 'Series',
        key: 'Series',
        width: 60,
    },
    {
        title: '子键物料号',
        dataIndex: 'Matnr',
        key: 'Matnr',
        width: 60,
    },
    {
        title: '子键物料描述',
        dataIndex: 'Maktx',
        key: 'Maktx',
        width: 60,
        ellipsis: true,
    },
    {
        title: '数量',
        dataIndex: 'Menge',
        key: 'Menge',
        width: 60,
    }
]
//JiImp 机加需求Excel上传表
export const JiImp_columns =[
    {
        title: '系列/型号',
        dataIndex: 'Series',
        key: 'Series',
        width: 60,
    },
    {
        title: '物料编码',
        dataIndex: 'Matnr',
        key: 'Matnr',
        width: 60,
    },
    {
        title: '数量',
        dataIndex: 'Menge',
        key: 'Menge',
        width: 60,
    },
    {
        title: '日期',
        dataIndex: 'Datetime1',
        key: 'Datetime1',
        width: 60,
    },
    {
        title:'状态',
        dataIndex: 'status',
        key: 'status',
        width: 30,
        render:function(val){
            let NewVal;
            switch(val){
                case "已完成":
                    NewVal = <Tag color="success">已完成</Tag>
                    break;
                case "执行中":
                    NewVal = <Tag color="processing">执行中</Tag>
                    break;
                case "异常":
                    NewVal = <Tag color="error">异常</Tag>
                    break;
                case "执行超时":
                    NewVal = <Tag color="warning">执行超时</Tag>
                    break;
                default:
                    NewVal = <Tag color="processing">执行中</Tag>
                    break;
            }
            return NewVal;
        }
    }
]
//CgInfo 采购需求表
export const CgInfo_columns =[
    {
        title: '物料编码',
        dataIndex: 'Maktx',
        key: 'Maktx',
        width: 60,
    },
    {
        title: '物料描述',
        dataIndex: 'Matnr',
        key: 'Matnr',
        width: 60,
    },
    {
        title: '需求日期',
        dataIndex: 'Budat',
        key: 'Budat',
        width: 60,
    },
    {
        title: 'MRP控制者',
        dataIndex: 'MRP',
        key: 'MRP',
        width: 60,
    },
    {
        title: '单位',
        dataIndex: 'Meins',
        key: 'Meins',
        width: 60,
    },
    {
        title: '供应商代码',
        dataIndex: 'Lifnr',
        key: 'Lifnr',
        width: 60,
    },
    {
        title: '供应商名称',
        dataIndex: 'Name1',
        key: 'Name1',
        width: 60,
        ellipsis: true,
    },
]
export const CgImp_columns =[
    {
        title: '物料编码',
        dataIndex: 'MATNR',
        key: 'MATNR',
        width: 60,
    },
    {
        title: '数量',
        dataIndex: 'Menge',
        key: 'Menge',
        width: 60,
    },
    {//需求日期
        title: '需求日期',
        dataIndex: 'Datetime1',
        key: 'Datetime1',
        width: 60,
    },
    {
        title:'状态',
        dataIndex: 'status',
        key: 'status',
        width: 30,
        render:function(val){
            let NewVal;
            switch(val){
                case "已完成":
                    NewVal = <Tag color="success">已完成</Tag>
                    break;
                case "执行中":
                    NewVal = <Tag color="processing">执行中</Tag>
                    break;
                case "异常":
                    NewVal = <Tag color="error">异常</Tag>
                    break;
                case "执行超时":
                    NewVal = <Tag color="warning">执行超时</Tag>
                    break;
                default:
                    NewVal = <Tag color="processing">执行中</Tag>
                    break;
            }
            return NewVal;
        }
    }
]
//物料班组对照表 Excel
export const WbInfo = [
    {
        title: '物料编码',
        dataIndex: 'Matnr',
        key: 'Matnr',
        width: 60,
    },
    {
        title: '班组',
        dataIndex: 'Maktx',
        key: 'Maktx',
        width: 60,
    },
    {
        title: '备注',
        dataIndex: 'Bz',
        key: 'Bz',
        width: 60,
    },
]
//BjInfo 钣金需求分解查询
export const V_BjInfo_columns = [
    {
        title: '日期',
        dataIndex: 'Datetime1',
        key: 'Datetime1',
        width: 30,
        render:function (data) {
            return moment(data).format("YYYYMMDD");
        }
    },
    {
        title: '一层编码',
        dataIndex: 'FirstCode',
        key: 'FirstCode',
        width: 40,
    },
    {
        title: '一层名称',
        dataIndex: 'FirstName',
        key: 'FirstName',
        width: 60,
    },
    {
        title: '一层数量',
        dataIndex: 'Num1',
        key: 'Num1',
        width: 20,
    },
    {
        title:'一层工艺',
        dataIndex:'Pline1',
        key: 'Pline1',
        width: 12,
    },
    {
        title: '二层编码',
        dataIndex: 'SecondCode',
        key: 'SecondCode',
        width: 40,
    },
    {
        title: '二层名称',
        dataIndex: 'SecondName',
        key: 'SecondName',
        width: 60,
    },
    {
        title: '二层数量',
        dataIndex: 'Num2',
        key: 'Num2',
        width: 20,
    },
    {
        title:'二层工艺',
        dataIndex:'Pline2',
        key: 'Pline2',
        width: 12,
    },
    {
        title: '三层编码',
        dataIndex: 'ThirdCode',
        key: 'ThirdCode',
        width: 40,
    },
    {
        title: '三层名称',
        dataIndex: 'ThirdName',
        key: 'ThirdName',
        width: 60,
    },
    {
        title: '三层数量',
        dataIndex: 'Num3',
        key: 'Num3',
        width: 20,
    },
    {
        title:'三层工艺',
        dataIndex:'Pline3',
        key: 'Pline3',
        width: 12,
    },
    {
        title: '四层编码',
        dataIndex: 'FourthCode',
        key: 'FourthCode',
        width: 40,
    },
    {
        title: '四层名称',
        dataIndex: 'FourthName',
        key: 'FourthName',
        width: 60,
    },
    {
        title: '四层数量',
        dataIndex: 'Num4',
        key: 'Num4',
        width: 20,
    },
    {
        title:'四层工艺',
        dataIndex:'Pline4',
        key: 'Pline4',
        width: 12,
    },
    {
        title: '五层编码',
        dataIndex: 'FifthCode',
        key: 'FifthCode',
        width: 40,
    },
    {
        title: '五层名称',
        dataIndex: 'FifthName',
        key: 'FifthName',
        width: 60,
    },
    {
        title: '五层数量',
        dataIndex: 'Num5',
        key: 'Num5',
        width: 20,
    },
    {
        title:'五层工艺',
        dataIndex:'Pline5',
        key: 'Pline5',
        width: 12,
    },
    {
        title: '六层编码',
        dataIndex: 'SixthCode',
        key: 'SixthCode',
        width: 60,
    },
    {
        title: '六层名称',
        dataIndex: 'SixthName',
        key: 'SixthName',
        width: 60,
    },
    {
        title: '六层数量',
        dataIndex: 'Num6',
        key: 'Num6',
        width: 20,
    },
    {
        title:'六层工艺',
        dataIndex:'Pline6',
        key: 'Pline6',
        width: 12,
    },
    {
        title:'系列',
        dataIndex:'Series',
        key: 'Series',
        width: 20,
    }
]
//机加需求单查询
export const V_JjInfo_columns = [
    {
        title: '系列',
        dataIndex: 'Series',
        key: 'Series',
        width: 40,
        ellipsis: true,
    },
    {
        title: '子键物料号',
        dataIndex: 'Matnr',
        key: 'Matnr',
        width: 60,
    },
    {
        title: '子键物料描述',
        dataIndex: 'Maktx',
        key: 'Maktx',
        width: 90,
        ellipsis: true,
    },
    {
        title: '数量',
        dataIndex: 'Menge',
        key: 'Menge',
        width: 30,
    },
    {
        title: '单位',
        dataIndex: 'Meins',
        key: 'Meins',
        width: 30,
    },
    {
        title: 'MRP控制者',
        dataIndex: 'MRP',
        key: 'MRP',
        width: 50,
    },
    {
        title: '班组',
        dataIndex: 'bz',
        key: 'bz',
        width: 40,
    },
]
//采购需求单查询
export const V_CgInfo_columns =[
    {
        title: '物料编码',
        dataIndex: 'Matnr',
        key: 'Matnr',
        width: 50,
    },
    {
        title: '物料描述',
        dataIndex: 'Maktx',
        key: 'Maktx',
        width: 150,
        ellipsis: true,
    },
    {
        title: '需求日期',
        dataIndex: 'Datetime1',
        key: 'Datetime1',
        width: 40,
        render:function (data) {
            if(data!==""){
                var dt = new Date(data);
                return moment(dt).format('YYYYMMDD');
            }else{
                return "";
            }
            
            
        }
    },
    {
        title: 'MRP控制者',
        dataIndex: 'MRP',
        key: 'MRP',
        width: 40,
    },
    {
        title: '单位',
        dataIndex: 'Meins',
        key: 'Meins',
        width: 25,
    },
    {
        title: '供应商代码',
        dataIndex: 'Lifnr',
        key: 'Lifnr',
        width: 40,
    },
    {
        title: '供应商名称',
        dataIndex: 'Name1',
        key: 'Name1',
        ellipsis: true,
        width: 70,
    },
    {
        title: '数量',
        dataIndex: 'Menge',
        key: 'Menge',
        width: 30,
    },
    {
        title: '配额',
        dataIndex: 'PEIE',
        key: 'PEIE',
        width: 30,
    },
    {
        title: '9001轮拖寄售库存',
        dataIndex: 'Num1',
        key: 'Num1',
        width: 55,
    },
    {
        title: '4101轮拖材料库存',
        dataIndex: 'Num2',
        key: 'Num2',
        width: 55,
    },
    {
        title: '收货冻结数量',
        dataIndex: 'SHDJ',
        key: 'SHDJ',
        width: 40,
    },
]

//采购需求单查询
export const V_CgInfo_columns2 =[
    {
        title: '物料编码',
        dataIndex: 'Matnr',
        key: 'Matnr',
        width: 120,
    },
    {
        title: '物料描述',
        dataIndex: 'Maktx',
        key: 'Maktx',
        width: 150,
        ellipsis: true,
    },
    {
        title: '需求日期',
        dataIndex: 'Budat',
        key: 'Budat',
        width: 40,
    },
    {
        title: 'MRP控制者',
        dataIndex: 'MRP',
        key: 'MRP',
        width: 40,
    },
    {
        title: '单位',
        dataIndex: 'Meins',
        key: 'Meins',
        width: 25,
    },
    {
        title: '供应商代码',
        dataIndex: 'Lifnr',
        key: 'Lifnr',
        width: 40,
    },
    {
        title: '供应商名称',
        dataIndex: 'Name1',
        key: 'Name1',
        ellipsis: true,
        width: 70,
    },
    {
        title: '数量',
        dataIndex: 'Menge',
        key: 'Menge',
        width: 30,
    },
    {
        title: '配额',
        dataIndex: 'PEIE',
        key: 'PEIE',
        width: 30,
    },
    {
        title: '9001轮拖寄售库存',
        dataIndex: 'JSKC',
        key: 'JSKC',
        width: 55,
    },
    {
        title: '4101轮拖材料库存',
        dataIndex: 'CLKC',
        key: 'CLKC',
        width: 55,
    },
    {
        title: '收货冻结数量',
        dataIndex: 'SHDJ',
        key: 'SHDJ',
        width: 40,
    },
]

export const UploadInfo_columns = [
    {
        title: '文件名',
        dataIndex: 'FileName',
        key: 'FileName',
        width: 30,
    },
    // {
    //     title: '路径',
    //     dataIndex: 'Path',
    //     key: 'Path',
    //     width: 60,
    //     ellipsis: true,
    // },
    {
        title: '上传时间',
        dataIndex: 'Budat',
        key: 'Budat',
        width: 25,
    },
]
//操作记录
export const V_LogInfo_columns =[
    {
        title: '操作类型',
        dataIndex: 'TypeName',
        key: 'TypeName',
        width: 30,
    },
    {
        title: '操作人编码',
        dataIndex: 'UserCode',
        key: 'UserCode',
        width: 30,
    },
    {
        title: '操作人',
        dataIndex: 'UserName',
        key: 'UserName',
        width: 30,
    },
    {
        title: '操作时间',
        dataIndex: 'DateTime1',
        key: 'DateTime1',
        width: 30,
    },
    {
        title: '操作内容',
        dataIndex: 'Contents',
        key: 'Contents',
        ellipsis: true,
        width: 30,
    },
]
//DdOrder
export const GetDdOrder_columns = _this=>{
    const {Fuc_Bj,Fuc_Jj,Fuc_Cg} = _this.state;
    let column = [
        {
            title: '调度单号',
            dataIndex: 'LTOrder',
            key: 'LTOrder',
            width: 30,
            ...getColumnSearchProps('LTOrder',_this),
            sorter: {
                multiple:2,
            }
        },
        {
            title: '版本号',
            dataIndex: 'TbCount',
            key: 'TbCount',
            width: 20,
        },
        {
            title: '产线',
            dataIndex: 'Faline',
            key: 'Faline',
            width: 25,
            ...getColumnSearchProps('Faline',_this),
        },
        {
            title: '上传时间',
            dataIndex: 'UpTime',
            key: 'UpTime',
            width: 30,
            defaultSortOrder: 'descend',
            sorter: {
                multiple:1,
            },
            render:function (val) {
                
                // if(val!==""){
                //     return moment(val).format("YYYY/MM/DD");
                // }else{
                //     return val;
                // }
                return val;
            }
        },
        {
            title: '生效',
            dataIndex: 'status',
            key: 'status',
            width: 25,
            filters:[
                { text: '是', value: '是' },
                { text: '否', value: '否' },
            ],
            render:function(val){
                if(val==='是'){
                    return <Tag color="green">{val}</Tag>
                }else{
                    return <Tag color="red">{val}</Tag>
                }
            }
        },
        {
            title: '钣金状态',
            dataIndex: 'BjStatus1',
            key: 'BjStatus1',
            width: 28,
            render:function(val,record) {
                var flg = true;
                if(record.BjStatus ==="待执行" || record.JjStatus ==="待执行" || record.CgStatus ==="待执行"){
                    flg = false;
                }
                if(val==="待执行"){
                    return <LinkButton onClick={()=>_this.SearchDet(record.ID,flg)}>
                        <Tag color="blue" >{val}</Tag>
                    </LinkButton>
                }else if(val==="已完成"){
                    return <LinkButton  onClick={()=>_this.SearchDet(record.ID,flg)}>
                        <Tag color="green">{val}</Tag>
                    </LinkButton>
                }else{
                    return <LinkButton onClick={()=>_this.SearchDet(record.ID,flg)}>
                        <Tag color="magenta">{val}</Tag>
                    </LinkButton>
                }
            }
        },
        {
            title: '钣金执行人',
            dataIndex: 'BjPer',
            key: 'BjPer',
            width: 28
        },
        {
            title: '钣金执行时间',
            dataIndex: 'BjTime',
            key: 'BjTime',
            width: 28
        },
        {
            title: '机加状态',
            dataIndex: 'JjStatus1',
            key: 'JjStatus1',
            width: 28,
            render:function(val,record) {
                var flg = true;
                if(record.BjStatus ==="待执行" || record.JjStatus ==="待执行" || record.CgStatus ==="待执行"){
                    flg = false;
                }
                if(val==="待执行"){
                    return <LinkButton onClick={()=>_this.SearchDet(record.ID,flg)}>
                        <Tag color="blue" >{val}</Tag>
                    </LinkButton>
                }else if(val==="已完成"){
                    return <LinkButton  onClick={()=>_this.SearchDet(record.ID,flg)}>
                        <Tag color="green">{val}</Tag>
                    </LinkButton>
                }else{
                    return <LinkButton onClick={()=>_this.SearchDet(record.ID,flg)}>
                        <Tag color="magenta">{val}</Tag>
                    </LinkButton>
                }
            }
        },
        {
            title: '机加执行人',
            dataIndex: 'JjPer',
            key: 'JjPer',
            width: 28
        },
        {
            title: '机加执行时间',
            dataIndex: 'JjTime',
            key: 'JjTime',
            width: 28
        },
        {
            title: '采购状态',
            dataIndex: 'CgStatus1',
            key: 'CgStatus1',
            width: 28,
            render:function(val,record) {
                var flg = true;
                if(record.BjStatus ==="待执行" || record.JjStatus ==="待执行" || record.CgStatus ==="待执行"){
                    flg = false;
                }
                if(val==="待执行"){
                    return <LinkButton onClick={()=>_this.SearchDet(record.ID,flg)}>
                        <Tag color="blue" >{val}</Tag>
                    </LinkButton>
                }else if(val==="已完成"){
                    return <LinkButton  onClick={()=>_this.SearchDet(record.ID,flg)}>
                        <Tag color="green">{val}</Tag>
                    </LinkButton>
                }else{
                    return <LinkButton onClick={()=>_this.SearchDet(record.ID,flg)}>
                        <Tag color="magenta">{val}</Tag>
                    </LinkButton>
                }
            }
        },
        {
            title: '采购执行人',
            dataIndex: 'CgPer',
            key: 'CgPer',
            width: 28
        },
        {   
            title: '采购执行时间',
            dataIndex: 'CgTime',
            key: 'CgTime',
            width: 28
        },
        {
            title:'采购库存基准日期',
            dataIndex: 'CgBaseTime',
            key: 'CgBaseTime',
            width: 28,
            render:function(val) {
                return val;
            }
        },
        {
            title: '计划月份',
            dataIndex: 'PlanDt',
            key: 'PlanDt  ',
            width: 25,
            sorter: {
                multiple:3,
            },
            render:(val)=>{
                return val;
                //return val!==""?moment(val).format("YYYYMM"):val
            }
        },
        {
            title: '操作',
            width: 41,
            fixed: 'right',
            dataIndex: 'operation',
            render: (_, record) => {
                return (
                    <div style={{ textAlign: 'center' }}>
                        {_this.state.Fuc_Edit?<Button size="small" type="primary" onClick={() => _this.ModalDel(record,_this)} danger>删除</Button>:""}
                        &emsp;
                        {_this.state.Fuc_Edit?<Button size="small" type="primary" onClick={() => _this.ModalEdit(record,_this)} >编辑</Button>:""}
                        
                        {/* {record.status==="否"?<Button size="small" type="link" onClick={()=>_this.changeStatus(record,_this)} >生效</Button>:"已生效"} */}
                    </div>
                )
            }
        }
    ]
    column = column.filter(item=>{
        if(!Fuc_Bj&&(item.key==='BjStatus1'||item.key==='BjPer'||item.key==='BjTime')){
            return false;
        }
        if(!Fuc_Jj&&(item.key==='JjStatus1'||item.key==='JjPer'||item.key==='JjTime')){
            return false;
        }
        if(!Fuc_Cg&&(item.key==='CgStatus1'||item.key==='CgPer'||item.key==='CgTime'||item.key==='CgBaseTime')){
            return false;
        }
        return true;
    })
    return column;
}
export const GetDdOrder_Det_Status = _this=>{
    const {Fuc_Bj,Fuc_Jj,Fuc_Cg} = _this.state;
    let column =  [
        {
            title: '投产日期',
            dataIndex: 'Datetime1',
            key: 'Datetime1',
            width: 30,
        },
        {
            title: '钣金状态',
            dataIndex: 'BjStatus',
            key: 'BjStatus',
            width: 20,
            render:function(val,record) {
                if(val==="待执行"){
                    return <Tag color="blue">{val}</Tag>
                }else if(val==="已完成"){
                    return <Tag color="green">{val}</Tag>
                }else{
                    return <Tag color="magenta">{val}</Tag>
                }
            }
        },
        {
            title: '机加状态',
            dataIndex: 'JjStatus',
            key: 'JjStatus',
            width: 20,
            render:function(val) {
                if(val==="待执行"){
                    return <Tag color="blue">{val}</Tag>
                }else if(val==="已完成"){
                    return <Tag color="green">{val}</Tag>
                }else{
                    return <Tag color="magenta">{val}</Tag>
                }
            }
        },
        {
            title: '采购状态',
            dataIndex: 'CgStatus',
            key: 'CgStatus',
            width: 20,
            render:function(val) {
                if(val==="待执行"){
                    return <Tag color="blue">{val}</Tag>
                }else if(val==="已完成"){
                    return <Tag color="green">{val}</Tag>
                }else{
                    return <Tag color="magenta">{val}</Tag>
                }
            }
        },
    ]
    column = column.filter(item=>{
        if(!Fuc_Bj&&item.key==='BjStatus'){
            return false;
        }
        if(!Fuc_Jj&&item.key==='JjStatus'){
            return false;
        }
        if(!Fuc_Cg&&item.key==='CgStatus'){
            return false;
        }
        return true;
    })
    return column;
}
export const DdOrder_Det_columns = ()=>(
    [
    {
        title: '序号',
        dataIndex: 'TbIndex',
        key: 'TbIndex',
        width: 18,
        render:(text,record,index)=>`${index+1}`,
    },
    {
        title: '投产日期',
        dataIndex: 'Datetime1',
        key: 'Datetime1',
        width: 25,
    },
    {
        title: '整机编码',
        dataIndex: 'ZjNo',
        key: 'ZjNo',
        width: 35,
    },
    {
        title: '物料编码',
        dataIndex: 'Matnr',
        key: 'Matnr',
        width: 30,
    },
    {
        title: '系列',
        dataIndex: 'Series',
        key: 'Series',
        width: 20,
    },
    {
        title:'型号',
        dataIndex:'Model',
        key:'Model',
        width:20,
    },
    {
        title:'分动箱',
        dataIndex: 'Box',
        key: 'Box',
        width: 20,
    },
    {
        title:'数量',
        dataIndex: 'Num',
        key: 'Num',
        width: 18,

    },
    {
        title:'配置',
        dataIndex: 'Config',
        key: 'Config',
        width: 45,
        ellipsis: true,
    },
    {
        title:'交库时间',
        dataIndex: 'Datetime2',
        key: 'Datetime2',
        width: 25,
    },
    {
        title:'备注',
        dataIndex: 'Bz',
        key: 'Bz',
        width: 45,
        ellipsis: true,
    },
])
//调度表总结字段配置
export const DdOrder_Sum_columns = (_this)=>{
    return [
        {
            title: '调度单号',
            dataIndex: 'LTOrder',
            key: 'LTOrder',
            width: 30,
            
            ...getColumnSearchProps('LTOrder',_this),
        },
        {
            title: '版本号',
            dataIndex: 'TbCount',
            key: 'TbCount',
            width: 18,
        },
        {
            title:'序号',
            dataIndex: 'NO',
            key: 'NO',
            width: 18,
        },
        {
            title: '生效',
            dataIndex: 'status',
            key: 'status',
            width: 25,
            filters:[
                { text: '是', value: '是' },
                { text: '否', value: '否' },
            ],
            render:function(val){
                if(val==='是'){
                    return <Tag color="green">是</Tag>
                }else{
                    return <Tag color="red">否</Tag>
                }
            }
        },
        {
            title: '产线',
            dataIndex: 'Faline',
            key: 'Faline',
            width: 25,
            ...getColumnSearchProps('Faline',_this),
        },
        {
            title: '计划月份',
            dataIndex: 'PlanDt',
            key: 'PlanDt',
            width: 25,
            render:(val)=>{
                return val;
                //return val!==""?moment(val).format("YYYYMM"):val
            }
        },
        {
            title: '明细数',
            dataIndex: 'DetCount',
            key: 'DetCount',
            width: 18,
        }
    ];
}
//调度单表明细总结字段配置
export const DdOrder_Det_Sum_columns = ()=>{
    return [
        // {
        //     title:'状态',
        //     dataIndex:'Det_status',
        //     key: 'Det_status',
        //     width: 20,
        // },
        {
            title:'整机编码',
            dataIndex:'ZjNo',
            key: 'ZjNo',
            editable:true,
            required:true,
            width: 20,
        },
        {
            title:'物料编码',
            dataIndex:'Matnr',
            key: 'Matnr',
            editable:false,
            width: 18,
        },
        {
            title:'系列',
            dataIndex:'Series',
            key: 'Series',
            width: 12,
        },
        {
            title:'分动箱',
            dataIndex:'Box',
            key: 'Box',
            editable:true,
            width: 12,
        },
        {
            title:'数量',
            dataIndex:'Num',
            key: 'Num',
            width: 10,
        },
        {
            title:'配置',
            dataIndex:'Config',
            key: 'Config',
            editable:true,
            width: 48,
        },
        
        {
            title:'投产日期',
            dataIndex:'Datetime1',
            key: 'Datetime1',
            width: 18,
        },
        {
            title:'交库时间',
            dataIndex:'Datetime2',
            editable:true,
            required:true,
            key: 'Datetime2',
            width: 18,
            render:function(val) {
                if(typeof(val)==='object'){
                    return moment(val).format("YYYYMMDD");
                }else{
                    return val;
                }
            }
        },
        {
            title:'备注',
            dataIndex:'Bz',
            editable:true,
            key: 'Bz',
            width: 38,
            ellipsis: true,
        },
    ]
}
//调度单机加表
export const DdOrder_JjInfo_columns = (model)=>{
    return model==="1"?[
        {
            title:'物料编码',
            dataIndex:'Matnr',
            key: 'Matnr',
            width: 22,
            render:function(val) {
                return val.replace(/\b(0+)/gi,"");
            }
        },
        {
            title:'物料描述',
            dataIndex:'Maktx',
            key: 'Maktx',
            width: 22,
        },
        {
            title:'单位',
            dataIndex:'Meins',
            key: 'Meins',
            width: 22,
        },
        {
            title:'系列',
            dataIndex:'Series',
            key: 'Series',
            width: 12,
        },
        {
            title:'班组',
            dataIndex:'Bz',
            key: 'Bz',
            width: 22,
        },
        {
            title:'需求总数',
            dataIndex:'Menge',
            key: 'Menge',
            width: 22,
        },
    ]:[
        {
            title:'物料编码',
            dataIndex:'Matnr',
            key: 'Matnr',
            width: 22,
            render:function(val) {
                return val.replace(/\b(0+)/gi,"");
            }
        },
        {
            title:'物料描述',
            dataIndex:'Maktx',
            key: 'Maktx',
            width: 22,
        },
        {
            title:'单位',
            dataIndex:'Meins',
            key: 'Meins',
            width: 22,
        },
        {
            title:'班组',
            dataIndex:'Bz',
            key: 'Bz',
            width: 22,
        },
        {
            title:'需求总数',
            dataIndex:'Menge',
            key: 'Menge',
            width: 22,
        },
    ]
    
}
export const DdOrder_JjInfo_Det_columns = (Dets)=>{
    const columns = [];
    for(var key in Dets){
        var Dt = new Date(key);
        columns.push({
            title:moment(Dt).format("DD"),
            dataIndex:key,
            key: key,
            width: 16,
        })
    }
    return columns;
}
export const DdOrder_CgInfo_columns = (model)=>{
    return model==="1"?[
        {
            title:'物料编码',
            dataIndex:'Matnr',
            key: 'Matnr',
            width: 16,
            render:function(val) {
                return val.replace(/\b(0+)/gi,"");
            }
        },
        {
            title:'物料描述',
            dataIndex:'Maktx',
            key: 'Maktx',
            width: 24,
        },
        {
            title:'MRP控制者',
            dataIndex:'MRP',
            key: 'MRP',
            width: 10,
        },
        {
            title:'单位',
            dataIndex:'Meins',
            key: 'Meins',
            width: 10,
        },
        {
            title:'供应商代码',
            dataIndex:'Lifnr',
            key: 'Lifnr',
            width: 16,
        },
        {
            title:'供应商名称',
            dataIndex:'Name1',
            key: 'Name1',
            width: 24,
            ellipsis: true,
        },
        {
            title:'系列',
            dataIndex:'Series',
            key: 'Series',
            width: 10,
        },
        {
            title:'数量',
            dataIndex:'Menge',
            key: 'Menge',
            width: 12,
        },
        {
            title:'配额',
            dataIndex:'PEIE',
            key: 'PEIE',
            width: 12,
        },
        {
            title:'寄售库存',
            dataIndex:'Num1',
            key: 'Num1',
            width: 14,
        },
        {
            title:'材料库存',
            dataIndex:'Num2',
            key: 'Num2',
            width: 14,
        }
    ]:[
        {
            title:'物料编码',
            dataIndex:'Matnr',
            key: 'Matnr',
            width: 16,
        },
        {
            title:'物料描述',
            dataIndex:'Maktx',
            key: 'Maktx',
            width: 24,
        },
        {
            title:'MRP控制者',
            dataIndex:'MRP',
            key: 'MRP',
            width: 10,
        },
        {
            title:'单位',
            dataIndex:'Meins',
            key: 'Meins',
            width: 10,
        },
        {
            title:'供应商代码',
            dataIndex:'Lifnr',
            key: 'Lifnr',
            width: 16,
        },
        {
            title:'供应商名称',
            dataIndex:'Name1',
            key: 'Name1',
            width: 24,
            ellipsis: true,
        },
        {
            title:'数量',
            dataIndex:'Menge',
            key: 'Menge',
            width: 12,
        },
        {
            title:'配额',
            dataIndex:'PEIE',
            key: 'PEIE',
            width: 12,
        },
        {
            title:'寄售库存',
            dataIndex:'Num1',
            key: 'Num1',
            width: 14,
        },
        {
            title:'材料库存',
            dataIndex:'Num2',
            key: 'Num2',
            width: 14,
        }
    ]
    
}
export const DdOrder_CgInfo_Det_columns = (Dets)=>{
    const columns = [];
    for(var key in Dets){
        var Dt = new Date(key);
        columns.push({
            title:moment(Dt).format("DD"),
            dataIndex:key,
            key: key,
            width: 16,
        })
    }
    return columns;
}
export const DdOrder_BjInfo_columns = (model)=>{
    return model==="1"?[
        {
            title:'系列',
            dataIndex:'Series',
            key: 'Series',
            width: 10,
        },
        {
            title:'一层编码',
            dataIndex:'FirstCode',
            key: 'FirstCode',
            width: 14,
            render:function(val) {
                
                return val.replace(/\b(0+)/gi,"");
            }
        },
        {
            title:'一层名称',
            dataIndex:'FirstName',
            key: 'FirstName',
            width: 22,
        },
        
        {
            title:'二层编码',
            dataIndex:'SecondCode',
            key: 'SecondCode',
            width: 14,
        },
        {
            title:'二层名称',
            dataIndex:'SecondName',
            key: 'SecondName',
            width: 22,
        },
        {
            title:'三层编码',
            dataIndex:'ThirdCode',
            key: 'ThirdCode',
            width: 14,
        },
        {
            title:'三层名称',
            dataIndex:'ThirdName',
            key: 'ThirdName',
            width: 22,
        },
        {
            title:'四层编码',
            dataIndex:'FourthCode',
            key: 'FourthCode',
            width: 14,
        },
        {
            title:'四层名称',
            dataIndex:'FourthName',
            key: 'FourthName',
            width: 22,
        },
        {
            title:'五层编码',
            dataIndex:'FifthCode',
            key: 'FifthCode',
            width: 14,
        },
        {
            title:'五层名称',
            dataIndex:'FifthName',
            key: 'FifthName',
            width: 22,
        },
        {
            title:'总需求',
            dataIndex:'Num1',
            key: 'Num1',
            width: 12,
        }
    ]:
    [
        {
            title:'一层编码',
            dataIndex:'FirstCode',
            key: 'FirstCode',
            width: 14,
        },
        {
            title:'一层名称',
            dataIndex:'FirstName',
            key: 'FirstName',
            width: 22,
        },
        {
            title:'二层编码',
            dataIndex:'SecondCode',
            key: 'SecondCode',
            width: 14,
        },
        {
            title:'二层名称',
            dataIndex:'SecondName',
            key: 'SecondName',
            width: 22,
        },
        {
            title:'三层编码',
            dataIndex:'ThirdCode',
            key: 'ThirdCode',
            width: 14,
        },
        {
            title:'三层名称',
            dataIndex:'ThirdName',
            key: 'ThirdName',
            width: 22,
        },
        {
            title:'四层编码',
            dataIndex:'FourthCode',
            key: 'FourthCode',
            width: 14,
        },
        {
            title:'四层名称',
            dataIndex:'FourthName',
            key: 'FourthName',
            width: 22,
        },
        {
            title:'五层编码',
            dataIndex:'FifthCode',
            key: 'FifthCode',
            width: 14,
        },
        {
            title:'五层名称',
            dataIndex:'FifthName',
            key: 'FifthName',
            width: 22,
        },
        {
            title:'六层编码',
            dataIndex:'SixthCode',
            key: 'SixthCode',
            width: 14,
        },
        {
            title:'六层名称',
            dataIndex:'SixthName',
            key: 'SixthName',
            width: 22,
        },
        {
            title:'总需求',
            dataIndex:'Num1',
            key: 'Num1',
            width: 12,
        }
    ]
}
export const DdOrder_BjInfo_First =(_this)=>{
    return [
            {
                title:'物料编码',
                dataIndex:'Code2',
                key: 'Code2',
                width:20,
                ...getColumnSearchPropsSelect('FirstCode',_this,'SearchSelect'),
            },
            {
                title:'物料名称',
                dataIndex:'Name',
                key: 'Name',
                width:20,
                ...getColumnSearchPropsSelect('FirstName',_this,'SearchSelect2'),
            },
            {
                title:'数量',
                dataIndex:'Num',
                key: 'Num',
                width:5,
            },
            {
                title:'工艺',
                dataIndex:'Pline1',
                key:'Pline1',
                width:8,
                ...getColumnSearchPropsSelect('Pline',_this,'SearchSelect2'),
            }
    ]
}
export const DdOrder_BjInfo_Second =()=>{
    return [
            {
                title:'二层物料编码',
                dataIndex:'Code',
                key: 'Code',
                width:10,
                render:function (val) {
                    return val.replace(/\b(0+)/gi,"");
                }
            },
            {
                title:'物料名称',
                dataIndex:'Name',
                key: 'Name',
                width:5
            },
            {
                title:'数量',
                dataIndex:'Num',
                key: 'Num',
                width:5,
            },
            {
                title:'子件',
                dataIndex:'sub',
                key:'sub',
                width:86
            }
    ]
}
