import React, { Component } from 'react'
import { Table, Button, Modal, Form, Input,message} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
//引入自定义组件
// import AdvancedSearchForm from '../../components/AdvancedSearchForm'
//引入工具
import {getPageRoles,isOpt,ConvertFomrData,downloadDemoFile} from '../../utils'
//引入API 
import {addBjInfo,delBjInfo,editBjInfo,getBjImp} from '../../api'
//配置 
import { BjImp_columns } from '../../config/table-columns'
// import { BjInfoFielsds } from '../../config/form-Fields'
//模拟数据
//import { BjInfo } from '../../anaData'
const { confirm } = Modal;

export default class Service2 extends Component {
    formRef = React.createRef();
    Roles = [];//用户在这个界面的权限
    state = { 
        dataSource: [],
        BjImp_columns:[],
        dataTotal: 0,
        loading: true,
        isModalEditShow: false,//控制编辑对话框的显示
        ModalTitle:'',
        Fuc_Add:false,
        Fuc_Exel:false,
        Fuc_Submit:false,
    }
    //搜索数据
    SearchData = async (formData) => {
        if(formData===undefined){
            formData = new FormData();
        }else{
            formData = ConvertFomrData(formData);
        }
        this.setState({loading:true})
        const result = await getBjImp(formData);
        if(result.status===0){
            const {BjImp} = result.data;
            this.setState({ dataSource: BjImp,loading:false,BjImp_columns:BjImp_columns})
        }else{
            message.error("服务器无响应");
        }
        
    }
    componentDidMount = async () => {
        let {Fuc_Add,Fuc_Exel,Fuc_Submit} = this.state;
        this.SearchData();
        const {pathname} = this.props.location;
        this.Roles = await getPageRoles(pathname);
        // BjInfo_columns.push(
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
        if(isOpt(this.Roles,"新建")){
            Fuc_Add = true;
        }
        if(isOpt(this.Roles,"Excel导入")){
            Fuc_Exel = true;
        }
        //执行提交
        if(isOpt(this.Roles,"执行提交")){
            Fuc_Submit = true;
        }//Fuc_ExcelOut
        this.setState({Fuc_Add,Fuc_Exel,Fuc_Submit})
    }
    componentWillUnmount = ()=>{
        //BjInfo_columns.pop();
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
                const formData = new FormData();
                formData.append("ID",record.ID);
                const result = delBjInfo(formData);
                if(result.status===0){
                    message.success("编辑成功");
                }else{
                    message.error("编辑失败");
                }

            },
            onCancel() {
            },
        })
    }
    //提交所有更新到SAP
    ModalSubmit = ()=>{
        //submitBjInfo
        confirm({
            title:'是否提交数据?',
            icon: <ExclamationCircleOutlined />,
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                //record.ID
                //const formData = new FormData();
                //const result = submitBjInfo(formData);
                // if(result.status===0){
                //     message.success("更新成功");
                // }else{
                //     message.error("更新失败失败");
                // }

            },
            onCancel() {
            },
        })
    }
    //Excel导入对话框
    ModalExcel = () => {
        const { history } = this.props;
        //对应的url需要填写
        history.push({pathname:"/Admin/Upload/ExcelUp",columns:BjImp_columns,type:1,submitUrl:"BjImp",subTitle:"钣金需求分解"});
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
        const json = form.getFieldsValue(true);
        const formData = ConvertFomrData(json); 
        const {ModalTitle} = this.state;
        if(ModalTitle==='编辑'){
            //发送编辑的请求 ID已经
            const result = editBjInfo(formData);
            if(result.status===0){
                message.success("编辑成功");
            }else{
                message.error("编辑失败");
            }
        }else if(ModalTitle==='新建'){
            //发送新建的请求
            const result = addBjInfo(formData);
            if(result.status===0){
                message.success("添加成功");
            }else{
                message.error("添加失败");
            }
        }
        this.setState({ isModalEditShow: false })
    }
    //点击编辑/新建 对话框 取消
    ModalEditCancel = () => {
        this.setState({ isModalEditShow: false })
    }
    ModalExcelOut = ()=>{
        //const {dataSource} = this.state;
        //let obj = [];
        //const range = XLSX.utils.decode_range(dataSource);
    }
    DownLoadDemo = ()=>{
        downloadDemoFile("钣金需求分解模板.xls");
    }
    //downloadDemoFile("机加需求分解模板.xlsx");
    render() {
        const { dataSource, loading, isModalEditShow,ModalTitle,Fuc_Add,Fuc_Exel} = this.state;
        return (
            <div className="main">
                <div className="toolArea">
                    {Fuc_Add?
                    <Button type="primary" onClick={()=>this.ModalAdd()}>新建</Button>:""
                    }
                    &emsp;
                    {Fuc_Exel?
                    <Button type="primary" onClick={() => this.ModalExcel()}>Excel导入</Button>:""
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
                columns={BjImp_columns}
                size="middle"
                loading={loading}
                pagination={false}
                > 
                </Table>
                <Modal title={ModalTitle} visible={isModalEditShow} onOk={() => this.ModalEditOk()} onCancel={() => this.ModalEditCancel()} >
                    <Form ref={this.formRef} >
                        <Form.Item
                            name="FirstCode"
                            label="一层编码"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入一层编码'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="FirstName"
                            label="一层名称"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入一层名称'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="SecondCode"
                            label="二层编码"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入二层编码'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="SecondName"
                            label="二层名称"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入二层名称'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="ThirdCode"
                            label="三层编码"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入三层编码'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="ThirdName"
                            label="三层名称"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入三层名称'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="FourthCode"
                            label="四层编码"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入四层编码'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="FourthName"
                            label="四层名称"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入四层名称'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="FifthCode"
                            label="五层编码"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入五层编码'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="FifthName"
                            label="五层名称"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入五层名称'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="Prooerty"
                            label="属性"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入属性'
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="Menge"
                            label="需求数量"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入需求数量'
                                },
                            ]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
