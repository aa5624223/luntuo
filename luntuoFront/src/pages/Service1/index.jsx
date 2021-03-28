import React, { Component } from 'react'
import { Upload, Button,message,Table,Tooltip,Modal} from 'antd';
import { UploadOutlined,FolderOpenOutlined,DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
//引入API
import { getUploadInfo,delUploadInfo} from '../../api'
//引入工具
import {ConvertFomrData,downloadUpFile} from '../../utils'
//配置 
import { UploadInfo_columns } from '../../config/table-columns'

const { confirm } = Modal;

export default class Service1 extends Component {
    BASE = window.location.origin;
    state = {
        dataSource:[],
        UploadInfo_columns:UploadInfo_columns,
        loading:true,
    }
    uploadSer = {
        //默认是POST
        name: 'file',
        showUploadList:false,
        action: this.BASE+"/Home/uploadfile",
        headers: {
            authorization: 'authorization-text',
        },
        data:{
            time:this.getTime()
        },
        beforeUpload:()=>{
            this.setState({loading:true});
        },
        onChange:({ file, fileList })=>{
            if(file.status===undefined){//上传前
            }else if(file.status==="uploading"){//上传中

            }else if(file.status==="done"){//上传失败
                this.setState({loading:false});
                this.SearchData();
                message.success("上传成功");
            }else if(file.status==="error"){//上传失败
                this.setState({loading:false});
                message.error("上传失败");
            }
        }
    }
    
    SearchData = async (formData)=>{
        
        if(formData===undefined){
            formData = new FormData();
        }else{
            formData = ConvertFomrData(formData);
        }
        UploadInfo_columns.push({
            title: '操作',
                    width: 25,
                    fixed: 'right',
                    dataIndex: 'operation',
                    render: (_, record) => {
                        return (
                            <div style={{ textAlign: 'center' }}>
                                <Tooltip placement="top" color="red" title="删除" >
                                    <Button size="small" icon={<DeleteOutlined />} onClick={() => this.ModalDel(record,this)}></Button>
                                </Tooltip>
                                
                                &emsp;
                                <Tooltip placement="top" title="打开" >
                                    <Button size="small" icon={<FolderOpenOutlined />} onClick={() => this.ModalOpen(record)} ></Button>
                                </Tooltip>
                            </div>
                        )
                    }
        })

        this.setState({loading:true})
        const result = await getUploadInfo(formData);
        if(result.status===0){
            const {UploadInfo} = result.data;
            this.setState({ dataSource: UploadInfo,loading:false})
        }else{
            message.error("服务器无响应");
            this.setState({loading:false})
        }
    }
    ModalDel = (record,app)=>{
        //FileName
        confirm({
            title: '是否删除数据?',
            icon: <ExclamationCircleOutlined />,
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            async onOk() {
                const formData = new FormData();
                formData.append("ID",record.ID);
                formData.append("Path",record.Path);
                const result = await delUploadInfo(formData);
                if(result.status===0){
                    message.success("删除成功");
                    Modal.destroyAll();
                    app.SearchData();
                }else{
                    message.error("服务器无响应");
                    Modal.destroyAll();
                }
            },
            onCancel() {
                //console.log('Cancel');
            },
        })
    }
    ModalOpen = (record)=>{
        downloadUpFile(record.FileName);
    }
    componentDidMount=()=>{
        this.SearchData();
    }
    componentWillUnmount=()=>{
        UploadInfo_columns.pop();
        this.setState({UploadInfo_columns});
    }
    getTime() {
        const today = new Date();
        const Year = today.getFullYear();
        const Month = (today.getMonth() + 1);
        const Day = today.getDate();
        const Hour = today.getHours();
        const Minu = today.getMinutes();
        const Second = today.getSeconds();
        const date = Year + "-" + this.fixed(Month) +"-"+ this.fixed(Day) + " " + this.fixed(Hour) +":"+this.fixed(Minu)+":"+this.fixed(Second)
        return date;
    }
    fixed(num) {
        return num>9?num:"0"+num
    }
    render() {
        const {dataSource,loading,UploadInfo_columns} = this.state;
        return (
            <div  className="main">
                <div  className="toolArea">
                    <Upload {...this.uploadSer}>
                        <Button icon={<UploadOutlined />}>调度单发布</Button>
                    </Upload>
                </div>
                <Table
                dataSource={dataSource}
                bordered
                rowKey="ID"
                sticky={true}
                //scroll={{ x: 2600}} 
                columns={UploadInfo_columns}
                size="middle"
                loading={loading}
                pagination={false}
                > 
                </Table>
            </div>
        )
    }
}
