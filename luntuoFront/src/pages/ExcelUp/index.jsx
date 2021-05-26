import React, { Component } from 'react'
import { Upload, message, Button,Table,Row,Col,Modal,DatePicker} from 'antd'
import { UploadOutlined,CheckCircleTwoTone,ArrowLeftOutlined} from '@ant-design/icons';
import XLSX from 'xlsx'
import moment from 'moment';
import LinkButton from '../../components/link-button';
//api
import {submitBjImp,submitCgImp,submitJjImp,submitWBInfo} from '../../api'
import { isForOfStatement } from 'typescript';
const { confirm } = Modal;
//用于处理 Excel 上传的页面
export default class ExcelUp extends Component {
    //
    dateFormat = 'YYYY-MM-DD';
    state={
        dataSource:[],
        loading:false,
        //0 等待上传，1已经提交未上传，2上传成功,等待重新提交
        uploadState:0,
        type:0,//页面展示类型
        isBaseDate:false,
        columns:[],
        loadExcelUp1:false,
        loadExcelUp2:false,
        loadExcelUp3:false
    }
    key=0;
    //读取文件
    attes = {
        name: 'file',
        headers: { authorization: 'authorization-text' },
        showUploadList:false,
        beforeUpload:(file)=> {
            if(file.name.lastIndexOf('.xls')===-1 && file.name.lastIndexOf('.xlsx') ===-1){
                message.error("请上传Excel文件");
                return false;
            }
            const {columns} = this.state;
            const fileReader = new FileReader();
            fileReader.onload = (event,_this) => {
                try {
                    const { result } = event.target;
                    const workbook = XLSX.read(result, { type: 'binary',cellDates:true});
                    let data = []; // 存储获取到的数据
                    // 遍历每张工作表进行读取（这里默认只读取第一张表）
                    for (const sheet in workbook.Sheets) {
                        if (workbook.Sheets.hasOwnProperty(sheet)) {
                            // 利用 sheet_to_json 方法将 excel 转成 json 数据
                            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                            data = data.map(item=>{
                                let single ={}
                                columns.forEach(item2=>{
                                    if(item[item2.title]!==undefined){
                                        console.dir(item2.title);
                                        if(item2.title.indexOf('日期')!==-1 || item2.title.indexOf('时间')!==-1){
                                            
                                            if(item[item2.title] instanceof Date){
                                                single[item2.dataIndex] = moment(item[item2.title]).format('YYYYMMDD');
                                            }else{
                                                
                                                if(typeof(item[item2.title])==='number'){
                                                    single[item2.dataIndex] = item[item2.title];
                                                }else if((item[item2.title]+"").indexOf('/') !== -1 ){
                                                    var dts = item[item2.title].split('/');
                                                    var YYYYMMDD = dts[0];
                                                    if(dts[1].length===1){
                                                        dts[1] = 0 + dts[1];
                                                    }
                                                    if(dts[2].length===1){
                                                        dts[2] = 0 + dts[2];
                                                    }
                                                    YYYYMMDD +=dts[1] +dts[2]
                                                    single[item2.dataIndex] = YYYYMMDD;
                                                }else{
                                                    if(item[item2.title].length===8){
                                                        single[item2.dataIndex] = item[item2.title];
                                                    }else{
                                                        var dt = new Date(item[item2.title]);
                                                        single[item2.dataIndex] = moment(dt).format('YYYYMMDD');
                                                    }
                                                    
                                                }
                                                
                                            }
                                        }else{
                                            single[item2.dataIndex] = item[item2.title]
                                        }
                                        
                                    }
                                })
                                single.key="key"+(this.key++)
                                return single
                            })
                        }
                        //只读一张表
                        break;
                    }
                    console.dir(data);
                    this.setState({dataSource:data,uploadState:1});
                } catch (e) {
                    message.error("请上传Excel文件");
                    return false;
                }
            }
            fileReader.readAsBinaryString(file,this);
            return false;//拦截上传文件
        }
    }
    //普通提交
    handleSubmit = async ()=>{
        if(this.state.loadExcelUp1){
            message.warn('请勿重复提交');
            return;
        }
        this.setState({loadExcelUp1:true},async ()=>{
            const {dataSource} = this.state;
            const {submitUrl} = this.props.location;
            //移除key
            const SubmitData = dataSource.map(item=>{
                delete item.key;
                return item;
            })
            //需要提交的内容
            //console.dir(SubmitData);
    
            let formData = new FormData();
            for(var i=0;i<SubmitData.length;i++){
                formData.append(`list[${i}]`,JSON.stringify(SubmitData[i]));
            }
            formData.append("type",0);
            formData.append("Count",i);
            
            let result;
            try{
                switch(submitUrl){
                    case "BjImp":
                        result = await submitBjImp(formData);
                        break;
                    case "CgImp":
                        formData.append("BaseDate",this.BaseDate);
                        result = await submitCgImp(formData);
                        break;
                    case "JjImp":
                        result = await submitJjImp(formData);
                        break;
                    case "WBInfo":
                        result = await submitWBInfo(formData);
                        break;
                    default:
                }
                 
                if(result.status === 0 ){
                    confirm({
                        icon:<CheckCircleTwoTone twoToneColor="#52c41a" />,
                        title: 'Excel上传成功，请勿重复上传',
                        okText: '确认',
                    })
                }else{
                    message.error("服务器无响应");
                }
        
        
                this.setState({
                    dataSource:[],
                    uploadState:2
                })
            }catch{
    
            }finally{
                this.setState({loadExcelUp1:false})
            }
        });
    }
    handleSubmit1 = async ()=>{//全新执行 追加参数 type = 0
        if(this.state.loadExcelUp2){
            message.warn("请勿重复提交");
            return;
        }
        this.setState({loadExcelUp2:true},async ()=>{
        const {dataSource} = this.state;
        const {submitUrl} = this.props.location;
        //移除key
        const SubmitData = dataSource.map(item=>{
            delete item.key;
            return item;
        })
        //需要提交的内容
        let formData = new FormData();
        for(var i=0;i<SubmitData.length;i++){
            formData.append(`list[${i}]`,JSON.stringify(SubmitData[i]));
        }
        formData.append("type",1);
        formData.append("Count",i);
        try{
            let result;
        switch(submitUrl){
            case "BjImp":
                result = await submitBjImp(formData);
                break;
            case "CgImp":
                formData.append("BaseDate",this.BaseDate);
                result = await submitCgImp(formData);
                break;
            case "JjImp":
                result = await submitJjImp(formData);
                break;
            case "WBInfo":
                result = await submitWBInfo(formData);
                break;
            default:
        }

        if(result.status === 0 ){
            confirm({
                icon:<CheckCircleTwoTone twoToneColor="#52c41a" />,
                title: 'Excel上传成功，请勿重复上传',
                okText: '确认',
            })
        }else{
            message.error("服务器无响应");
        }


        this.setState({
            dataSource:[],
            uploadState:2
        })
        }catch{

        }finally{
            this.setState({loadExcelUp2:false});
        }
        });
        
        
    }
    handleSubmit2 = async ()=>{//追加执行 追加参数 type = 1
        if(this.state.loadExcelUp3){
            message.warn("请勿重复提交");
            return;
        }
        this.setState({loadExcelUp3:true},async ()=>{
        
        const {dataSource} = this.state;
        const {submitUrl} = this.props.location;
        //移除key
        const SubmitData = dataSource.map(item=>{
            delete item.key;
            return item;
        })
        //需要提交的内容
        let formData = new FormData();
        for(var i=0;i<SubmitData.length;i++){
            formData.append(`list[${i}]`,JSON.stringify(SubmitData[i]));
        }
        formData.append("type",2);
        formData.append("Count",i);
        try{
            let result;
        switch(submitUrl){
            case "BjImp":
                result = await submitBjImp(formData);
                break;
            case "CgImp":
                formData.append("BaseDate",this.BaseDate);
                result = await submitCgImp(formData);
                break;
            case "JjImp":
                result = await submitJjImp(formData);
                break;
            case "WBInfo":
                result = await submitWBInfo(formData);
                break;
            default:
        }

        if(result.status === 0 ){
            confirm({
                icon:<CheckCircleTwoTone twoToneColor="#52c41a" />,
                title: 'Excel上传成功，请勿重复上传',
                okText: '确认',
            })
        }else{
            message.error("服务器无响应");
        }

        this.setState({
            dataSource:[],
            uploadState:2
        })
        }catch{

        }finally{
            this.setState({loadExcelUp3:false});
        }
        });
        
        
    }
    handleBack = ()=>{
        const {history} = this.props;
        history.goBack();
    }
    DtChange = (date,dateString)=>{
        this.BaseDate = dateString;
    }
    componentDidMount = ()=>{
        const {type,submitUrl} = this.props.location;
        let {columns} =  this.props.location;
        if(columns!==undefined&& columns.length!==0){
            columns = columns.filter(item=>item.dataIndex!=="operation")
        }
        if(type===undefined||type===0){
            if(columns!==undefined&& columns.length!==0){
                columns = columns.filter(item=>item.key!=='status')
                this.setState({columns})
            }
            
        }else{
            if(columns!==undefined&& columns.length!==0){
                columns = columns.filter(item=>item.key!=='status')
                this.setState({columns,type})
            }
        }
        
        
        if(submitUrl==="CgImp"){
            this.setState({isBaseDate:true});
        }
        this.BaseDate = moment().format(this.dateFormat);
    }
    render() {
        const {subTitle} = this.props.location;
        const {dataSource,loading,columns,uploadState,type,isBaseDate,loadExcelUp1,loadExcelUp2,loadExcelUp3} = this.state;
        let width;
        let height = 600;
        if(columns!==undefined){
            width = columns.length>8?2600:1400;
        }
        return (
            <div className="main">
                
                <Row>
                    <Col span={4} className="toolArea_left">
                        <LinkButton onClick={()=>this.handleBack()}>
                            <ArrowLeftOutlined/>返回 {subTitle}
                        </LinkButton>
                    </Col>
                    <Col span={19} className="toolArea">
                        {isBaseDate?<label style={{fontSize:"18px",fontWeight:600}}>历史库存基准日期：<DatePicker onChange={this.DtChange} defaultValue={moment(moment(), this.dateFormat)} showToday format={this.dateFormat} /></label>:""}
                        
                        &emsp;
                        <Upload {...this.attes}>
                            <Button icon={<UploadOutlined/>} disabled={columns===undefined?"disabled":""} >{columns===undefined?"请返回重新提交":"提交预览"}</Button>
                        </Upload>
                        &emsp;
                        {//单纯的只有上传功能
                            type===0?
                            <Button
                            disabled={uploadState===0?"disabled":
                            uploadState===1?"":"disabled"} type="primary" 
                            loading={loadExcelUp1}
                            onClick={()=>this.handleSubmit()}>
                                {uploadState===0?"请先上传文件":
                                uploadState===1?"确认提交":"上传成功,可再次上传"
                                }
                            
                            </Button>://有全新执行，追加执行的
                            type===1?
                            <>
                                <Button type="primary" 
                                disabled={uploadState===0?"disabled":uploadState===1?"":"disabled"}
                                loading={loadExcelUp2}
                                onClick={()=>this.handleSubmit1()}
                                >
                                    全新执行
                                </Button>
                                &emsp;
                                <Button type="primary" 
                                disabled={uploadState===0?"disabled":uploadState===1?"":"disabled"}
                                loading={loadExcelUp3}
                                onClick={()=>this.handleSubmit2()}
                                >
                                    追加执行
                                </Button>
                            </>
                            
                            :""
                        }
                        
                    </Col>
                </Row>
                <Table
                    dataSource={dataSource}
                    bordered
                    rowKey="key"
                    sticky={true}
                    scroll={{ x: width,y:height}} 
                    columns={columns}
                    size="middle"
                    loading={loading}
                    pagination={false}
                >

                </Table>
            </div>
        )
    }
}
