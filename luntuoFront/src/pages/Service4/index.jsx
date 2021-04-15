import React, { Component } from 'react'
import moment from 'moment';
import { Table, Button, Modal, Form, Input,message,DatePicker} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
//引入自定义组件
// import AdvancedSearchForm from '../../components/AdvancedSearchForm'
//引入工具
import {getPageRoles,isOpt,ConvertFomrData,downloadDemoFile} from '../../utils'
//引入API
import {getCgImp} from '../../api'
//配置 
import { CgImp_columns} from '../../config/table-columns'
// import { CgInfoFielsds } from '../../config/form-Fields'
//模拟数据
//import { CgInfo } from '../../anaData'
const { confirm } = Modal;
export default class Service4 extends Component {
    formRef = React.createRef()
    state = {
        dataSource: [],
        dataTotal: 0,
        loading: true,
        isModalEditShow: false,//控制编辑对话框的显示
        ModalTitle:'',
        CgImp_columns:[],
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
        const result = await getCgImp(formData);
        if(result.status===0){
            const {CgImp} = result.data;
            this.setState({ dataSource: CgImp,loading:false,CgImp_columns:CgImp_columns})
        }else{
            message.error("服务器无响应");
        }
    }
    componentDidMount = async () => {
        let {Fuc_Exel} = this.state;
        this.SearchData();
        const {pathname} = this.props.location;
        this.Roles = await getPageRoles(pathname);
        // CgInfo_columns.push(
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
        //CgImp_columns.pop();
    }
    //编辑按钮 显示编辑对话框
    ModalEdit = (record) => { 
        this.setState({ isModalEditShow: true,ModalTitle:'编辑'},()=>{
            record.Budat = moment(record.Budat,'YYYY-MM-DD');
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
        history.push({pathname:"/Admin/Upload/ExcelUp",columns:CgImp_columns,type:1,submitUrl:"CgImp",subTitle:"采购需求分解"});
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
        downloadDemoFile("采购需求分解模板.xlsx");
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
                columns={CgImp_columns}
                size="middle"
                loading={loading}
                pagination={false}
                >
                </Table>
                <Modal title={ModalTitle} visible={isModalEditShow} onOk={() => this.ModalEditOk()} onCancel={() => this.ModalEditCancel()} >
                    <Form ref={this.formRef}>
                        <Form.Item
                            name="Maktx"
                            label="物料编码"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入物料编码'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="Matnr"
                            label="物料描述"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入Matnr'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="Budat"
                            label="需求日期"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入需求日期'
                                },
                            ]}
                        >
                            <DatePicker
                                format="YYYY-MM-DD"
                            />
                        </Form.Item>
                        <Form.Item
                            name="MRP"
                            label="MRP控制者"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入MRP控制者'
                                },
                            ]}
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            name="Meins"
                            label="单位"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入单位'
                                },
                            ]}
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            name="Lifnr"
                            label="供应商代码"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入供应商代码'
                                },
                            ]}
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            name="Name1"
                            label="供应商名称"
                            rules={[
                                {
                                    required: true,
                                    message:'请输入供应商名称'
                                },
                            ]}
                        >
                            <Input></Input>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

        )
    }
}
