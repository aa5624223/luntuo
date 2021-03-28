import { Tag} from 'antd';
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
    },
]
export const CgImp_columns =[
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
    {//需求日期
        title: '需求日期',
        dataIndex: 'Budat',
        key: 'Budat',
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
        dataIndex: 'menge',
        key: 'menge',
        width: 30,
    }
]
//机加需求单查询
export const V_JjInfo_columns = [
    {
        title: '型号',
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