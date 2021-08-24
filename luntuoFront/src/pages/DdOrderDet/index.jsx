import React, { Component } from 'react'
//引入组件
import {Table,message,Button,Modal,Input,Form,DatePicker} from 'antd'
import moment from 'moment'
//自定义组件
import LinkButton from '../../components/link-button';
//引入api
import {getV_DdOrder_Det,editDdOrderDet} from '../../api'
//
import {YYYYMMDD_To_Datetime,ConvertFomrData,getPageRoles,isOpt} from '../../utils'
//引入配置
import { DdOrder_Sum_columns,DdOrder_Det_Sum_columns} from '../../config/table-columns'
import {ArrowLeftOutlined} from '@ant-design/icons';
//引入缓存
import store from 'store'
import XLSX from 'xlsx'
import './index.less'
//扩展表格

export default class DdOrderDet extends Component {
    formRef = React.createRef();
    state = {
        dataSource:[],
        loading:true,
        isModalEditShow:false
    }
    componentDidMount = async ()=>{
        this.SearchData();
        let Fuc_Edit = false;
        const {pathname} = this.props.location;
        this.Roles = await getPageRoles(pathname);
        //
        if(isOpt(this.Roles,"明细编辑")){
            Fuc_Edit = true;
        }
        console.dir("pathname:"+pathname);
        this.setState({Fuc_Edit});
    }
    SearchData = async ()=>{
        var {IDS} = this.props.location;
        if(IDS===undefined){
            IDS = store.get("DdOrderDet_IDS");
        }else{
            store.set("DdOrderDet_IDS",IDS);
        }
        //this.setState({loading:true})
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
        //console.dir(dataSource);
        dataSource.forEach(item=>{
            let singleArray = [];
            let subsingleArray = [];
            
            for(var key in item){
                if(key!=="Det" && key!=="ID"){
                    singleArray.push(item[key]);
                }else if(key==="Det"){
                    item.Det.forEach(item2=>{
                        let singleArray2 = ["",item2.ZjNo,
                        item2.Matnr,
                        item2.Series,
                        item2.Box,
                        item2.Num,
                        item2.Config,
                        item2.Datetime1,
                        item2.Datetime2,
                        item2.Bz,
                        ];
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
            {wch:15},{wch:18},{wch:18},{wch:12},{wch:15},{wch:12},{wch:80},{wch:12},{wch:12},{wch:12},{wch:25}
        ];
        XLSX.utils.book_append_sheet(book, sheet, 'Sheet1')
        XLSX.writeFile(book, '调度单'+moment().format('YYYYMMDD')+'.xlsx')
    }
    ModalEdit = async ()=>{
        const record = {...this.formRef.current.getFieldsValue(true)};
        if(record.Datetime2!==undefined && record.Datetime2!==""){
            record.Datetime2 = moment(record.Datetime2).format("YYYYMMDD");
        }else{
            record.Datetime2 = moment().format("YYYYMMDD");
        }
        
        var formData = ConvertFomrData(record);
        const result = await editDdOrderDet(formData); 
        if(result.status===0){
            this.SearchData();
            message.success('编辑成功');
        }else{
            message.error('网络错误');
        }
        this.setState({isModalEditShow:false});
    }
    ModalCancel = ()=>{
        this.setState({isModalEditShow:false});
    }
    ModalEditShow = (record)=>{
        //record.Datetime1 = moment(YYYYMMDD_To_Datetime(record.Datetime1));
        if(record.Datetime2!==undefined && record.Datetime2!==""){
            record.Datetime2 = moment(YYYYMMDD_To_Datetime(record.Datetime2));
        }else{
            record.Datetime2 = moment();
        }
        this.setState({isModalEditShow:true},()=>{
            this.formRef.current.setFieldsValue(record);
        });
    }
    expandedRowRender = (record,index)=>{
            //DdOrder_Det_Sum_columns
    //console.dir(record);
    const data = record.Det;
    const columns = DdOrder_Det_Sum_columns();
    const App = this;
    const {Fuc_Edit} = this.state;
    if(Fuc_Edit){
        columns.push({
            title:'编辑',
            dataIndex:'edit',
            key:'edit',
            width:10,
            render:function(_,record){
                return <Button type="primary" onClick={()=>App.ModalEditShow(record)} >编辑</Button>
            }
        })
    }
    
    //isModalEditShow
    return <Table bordered size="small" rowKey="ID" columns={columns} dataSource={data} pagination={false}></Table>
    }
    render() {
        const {dataSource,loading,isModalEditShow} = this.state;
        const expandedRowRender = this.expandedRowRender;
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
                <Modal title="调度单明细编辑" visible={isModalEditShow} onOk={()=>this.ModalEdit()} onCancel={()=>this.ModalCancel()} >
                    <Form ref={this.formRef} layout="horizontal">
                        <Form.Item
                            name="ZjNo"
                            label="整机编码"
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            name="Matnr"
                            label="物料编码"
                            
                        >
                            <Input readOnly></Input>
                        </Form.Item>
                        <Form.Item
                            name="Series"
                            label="系  列"
                        >
                            <Input readOnly disabled></Input>
                        </Form.Item>
                        <Form.Item
                            name="Box"
                            label="分 动 箱"
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            name="Num"
                            label="数  量"
                        >
                            <Input readOnly></Input>
                        </Form.Item>
                        <Form.Item
                            name="Config"
                            label="配置"
                        >
                            <Input.TextArea></Input.TextArea>
                        </Form.Item>
                        <Form.Item
                            name="Datetime1"
                            label="投产日期"
                        >
                            <Input readOnly></Input>
                        </Form.Item>
                        <Form.Item
                            name="Datetime2"
                            label="交库日期"
                        >
                            <DatePicker format="YYYYMMDD"></DatePicker>
                        </Form.Item>
                        <Form.Item
                            name="Bz"
                            label="备注"
                        >
                            <Input></Input>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

        )
    }
}
