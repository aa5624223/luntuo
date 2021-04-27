import React, { Component } from 'react'
import { Table, Button, Modal, Form, Input,message} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
//引入自定义组件
// import AdvancedSearchForm from '../../components/AdvancedSearchForm'
//引入工具
import {getPageRoles,isOpt,ConvertFomrData,downloadDemoFile} from '../../utils'
//引入API
import {getJjImp} from '../../api'

//配置 
import { JiImp_columns} from '../../config/table-columns'
//import {SERVER_ADDRESS_FILEPATH} from '../../utils/StaticSet'
// import { JjInfoFielsds } from '../../config/form-Fields'
//模拟数据 
//import { JjInfo } from '../../anaData'
const { confirm } = Modal;

export default class Service3 extends Component {
    formRef = React.createRef()
    state = {  
        dataSource: [],
        JiImp_columns:[],
        dataTotal: 0,
        loading: true, 
        isModalEditShow: false,//控制编辑对话框的显示
        ModalTitle:'' ,
        Fuc_Exel:false
    }
    //搜索数据
    SearchData = async (formData) => {
        if(formData===undefined){
            formData = new FormData();
        }else{
            formData = ConvertFomrData(formData);
        }
        this.setState({loading:true})
        const result = await getJjImp(formData);
        if(result.status===0){
            const {JjImp} = result.data;
            this.setState({ dataSource: JjImp,loading:false,JiImp_columns:JiImp_columns})
        }else{
            message.error("服务器无响应");
        }
    }
    componentDidMount = async () => {
        let {Fuc_Exel} = this.state;
        this.SearchData();
        const {pathname} = this.props.location;
        this.Roles = await getPageRoles(pathname);
        // JjInfo_columns.push(
        //     {
        //         title: '操作',
        //         width: 50,
        //         fixed: 'right',
        //         dataIndex: 'operation',
        //         render: (_, record) => {
        //             return (
        //                 <div style={{textAlign:'center'}}>
        //                     <Button size="small" type="primary" onClick={()=>this.ModalDel(record)} danger>删除</Button>&emsp;
        //                     <Button size="small" type="primary" onClick={() => this.ModalEdit(record)} >编辑</Button>
        //                 </div>
        //             )
        //         }
        //     }
        // )
        if(isOpt(this.Roles,"Excel导入")){
            Fuc_Exel = true;
        }
        this.setState({Fuc_Exel})
    }
    componentWillUnmount = ()=>{
        //JiImp_columns.pop();
    }
    //编辑按钮 显示编辑对话框
    ModalEdit = (record) => { 
        this.setState({ isModalEditShow: true,ModalTitle:'编辑'},()=>{
            this.formRef.current.setFieldsValue(record)
        })
    }
    //新建按钮 显示新建对话框
    ModalAdd = ()=>{
        this.setState({ isModalEditShow: true,ModalTitle:'新建'},()=>{
            this.formRef.current.resetFields()
        })
    }
     //删除按钮
     ModalDel = (record)=>{
        confirm({
            title:'是否删除数据?',
            icon: <ExclamationCircleOutlined />,
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                //record.ID
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    }
    //Excel导入对话框
    ModalExcel = () => {
        const { history } = this.props;
        //对应的url需要填写
        history.push({pathname:"/Admin/Upload/ExcelUp",columns:JiImp_columns,type:1,submitUrl:"JjImp",subTitle:"机加需求分解"});
    }
    //点击 编辑/新建 对话框OK
    ModalEditOk = async () => {
        const form = this.formRef.current;
        try {
            await form.validateFields();
        } catch (errorInfo) {
            message.warn('请检查数据的正确性')
            return;
        }
        //获取数据发送给服务端
        //const {WerksID,TypeID,MRP,ID} = form.getFieldsValue(true);
        const {ModalTitle} = this.state;
        if(ModalTitle==='编辑'){
            //发送编辑的请求 ID已经
            console.dir(form.getFieldsValue(true));
        }else if(ModalTitle==='新建'){
            //发送新建的请求
            console.dir(form.getFieldsValue(true));
        }
        this.setState({ isModalEditShow: false })
    }
    //点击编辑/新建 对话框 取消
    ModalEditCancel = () => {
        this.setState({ isModalEditShow: false })
    }
    DownLoadDemo = ()=>{
        downloadDemoFile("机加需求分解模板.xls");
    }
    render() {
        const { dataSource, loading, isModalEditShow,ModalTitle,Fuc_Exel} = this.state;
        return (
            <div className="main">
                <div className="toolArea">
                    {
                        Fuc_Exel?<Button type="primary" onClick={() => this.ModalExcel()}>Excel导入</Button>:""
                    }
                    &emsp;
                    <Button type="primary" onClick={()=>this.DownLoadDemo()} >模板下载</Button>
                </div>
                <Table
                dataSource={dataSource}
                bordered
                rowKey="ID"
                sticky={true}
                //scroll={{ x: 2600}} 
                columns={JiImp_columns}
                size="middle"
                loading={loading}
                pagination={false}
                >
                </Table>
                <Modal title={ModalTitle} visible={isModalEditShow} onOk={() => this.ModalEditOk()} onCancel={() => this.ModalEditCancel()} >
                    <Form ref={this.formRef} >
                        <Form.Item
                            name="Series"
                            label="系列"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入系列'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="Matnr"
                            label="子键物料号"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入子键物料号'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="Menge"
                            label="数量"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入数量'
                                },
                            ]}
                        >
                            <Input type="number"/>
                        </Form.Item>
                        <Form.Item
                            name="Group"
                            label="班组"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入班组'
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
