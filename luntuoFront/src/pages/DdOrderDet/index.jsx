import React, { Component } from 'react'
//引入组件
import {Table,message,Button} from 'antd'
import moment from 'moment'
//自定义组件
import LinkButton from '../../components/link-button';
//引入api
import {getV_DdOrder_Det} from '../../api'

//引入配置
import { DdOrder_Sum_columns,DdOrder_Det_Sum_columns} from '../../config/table-columns'
import {ArrowLeftOutlined} from '@ant-design/icons';
//引入缓存
import store from 'store'
import XLSX from 'xlsx'
//扩展表格
const expandedRowRender = (record,index)=>{
    //DdOrder_Det_Sum_columns
    //console.dir(record);
    const data = record.Det;
    return <Table bordered size="small" rowKey="ID" columns={DdOrder_Det_Sum_columns()} dataSource={data} pagination={false}></Table>
}
export default class DdOrderDet extends Component {
    state = {
        dataSource:[],
        loading:true,
    }

    componentDidMount = async ()=>{
        var {IDS} = this.props.location;
        if(IDS===undefined){
            IDS = store.get("DdOrderDet_IDS");
        }else{
            store.set("DdOrderDet_IDS",IDS);
        }
        this.setState({loading:true})
        const formData = new FormData();
        formData.append("IDS",IDS);
        const result = await getV_DdOrder_Det(formData);
        if(result.status === 0){
            const {V_DdOrder_Det} = result.data;
            let DdOrder = [];
            var DdOrderObj = {};
            var LTOrder = "";
            var NO = "";
            var TbCount = "";
            V_DdOrder_Det.forEach((item,index)=>{
                if(index===0 || LTOrder!==item.LTOrder || NO!==item.NO || TbCount!==item.TbCount){
                    
                    DdOrderObj = {
                        ID:item.ID,
                        LTOrder:item.LTOrder,
                        TbCount:item.TbCount,
                        NO:item.NO,
                        status:item.status,
                        Faline:item.Faline,
                        PlanDt:item.PlanDt,
                        DetCount:0,
                        Det:[]
                    }
                    
                    DdOrder.push(DdOrderObj);
                    LTOrder = item.LTOrder;
                    NO = item.NO;
                    TbCount = item.TbCount;
                }
                DdOrderObj.Det.push({
                    ID:"Det"+item.ID,
                    ZjNo:item.ZjNo,
                    Matnr:item.Matnr,
                    Series:item.Series,
                    Model:item.Model,
                    Box:item.Box,
                    Num:item.Num,
                    Config:item.Config,
                    Datetime1:item.Datetime1,
                    Datetime2:item.Datetime2,
                    Bz:item.Bz,
                    //Det_status:item.Det_status,
                    
                });
                DdOrderObj.DetCount++;
            })
            //重新组建数据
            this.setState({loading:false,dataSource:DdOrder});

        }else{
            message.error("网络错误");
            this.setState({loading:false})
        }
        
    }
    handleBack = ()=>{
        const { history } = this.props;
        history.goBack();
    }
    //导出Excel
    ModalExcelOut = ()=>{
        //dataSource
        //1.读取Excel文件
        //2.用 XLSX.utils.sheet_to_json(); 查看数据
        //3.模仿2的数据创建excel
        //XLSX.utils.sheet_to_json();
        const {dataSource} = this.state;
        const keys1 = DdOrder_Sum_columns(this);
        const keys2 = DdOrder_Det_Sum_columns();
        var sheetArray = [];
        const HeadTitle = [];
        const SubHeadTitle = [];
        keys1.forEach(item=>{
            HeadTitle.push(item.title);
        })
        keys2.forEach(item=>{
            SubHeadTitle.push(item.title);
        })
        SubHeadTitle.unshift("");
        sheetArray.push(HeadTitle);
        dataSource.forEach(item=>{
            let singleArray = [];
            let subsingleArray = [];
            for(var key in item){
                if(key!=="Det" && key!=="ID"){
                    singleArray.push(item[key]);
                }else if(key==="Det"){
                    item.Det.forEach(item2=>{
                        let singleArray2 = [];
                        for(var key2 in item2){
                            if(key2!=="ID"){
                                singleArray2.push(item2[key2]);
                            }
                        }
                        singleArray2.unshift("");
                        subsingleArray.push(singleArray2);
                    })
                }
            }
            sheetArray.push(singleArray);
            if(subsingleArray.length>0){
                sheetArray.push(SubHeadTitle);
                //console.dir(subsingleArray);
                sheetArray = sheetArray.concat(subsingleArray);
            }
        })
        //console.dir(dataSource);
        //console.dir(sheetJson);
        let book = XLSX.utils.book_new();
        // XLSX.utils.cell_add_comment
        // let sheet = XLSX.utils.json_to_sheet(json, {
        //     header: ['姓名', '性别', '年龄']
        // })
        let sheet = XLSX.utils.aoa_to_sheet(
            sheetArray
        );
        sheet["!cols"]=[
            {wch:15},{wch:18},{wch:18},{wch:12},{wch:15},{wch:12},{wch:12},{wch:80},{wch:15},{wch:15},{wch:25}
        ];
        XLSX.utils.book_append_sheet(book, sheet, 'Sheet1')
        XLSX.writeFile(book, '调度单'+moment().format('YYYYMMDD')+'.xlsx')
    }
    render() {
        const {dataSource,loading} = this.state;
        return (
            <div className="main">
                <div className="toolArea">
                    <div style={{float:'left'}}>
                        <LinkButton onClick={() => this.handleBack()}>
                            <ArrowLeftOutlined />返回调度单
                        </LinkButton>
                    </div>
                    <Button type="primary" onClick={() => this.ModalExcelOut()}>Excel导出</Button>
                </div>
                <Table
                dataSource={dataSource}
                bordered
                rowKey="ID"
                sticky={true}
                size = "middle"
                columns = {DdOrder_Sum_columns(this)}
                loading = {loading}
                pagination={false}
                expandable={{expandedRowRender,columnWidth:10}}
                >

                </Table>
            </div>
        )
    }
}
