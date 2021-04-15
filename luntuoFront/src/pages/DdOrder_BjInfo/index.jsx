import React, { Component } from 'react'
//导入组件
import {Button,Input,Form,DatePicker, Table,message,Select,Spin} from 'antd'
//导入方法
import moment from 'moment'
//自定义组件
import LinkButton from '../../components/link-button';
//本地化
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
//自定义方法
import {ConvertFomrData} from '../../utils'
//导入api
import {getV_Sum_Num_BjInfo} from '../../api'
//Excel
import XLSX from 'xlsx'
//导入配置
import {DdOrder_BjInfo_columns,DdOrder_CgInfo_Det_columns} from '../../config/table-columns'
import {ArrowLeftOutlined} from '@ant-design/icons';
//引入缓存
import store from 'store'
const {RangePicker} = DatePicker;
const {Option} = Select;
//表格扩展
const expandedRowRender = (record,index)=>{
    //DdOrder_Det_Sum_columns
    //console.dir(record);
    const data = record.Det;
    if(data===undefined || data.length===0){
        return "";
    }
    var DetVal = [];
    
    var newData = {};
    for(let i=0;i<data.length;i++){
        if(newData[data[i].Datetime1]===undefined){
            console.dir(data[i].Datetime1);
            newData[data[i].Datetime1] = 0;
        }
    }
    for(var key in newData){
        for(let i=0;i<data.length;i++){
            if(key === data[i].Datetime1){
                newData[key] += (data[i].Num1*1)
            }
        }
    }

    DetVal.push({ID:1,...newData});
    return <Table bordered size="small" rowKey="ID" columns={DdOrder_CgInfo_Det_columns(newData)} dataSource={DetVal} pagination={false}></Table>
}
export default class DdOrder_BjInfo extends Component {
    formRef = React.createRef();
    state ={
        dataSource:[],
        loading:true,
        DIDS:"",
        SearchContation:{},
        current:1,
        dataTotal:0,
        LTOrders:"",
        ExcelLoading:false
    }
    ModalExcelOut = async ()=>{
        var { DIDS,ExcelLoading,LTOrders} = this.state;//当前的订单
        if(ExcelLoading){
            message.warn("数据打包中，请勿重复点击");
            return;
        }
        const form = this.formRef.current;
        var tempFormData = form.getFieldsValue(true);//当前查询条件
        var ExcelJson = [];
        tempFormData.DIDS = DIDS;
        tempFormData.page = 1;
        tempFormData.pageSize = 99999;
        const FormData = ConvertFomrData(tempFormData);
        //添加loading效果
        this.setState({ExcelLoading:true});
        const result = await getV_Sum_Num_BjInfo(FormData);
        if(result.status===0){
            var V_BjInfo_Sum = result.V_BjInfo_Sum.V_BjInfo;
            //const V_BjInfo_Count = result.V_BjInfo_Sum.V_BjInfo_Count;
            const V_BjInfo_Det = result.V_BjInfo_Det.V_BjInfo;
            const colums = DdOrder_BjInfo_columns();
            var i=0;
            var j=0;
            //var j=0;
            for(;i<V_BjInfo_Sum.length;i++){
                V_BjInfo_Sum[i].ID ="D"+i;
                for(;j<V_BjInfo_Det.length;j++){
                    
                    if(V_BjInfo_Sum[i].FirstCode=== V_BjInfo_Det[j].FirstCode && 
                        V_BjInfo_Sum[i].SecondCode=== V_BjInfo_Det[j].SecondCode && 
                        V_BjInfo_Sum[i].ThirdCode=== V_BjInfo_Det[j].ThirdCode && 
                        V_BjInfo_Sum[i].FourthCode=== V_BjInfo_Det[j].FourthCode &&
                        V_BjInfo_Sum[i].FifthCode=== V_BjInfo_Det[j].FifthCode){
                            if(V_BjInfo_Sum[i][V_BjInfo_Det[j]]!==undefined){
                                V_BjInfo_Sum[i][V_BjInfo_Det[j]] += V_BjInfo_Det[j].Num1*1;
                            }else{
                                V_BjInfo_Sum[i][V_BjInfo_Det[j]] = V_BjInfo_Det[j].Num1*1;
                            }
                            
                    }else{
                        break;
                    }
                    
                }
            }
            for(let k=0;k<V_BjInfo_Sum.length;k++){
                let single = {}
                
                for(let l=0;l<colums.length;l++){
                    single[colums[l].title] = V_BjInfo_Sum[k][colums[l].dataIndex];
                }
                for(let key2 in V_BjInfo_Sum[k]){
                    if(!isNaN(Number(key2))){
                        single[key2+" "] = V_BjInfo_Sum[k][key2];
                    }
                }
                switch(tempFormData.level){
                    case "4":
                        delete single.五层编码
                        delete single.五层名称
                        break;
                    case "3":
                        delete single.五层编码
                        delete single.五层名称
                        delete single.四层编码
                        delete single.四层名称
                        break;
                    case "2":
                        delete single.五层编码
                        delete single.五层名称
                        delete single.四层编码
                        delete single.四层名称
                        delete single.三层编码
                        delete single.三层名称
                        break;
                    case "1":
                        delete single.五层编码
                        delete single.五层名称
                        delete single.四层编码
                        delete single.四层名称
                        delete single.三层编码
                        delete single.三层名称
                        delete single.二层编码
                        delete single.二层名称
                        break;
                    default:
                }
                ExcelJson.push(single);
            }
            let book = XLSX.utils.book_new();
            var sheet = XLSX.utils.json_to_sheet(ExcelJson);
            switch(tempFormData.level){
                case "1":
                    sheet["!cols"]=[
                        {wch:8},{wch:20},{wch:36},{wch:10}
                    ];
                    break;
                case "2":
                    sheet["!cols"]=[
                        {wch:8},{wch:20},{wch:36},{wch:20},{wch:36},{wch:10}
                    ];
                    break;
                case "3":
                    sheet["!cols"]=[
                        {wch:8},{wch:20},{wch:36},{wch:20},{wch:36},{wch:20},{wch:36},{wch:10}
                    ];
                    break;
                case "4":
                    sheet["!cols"]=[
                        {wch:8},{wch:20},{wch:36},{wch:20},{wch:36},{wch:20},{wch:36},{wch:20},{wch:36},{wch:10}
                    ];
                    break;
                case "5":
                    sheet["!cols"]=[
                        {wch:8},{wch:20},{wch:36},{wch:20},{wch:36},{wch:20},{wch:36},{wch:20},{wch:36},{wch:20},{wch:36},{wch:10}
                    ];
                    break;
                default:
            }
            
            XLSX.utils.book_append_sheet(book, sheet, 'Sheet1')
            XLSX.writeFile(book, `钣金需求单 ${LTOrders} `+moment().format('YYYYMMDD')+'.xlsx')
        }else{
            message.error("网络错误");
        }
        this.setState({ExcelLoading:false});
    }
    handleBack = ()=>{
        const { history } = this.props;
        history.goBack();
    }
    componentDidMount = ()=>{
        //DIDS 和LTOrdders 必须对应
        var {DIDS,LTOrders} = this.props.location;
        //用于测试后期删掉
        //DIDS = "76,77,78";
        //LTOrders = "LT20210201,LT20210301,LT20210401";
        if(DIDS===undefined || LTOrders===undefined){
            DIDS = store.get("DdOrder_JjInfo_DIDS");
            LTOrders = store.get("DdOrder_JjInfo_LTOrders");
        }else{
            store.set("DdOrder_JjInfo_DIDS",DIDS);
            store.set("DdOrder_JjInfo_LTOrders",LTOrders);
        }
        this.setState({DIDS:DIDS,LTOrders},()=>{
            this.SearchData();
        })
    }

    SearchData = async (pagination = {})=>{
        //getV_Sum_Num_BjInfo
        const {DIDS,SearchContation} = this.state;
        const form = this.formRef.current;
        if(pagination.current === undefined){
            SearchContation.page = 1;
            SearchContation.pageSize = 100;
        }else{
            SearchContation.page = pagination.current;
            SearchContation.pageSize = pagination.pageSize;
        }
        var tempFormData = form.getFieldsValue(true);
        tempFormData.DIDS = DIDS;
        tempFormData.page = SearchContation.page;
        tempFormData.pageSize = SearchContation.pageSize;
        const FormData = ConvertFomrData(tempFormData);
        this.setState({loading:true})
        const result = await getV_Sum_Num_BjInfo(FormData);
        if(result.status===0){
            var V_BjInfo_Sum = result.V_BjInfo_Sum.V_BjInfo;
            const V_BjInfo_Count = result.V_BjInfo_Sum.V_BjInfo_Count;
            const V_BjInfo_Det = result.V_BjInfo_Det.V_BjInfo;
            var i=0;
            var j=0;
            //var j=0;
            for(;i<V_BjInfo_Sum.length;i++){
                V_BjInfo_Sum[i].ID ="D"+i;
                for(;j<V_BjInfo_Det.length;j++){
                    
                    if(V_BjInfo_Sum[i].FirstCode=== V_BjInfo_Det[j].FirstCode && 
                        V_BjInfo_Sum[i].SecondCode=== V_BjInfo_Det[j].SecondCode && 
                        V_BjInfo_Sum[i].ThirdCode=== V_BjInfo_Det[j].ThirdCode && 
                        V_BjInfo_Sum[i].FourthCode=== V_BjInfo_Det[j].FourthCode &&
                        V_BjInfo_Sum[i].FifthCode=== V_BjInfo_Det[j].FifthCode){
                            if(V_BjInfo_Sum[i].Det ===undefined){
                                V_BjInfo_Sum[i].Det = [];
                            }
                            V_BjInfo_Sum[i].Det.push(V_BjInfo_Det[j]);
                    }else{
                        break;
                    }
                    
                }
            }
            this.setState({loading:false,dataSource:V_BjInfo_Sum,current:tempFormData.page,dataTotal:V_BjInfo_Count});
        }else{
            this.setState({loading:false})
            message.error("网络错误");
        }
    }

    render() {
        const {loading,dataSource,LTOrders,current,dataTotal,ExcelLoading} = this.state;
        return (
            <div className="main">
                <div className="toolArea">
                    <Form layout="inline" ref={this.formRef} >
                        <Form.Item>
                            <LinkButton onClick={() => this.handleBack()}>
                                <ArrowLeftOutlined />返回调度单
                            </LinkButton>
                        </Form.Item>
                        <Form.Item
                            name="Datetime1"
                            label="时间"
                        >
                            <RangePicker locale={locale}/>
                        </Form.Item>
                        <Form.Item
                            name="Series"
                            label="系列"
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="level"
                            label="层级"
                            initialValue="1"
                        >
                            <Select>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={()=>this.SearchData()} >查询</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div>
                    <div style={{width:"75%",float:"left"}}>
                        <h1 style={{fontSize:'20px',paddingLeft:'20px',lineHeight:'35px'}}>单号:{LTOrders}</h1>
                    </div>
                    <div style={{width:"24%",float:"left",textAlign:'right'}}>
                        <Button type="primary" onClick={()=>this.ModalExcelOut()} >Excel导出</Button>
                    </div>
                </div>
                <Table
                dataSource = {dataSource}
                bordered
                rowKey="ID"
                sticky={true}
                scroll={{ y: 560}} 
                size = "middle"
                columns = {DdOrder_BjInfo_columns()}
                loading = {loading}
                pagination={{
                    position: ['bottomCenter'],
                        pageSizeOptions:[20],
                        current:current,
                        total:dataTotal,
                        showTotal:(total, range) => `一共 ${total} 条数据`,
                        pageSize:100,
                        onChange:(page,pageSize)=>{
                            this.SearchData({page:page,pageSize:pageSize});
                        }
                }}
                expandable={{expandedRowRender,columnWidth:10}}
                >

                </Table>
                <Spin style={{position:'absolute',left:'48%',top:'47%'}} tip="数据打包Excel..." spinning={ExcelLoading}></Spin>
            </div>
        )
    }
}
