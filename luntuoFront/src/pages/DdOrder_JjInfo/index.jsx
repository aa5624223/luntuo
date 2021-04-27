
import React, { Component } from 'react'
//导入组件
import {Button,Input,Form,DatePicker, Table,message,Spin,Checkbox} from 'antd'
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
import {getV_Sum_Num_JiInfo} from '../../api'
//Excel
import XLSX from 'xlsx'
//导入配置
import {DdOrder_JjInfo_columns} from '../../config/table-columns'
import {ArrowLeftOutlined} from '@ant-design/icons';
//引入缓存
import store from 'store'

const {RangePicker} = DatePicker;
//表格扩展
const expandedRowRender = (record,index)=>{
        //DdOrder_Det_Sum_columns
    //console.dir(record);
    const data = record.Det;
    if (data === undefined || data.length === 0) {
        return "";
    }
    // var DetVal = [];
    // var newData = {};
    // for (let i = 0; i < data.length; i++) {
    //     if (newData[data[i].Datetime1] === undefined) {
    //         //console.dir(data[i].Datetime1);
    //         newData[data[i].Datetime1] = 0;
    //     }
    // }
    // for (var key in newData) {
    //     for (let i = 0; i < data.length; i++) {
    //         if (key === data[i].Datetime1) {
    //             newData[key] += (data[i].Menge * 1)
    //         }
    //     }
    // }
    //DetVal.push({ ID: 1, ...newData });
    //根据时间创建多个Table
    //moment(dt).isBetween(dt1,dt2);
    var newColums = [];
    var newData = [];
    //是否创建数组
    var dt1 = null;
    var dt2 = null;
    data.forEach((item,index) => {
        let singleColums = [];
        var dt = new Date(item.Datetime1);
        let dt3 = moment(dt);
        dt3.add(1,'m');
        if(newColums.length===0||!moment(dt3).isBetween(dt1,dt2)){
            let singleArr = {};
            dt1 = moment(dt).startOf("month");
            dt2 = moment(dt).endOf("month");
            let dt4 = moment(dt).startOf("month");
            //插入表头的第一列
            singleColums.push({
                title: '日期',
                dataIndex: '日期',
            })
            //插入表头第一列的内容为空
            singleArr[moment(dt1).format('YYYYMM')] = 0;
            singleArr.ID = moment(dt1).format('YYYYMM');
            //插入其他列
            dt4.add(1, 's');
            for(let i=1;i<=31;i++){
                var key = i<10?'0'+i:''+i;
                singleColums.push({
                    title:key,
                    dataIndex:key,
                })
                singleArr[key] = 0;
            }
            singleArr["dt"]=moment(dt3);
            singleArr["日期"]=moment(dt3).format("YYYYMM");
            newColums.push(singleColums);
            newData.push(singleArr);
        }
        
        newColums.forEach((item2,index2)=>{
            let dt5 = moment(newData[index2]["dt"]).startOf("month");
            let dt6 = moment(newData[index2]["dt"]).endOf("month");
            if(moment(dt3).isBetween(dt5,dt6)){
                newData[index2][moment(dt3).format('DD')] = item.Menge*1;
            }
            //moment(dt3).format('YYYYMM')
            
        })
    })
    // return (<div>
    //     {
    //         newColums.map((_,index)=>{
    //             return(
    //                 <Table
    //                     bordered
    //                     size="small"
    //                     rowKey="ID"
    //                     key={'tab'+index}
    //                     columns={newColums[index]}
    //                     dataSource={newData}
    //                     pagination={false}
    //                 >
    //                 </Table>
    //             )
    //         })
    //     }
    // </div>)
    return <Table
                bordered
                size="small"
                rowKey="ID"
                columns={newColums[0]}
                dataSource={newData}
                pagination={false}
            >
    </Table>
}
//调度单 机加明细查看
export default class DdOrder_JjInfo extends Component {
    formRef = React.createRef();
    state = {
        dataSource:[],
        loading:true,
        DIDS:"",
        LTOrders:"",
        ExcelLoading:false,
        //1 显示系列 0 不显示系列
        model:0,
        expandRowKeys:[]
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
        const result = await getV_Sum_Num_JiInfo(FormData);
        if(result.status === 0){
            const jo_V_JjInfo = result.jo_V_JjInfo.V_JjInfo;
            var jo_V_JiInfoSum = result.jo_V_JiInfoSum.V_JjInfo;
            const colums = DdOrder_JjInfo_columns();
            var i = 0;
            var j = 0;
            for(;i<jo_V_JiInfoSum.length;i++){
                jo_V_JiInfoSum[i].ID = "ID"+i;
                for(;j<jo_V_JjInfo.length;j++){
                    if(jo_V_JiInfoSum[i].Matnr===jo_V_JjInfo[j].Matnr){
                        var dt = new Date(jo_V_JjInfo[j].Datetime1);
                        if(jo_V_JiInfoSum[i][moment(dt).format("YYYYMMDD")]!==undefined){
                            jo_V_JiInfoSum[i][moment(dt).format("YYYYMMDD")] += jo_V_JjInfo[j].Menge*1;
                        }else{
                            jo_V_JiInfoSum[i][moment(dt).format("YYYYMMDD")] = jo_V_JjInfo[j].Menge*1;
                        }
                        
                    }else{
                        break;
                    }
                }
            }
            for(let k=0;k<jo_V_JiInfoSum.length;k++){
                let single = {}
                
                for(let l=0;l<colums.length;l++){
                    single[colums[l].title] = jo_V_JiInfoSum[k][colums[l].dataIndex];
                }
                for(let key2 in jo_V_JiInfoSum[k]){
                    if(!isNaN(Number(key2))){
                        single[key2+" "] = jo_V_JiInfoSum[k][key2];
                    }
                }
                ExcelJson.push(single);
            }
            let book = XLSX.utils.book_new();
            let sheet = XLSX.utils.json_to_sheet(ExcelJson);
            sheet["!cols"]=[
                {wch:15},{wch:30},{wch:10},{wch:10},{wch:10},{wch:10}
            ];
            XLSX.utils.book_append_sheet(book, sheet, 'Sheet1')
            XLSX.writeFile(book, `机加需求单 ${LTOrders} `+moment().format('YYYYMMDD')+'.xlsx')
        }else{
            message.error("网络错误");
        }
        this.setState({ExcelLoading:false})
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
    SearchData = async ()=>{
        var { DIDS} = this.state;
        const form = this.formRef.current;
        if(DIDS==="" || DIDS===undefined){
            DIDS="0";
        }
        
        var tempFormData = form.getFieldsValue(true);
        tempFormData.DIDS = DIDS;
        
        if(tempFormData.model!==undefined){
            let tepModel = tempFormData.model[0];
            delete  tempFormData.model;
            tempFormData.model = tepModel;
        }
        const FormData = ConvertFomrData(tempFormData);
        
        this.setState({loading:true})
        const result = await getV_Sum_Num_JiInfo(FormData);
        if(result.status===0){
            const jo_V_JjInfo = result.jo_V_JjInfo.V_JjInfo;
            var jo_V_JiInfoSum = result.jo_V_JiInfoSum.V_JjInfo;
            var i = 0;
            var j = 0;
            for(;i<jo_V_JiInfoSum.length;i++){
                jo_V_JiInfoSum[i].ID = "ID"+i;
                for(;j<jo_V_JjInfo.length;j++){
                    if(tempFormData.model==="1"){
                        if(jo_V_JiInfoSum[i].Matnr===jo_V_JjInfo[j].Matnr && jo_V_JiInfoSum[i].Series === jo_V_JjInfo[j].Series){
                        
                            if(jo_V_JiInfoSum[i].Det===undefined){
                                jo_V_JiInfoSum[i].Det = [];
                            }
                            jo_V_JiInfoSum[i].Det.push(jo_V_JjInfo[j]);
                        }else{
                            break;
                        }
                    }else{
                        if(jo_V_JiInfoSum[i].Matnr===jo_V_JjInfo[j].Matnr){
                            if(jo_V_JiInfoSum[i].Det===undefined){
                                jo_V_JiInfoSum[i].Det = [];
                            }
                            jo_V_JiInfoSum[i].Det.push(jo_V_JjInfo[j]);
                        }else{
                            break;
                        }
                    }
                    
                }
            }
            //var NewSum = [];
            this.setState({loading:false,dataSource:jo_V_JiInfoSum,model:tempFormData.model})
        }else{
            this.setState({loading:false});
            message.error("网络错误");
        }
    }
    OpenOrCloseAll = () => {
        //expandRowKeys
        const { expandRowKeys, dataSource } = this.state;
        if (expandRowKeys.length > 0) {//关闭
            this.setState({ expandRowKeys: [] });
        } else {//展开
            let newArr = [];
            for (let i = 0; i < dataSource.length; i++) {
                newArr.push(dataSource[i].ID);
            }
            this.setState({ expandRowKeys: newArr });
        }
    }
    OpenOrCloseSingle = (record, type) => {
        let { expandRowKeys } = this.state;
        if (type) {
            expandRowKeys.push(record.ID);
        } else {
            expandRowKeys = expandRowKeys.filter(item => {
                if (item === record.ID) {
                    return false;
                } else {
                    return true;
                }
            })
        }
        this.setState({ expandRowKeys });
    }
    render() {
        const {loading,dataSource,LTOrders,ExcelLoading,model,expandRowKeys} = this.state;
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
                            name="model"
                            label="区分系列"
                        >
                            <Checkbox.Group>
                                <Checkbox value="1"></Checkbox>
                            </Checkbox.Group>
                            
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={()=>this.SearchData()} >查询</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div>
                    <div style={{width:"75%",float:"left"}}>
                        <h1 style={{fontSize:'20px',paddingLeft:'20px',lineHeight:'35px'}}>
                        <Button onClick={() => this.OpenOrCloseAll()}>展开/关闭所有行</Button>
                            单号:{LTOrders}
                            </h1>
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
                size = "middle"
                columns = {DdOrder_JjInfo_columns(model)}
                loading = {loading}
                pagination={false}
                expandable={{
                    expandRowByClick: true,
                    expandedRowRender,
                    columnWidth:4,
                    indentSize: 0,
                    expandedRowKeys: expandRowKeys,
                    onExpand: (expanded, record) => { this.OpenOrCloseSingle(record, expanded) }
                }}
                >

                </Table>
                <Spin style={{position:'absolute',left:'48%',top:'47%'}} tip="数据打包Excel..." spinning={ExcelLoading}></Spin>
            </div>
        )
    }
}
