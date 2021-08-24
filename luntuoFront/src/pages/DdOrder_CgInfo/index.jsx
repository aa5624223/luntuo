import React, { Component } from 'react'
//导入组件
import { Button, Input, Form, DatePicker, Table, message, Spin, Checkbox } from 'antd'
//导入方法
import moment from 'moment'
//自定义组件
import LinkButton from '../../components/link-button';
//引入less
import './index.less'
//本地化
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
//自定义方法
import { ConvertFomrData } from '../../utils'
//导入api
import { getV_Sum_Num_CgInfo,updateCgBaseBum } from '../../api'
//Excel
import XLSX from 'xlsx'
//导入配置
import { DdOrder_CgInfo_columns} from '../../config/table-columns'
import { ArrowLeftOutlined } from '@ant-design/icons';
//引入缓存
import store from 'store'
const { RangePicker } = DatePicker;
//表格扩展 
const expandedRowRender = (record, index) => {
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
                //console.log(newData[index2][moment(dt3).format('DD')] );
                newData[index2][moment(dt3).format('DD')] += item.Menge*1;
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
//调度单 采购明细查看
export default class DdOrder_CgInfo extends Component {
    formRef = React.createRef();
    state = {
        dataSource: [],
        ViewMode:'V_CgInfo',//当前对应的视图是哪个 V_CgInfo V_CgInfo_kc
        loading: true,
        Btn_CgBaseload:false,
        DIDS: "",
        SearchContation: {},
        current: 1,
        dataTotal: 0,
        LTOrders: "",
        BaseTime: "",
        CgBaseTime:"",
        ExcelLoading: false,
        SpinTip:'',
        model: 0,
        expandRowKeys: []
    }
    TablerepetClassName = (record, index) => {

        if (record.repeat === true) {
            //console.dir("class");
            return "Tablerepet";
        } else {
            return "";
        }
    }
    //导出Excel
    ModalExcelOut = async () => {
        var { DIDS, ExcelLoading, LTOrders ,model,ViewMode} = this.state;//当前的订单
        if (ExcelLoading) {
            message.warn("数据打包中，请勿重复点击");
            return;
        }
        const form = this.formRef.current;
        var tempFormData = form.getFieldsValue(true);//当前查询条件
        var ExcelJson = [];
        tempFormData.DIDS = DIDS;
        tempFormData.page = 1;
        tempFormData.pageSize = 99999;
        if(tempFormData.model!==undefined && tempFormData.model.length!==undefined){
            tempFormData.model = tempFormData.model[0];
        }
        tempFormData.ViewMode = ViewMode;
        const FormData = ConvertFomrData(tempFormData);
        //添加loading效果
        this.setState({ ExcelLoading: true ,SpinTip:'Excel数据打包中'});
        const result = await getV_Sum_Num_CgInfo(FormData);
        if (result.status === 0) {
            const jo_V_CgInfo = result.jo_V_CgInfo.V_CgInfo;
            var jo_V_CgInfoSum = result.jo_V_CgInfoSum.V_CgInfo;    
            let V_CgInfo_Count = result.jo_V_CgInfo.V_CgInfo_Count;
            if(V_CgInfo_Count===0){
                message.warn("无数据可导出");
                this.setState({ ExcelLoading: false});
                return;
            }
            //console.dir(jo_V_CgInfo);
            const colums = DdOrder_CgInfo_columns(tempFormData.model);
            this.setState({ ExcelLoading: false });
            var i = 0;
            for (; i < jo_V_CgInfoSum.length; i++) {
                jo_V_CgInfoSum[i].ID = "ID" + i;
                //let TimeColum = [];
                for (var j=0; j < jo_V_CgInfo.length; j++) {
                    if (model === "1") {
                        if (jo_V_CgInfoSum[i].Matnr === jo_V_CgInfo[j].Matnr && jo_V_CgInfoSum[i].Series === jo_V_CgInfo[j].Series) {
                            let dt = new Date(jo_V_CgInfo[j].Datetime1);
                            if (jo_V_CgInfoSum[i][moment(dt).format("YYYYMMDD")] !== undefined) {
                                jo_V_CgInfoSum[i][moment(dt).format("YYYYMMDD")] += jo_V_CgInfo[j].Menge * 1;
                            } else {
                                jo_V_CgInfoSum[i][moment(dt).format("YYYYMMDD")] = jo_V_CgInfo[j].Menge * 1;
                            }
                        }
                    }else{
                        if (jo_V_CgInfoSum[i].Matnr === jo_V_CgInfo[j].Matnr && jo_V_CgInfoSum[i].Lifnr === jo_V_CgInfo[j].Lifnr) {
                            let dt = new Date(jo_V_CgInfo[j].Datetime1);
                            if (jo_V_CgInfoSum[i][moment(dt).format("YYYYMMDD")] !== undefined) {
                                jo_V_CgInfoSum[i][moment(dt).format("YYYYMMDD")] += jo_V_CgInfo[j].Menge * 1;
                            } else {
                                jo_V_CgInfoSum[i][moment(dt).format("YYYYMMDD")] = jo_V_CgInfo[j].Menge * 1;
                            }
                        }

                    }

                }
            }
            var timeCol = [];
            for (let k = 0; k < jo_V_CgInfoSum.length; k++) {
                let single = {}
                for (let l = 0; l < colums.length; l++) {
                    single[colums[l].title] = jo_V_CgInfoSum[k][colums[l].dataIndex];
                }
                
                for(let key2 in jo_V_CgInfoSum[k]){
                    if(!isNaN(Number(key2))){
                        single[key2+" "] = jo_V_CgInfoSum[k][key2];
                        let temp = timeCol.find(item=>{
                            if(item===Number(key2)){
                                return true;
                            }else{
                                return false;
                            }
                        })
                        if(temp===undefined){
                            timeCol.push(Number(key2));
                        }
                    }
                }
                ExcelJson.push(single);
            }
            //冒泡排序
            for(let k=0;k<timeCol.length;k++){
                for(let l=k;l<timeCol.length;l++){
                    if(timeCol[k]>timeCol[l]){
                        let temp = timeCol[k];
                        timeCol[k] = timeCol[l];
                        timeCol[l] = temp;
                    }
                }
            }
            //将json第一个改变位置
            let book = XLSX.utils.book_new();
            var newRow = {};
            for(let l = 0; l < colums.length; l++){
                newRow[colums[l].title] = jo_V_CgInfoSum[0][colums[l].dataIndex];
            }

            for(let k=0;k<timeCol.length;k++){
                //newRow[timeCol[k]] =
                newRow[timeCol[k]+" "] =  ExcelJson[0][timeCol[k]+" "];
            }
            ExcelJson[0] = newRow;
            let sheet = XLSX.utils.json_to_sheet(ExcelJson);
            sheet["!cols"] = [
                { wch: 15 }, { wch: 20 }, { wch: 10 }, { wch: 8 }, { wch: 12 }, { wch: 30 }, { wch: 12 }, { wch: 12 }, { wch: 15 }, { wch: 15 }
            ];
            XLSX.utils.book_append_sheet(book, sheet, 'Sheet1')
            XLSX.writeFile(book, `采购需求单 ${LTOrders} ` + moment().format('YYYYMMDD') + '.xlsx')
        } else {
            this.setState({ ExcelLoading: false });
            message.error("网络错误")
        }
    }
    handleBack = () => {
        const { history } = this.props;
        history.goBack();
    }
    //更新库存基准日期
    demantCgBaseTime = async ()=>{
        const {CgBaseTime,DIDS} = this.state;
        if(CgBaseTime===""){
            message.warn("请选择采购库存基准日期");
            return;
        }
        
        let strKcDate =  CgBaseTime.format("YYYYMMDD");
        let BaseTime = CgBaseTime.format("YYYY/MM/DD");
        let formData =  new FormData();
        formData.append("strKcDate",strKcDate);
        formData.append("iDID",DIDS);
        this.setState({Btn_CgBaseload:true});
        const result = await updateCgBaseBum(formData);
        if(result.code === "200"){
            this.setState({Btn_CgBaseload:false,BaseTime:BaseTime,ViewMode:'V_CgInfo_kc'},()=>{//更改当前的查询条件
                this.SearchData();
            });
            message.success("库存更新成功,等待查询数据...");
            //接下来更新库存上的内容
            
        }else{
            this.setState({Btn_CgBaseload:false});
            message.error("服务器无响应");
        }
    }
    componentDidMount = () => {
        //DIDS 和LTOrdders 必须对应
        var { DIDS, LTOrders,BaseTime } = this.props.location;
        //用于测试后期删掉
        //DIDS = "76,77,78";
        //LTOrders = "LT20210201,LT20210301,LT20210401";
        if (DIDS === undefined || LTOrders === undefined) {
            DIDS = store.get("DdOrder_JjInfo_DIDS");
            LTOrders = store.get("DdOrder_JjInfo_LTOrders");
            BaseTime = store.get("DdOrder_JjInfo_BaseTime");
        } else {
            store.set("DdOrder_JjInfo_DIDS", DIDS);
            store.set("DdOrder_JjInfo_LTOrders", LTOrders);
            store.set("DdOrder_JjInfo_BaseTime", BaseTime);
        }
        this.setState({ DIDS: DIDS, LTOrders,BaseTime}, () => {
            this.SearchData();
        })
    }
    SearchData = async (pagination = {}) => {
        var { DIDS, SearchContation,ViewMode} = this.state;
        const form = this.formRef.current;
        if (pagination.page === undefined) {
            SearchContation.page = 1;
            SearchContation.pageSize = 100;
        } else {
            SearchContation.page = pagination.page;
            SearchContation.pageSize = pagination.pageSize;
        }
        if (DIDS === "" || DIDS === undefined) {
            DIDS = "0";
        }
        var tempFormData = form.getFieldsValue(true);
        tempFormData.DIDS = DIDS;

        if (tempFormData.model !== undefined) {
            let tepModel = tempFormData.model[0];
            delete tempFormData.model;
            tempFormData.model = tepModel;
        }

        tempFormData.page = SearchContation.page;
        tempFormData.pageSize = SearchContation.pageSize;
        tempFormData.ViewMode = ViewMode;
        const FormData = ConvertFomrData(tempFormData);
        this.setState({ loading: true })
        const result = await getV_Sum_Num_CgInfo(FormData);
        if (result.status === 0) {
            const jo_V_CgInfo = result.jo_V_CgInfo.V_CgInfo;
            var jo_V_CgInfoSum = result.jo_V_CgInfoSum.V_CgInfo;
            var i = 0;
            //var j = 0;
            var preSum = {};
            for (; i < jo_V_CgInfoSum.length; i++) {
                if (i === 0) {
                    preSum = { ...jo_V_CgInfoSum[0] };
                }
                jo_V_CgInfoSum[i].ID = "D" + i;
                for (var j = 0; j < jo_V_CgInfo.length; j++) {
                    //console.dir(jo_V_CgInfoSum[i].Matnr);
                    if (tempFormData.model === "1") {
                        if (jo_V_CgInfoSum[i].Matnr === jo_V_CgInfo[j].Matnr && jo_V_CgInfoSum[i].Series === jo_V_CgInfo[j].Series) {
                            if (jo_V_CgInfoSum[i].Det === undefined) {
                                jo_V_CgInfoSum[i].Det = [];
                            }
                            jo_V_CgInfoSum[i].Det.push(jo_V_CgInfo[j]);
                            console.dir("Series");
                        }
                    } else {
                        if (jo_V_CgInfoSum[i].Matnr === jo_V_CgInfo[j].Matnr && jo_V_CgInfoSum[i].Lifnr === jo_V_CgInfo[j].Lifnr) {
                            if (jo_V_CgInfoSum[i].Det === undefined) {
                                jo_V_CgInfoSum[i].Det = [];
                            }
                            jo_V_CgInfoSum[i].Det.push(jo_V_CgInfo[j]);
                            console.dir("Not Series");
                        }

                    }
                }
                if (i !== 0 && preSum.Matnr === jo_V_CgInfoSum[i].Matnr && tempFormData.model !== "1") {
                    jo_V_CgInfoSum[i].Det = [];
                    jo_V_CgInfoSum[i].repeat = true;
                } else if (i !== 0 && preSum.Matnr === jo_V_CgInfoSum[i].Matnr && i !== 0 && preSum.Series === jo_V_CgInfoSum[i].Series && tempFormData.model === "1") {
                    jo_V_CgInfoSum[i].Det = [];
                    jo_V_CgInfoSum[i].repeat = true;
                }
                else {
                    preSum = jo_V_CgInfoSum[i];
                }
            }
            console.dir(jo_V_CgInfoSum);
            this.setState({ loading: false, dataSource: jo_V_CgInfoSum, current: tempFormData.page, dataTotal: result.jo_V_CgInfoSum.V_CgInfo_Count, model: tempFormData.model,Btn_CgBaseload:false })
        } else {
            this.setState({ loading: false });
            message.error("网络错误");
        }
    }
    //打开或关闭所有展开项
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
        const { loading,Btn_CgBaseload, dataSource, LTOrders,BaseTime, current, dataTotal, ExcelLoading, model, expandRowKeys ,SpinTip} = this.state;
        
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
                            <RangePicker locale={locale} />
                        </Form.Item>
                        <Form.Item
                            name="Series"
                            label="系列"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="Matnr"
                            label="物料编码"
                        >
                            <Input style={{width:'130px'}} />
                        </Form.Item>
                        <Form.Item
                            name="Maktx"
                            label="物料描述"
                        >
                            <Input style={{width:'100px'}} />
                        </Form.Item>
                        <Form.Item
                            name="MRP"
                            label="MRP控制者"
                        >
                            <Input style={{width:'50px'}} />
                        </Form.Item>
                        <Form.Item
                            name="Lifnr"
                            label="供应商代码"
                        >
                            <Input style={{width:'60px'}} />
                        </Form.Item>
                        <Form.Item
                            name="Name1"
                            label="供应商名称"
                        >
                            <Input style={{width:'100px'}} />
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
                            <Button type="primary" onClick={() => this.SearchData()} >查询</Button>
                            &nbsp;&nbsp;

                        </Form.Item>
                    </Form>
                </div>
                <div>
                    <div style={{ width: "59%", float: "left" }}>
                        <h1 style={{ fontSize: '18px', paddingLeft: '15px', lineHeight: '35px'}}>
                            <Button onClick={() => this.OpenOrCloseAll()}>展开/关闭所有行</Button>
                            &nbsp;单号:{LTOrders},库存基准日期:{BaseTime}
                        </h1>
                    </div>
                    <div style={{ width: "40%", float: "left", textAlign: 'right',lineHeight: '35px'}}>
                        <Button type="primary" loading={Btn_CgBaseload} onClick={() => this.demantCgBaseTime()} >更新库存基准日期</Button>
                        &emsp;
                        <DatePicker locale={locale}  format="YYYYMMDD" onChange={(val)=>this.setState({CgBaseTime:val})}></DatePicker>
                        &emsp;
                        <Button type="primary" onClick={() => this.ModalExcelOut()} >Excel导出</Button>
                    </div>
                </div>
                <Table
                    dataSource={dataSource}
                    bordered
                    rowKey="ID"
                    sticky={true}
                    scroll={{ y: 560 }}
                    size="middle"
                    columns={DdOrder_CgInfo_columns(model)}
                    loading={loading}
                    rowClassName={this.TablerepetClassName}
                    pagination={{
                        position: ['bottomCenter'],
                        pageSizeOptions: [20],
                        current: current,
                        total: dataTotal,
                        showTotal: (total, range) => `一共 ${total} 条数据`,
                        pageSize: 100,
                        onChange: (page, pageSize) => {
                            this.SearchData({ page: page, pageSize: pageSize });
                        }
                    }}
                    expandable={{
                        expandRowByClick: true,
                        expandedRowRender,
                        columnWidth: 8,
                        indentSize: 0,
                        expandedRowKeys: expandRowKeys,
                        onExpand: (expanded, record) => { this.OpenOrCloseSingle(record, expanded) }
                    }}
                >
                </Table>
                <Spin style={{ position: 'absolute', left: '48%', top: '47%' }} tip={SpinTip} spinning={ExcelLoading}></Spin>
            </div>
        )
    }
}
