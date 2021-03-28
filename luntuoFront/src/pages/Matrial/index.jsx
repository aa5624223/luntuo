import React, { Component } from 'react'
import { Table, Button, Modal, Form, Input, Select, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
//引入样式
import './index.less'
//引入自定义组件
import AdvancedSearchForm from '../../components/AdvancedSearchForm'
//引入工具
import { getPageRoles, isOpt, ConvertFomrData,downloadDemoFile} from '../../utils'
//引入API
import { getWBInfo, editWBInfo, addWBInfo ,delWBInfo,delWBInfos} from '../../api'
//引入模拟数据
//import { WBInfo } from '../../anaData'
//引入配置
import { WBInfo_columns } from '../../config/table-columns'
import { WBInfoFielsds } from '../../config/form-Fields'

const { Option } = Select;
const { confirm } = Modal;
export default class Matrial extends Component {
    formRef = React.createRef();
    state = {
        dataSource: [],
        dataTotal: 0,
        loading: true,
        isModalEditShow: false,//控制编辑对话框的显示
        isModalDelShow:false,
        ModalTitle: '',
        WBInfo_columns: [],
        selectedRowKeys:[],
        Fuc_Exel: false,
        Fuc_Add: false,
        Fuc_Edit: false,
        Fuc_Del: false
    }
    //搜索数据
    SearchData = async (formData) => {
        let { Fuc_Exel, Fuc_Add, Fuc_Edit, Fuc_Del} = this.state;
        const { pathname } = this.props.location;
        this.Roles = await getPageRoles(pathname);
        if (isOpt(this.Roles, "Excel导入")) {
            Fuc_Exel = true;
        }
        if (isOpt(this.Roles, "新建")) {
            Fuc_Add = true;
        }
        if (isOpt(this.Roles, "编辑")) {
            Fuc_Edit = true;
        }
        if (isOpt(this.Roles, "删除")) {
            Fuc_Del = true;
        }
        if(Fuc_Edit||Fuc_Del){
            WBInfo_columns.push({
                title: '操作',
                width: 50,
                fixed: 'right',
                dataIndex: 'operation',
                render: (_, record) => {
                    return (
                        <div style={{ textAlign: 'center' }}>
                            {Fuc_Del?<Button size="small" type="primary" onClick={() => this.ModalDel(record,this)} danger>删除</Button>:""}
                            &emsp;
                            {Fuc_Edit?<Button size="small" type="primary" onClick={() => this.ModalEdit(record)} >编辑</Button>:""}
                        </div>
                    )
                }
            })
        }
        if (formData === undefined) {
            formData = new FormData();
        } else {
            formData = ConvertFomrData(formData);
        }
        this.setState({ loading: true })
        const result = await getWBInfo(formData);
        
        if (result.status === 0) {
            const { WBInfo } = result.data;
            this.setState({ dataSource: WBInfo, loading: false,WBInfo_columns,Fuc_Add, Fuc_Exel, Fuc_Edit, Fuc_Del})
        } else {
            message.error("服务器无响应");
            this.setState({loading: false,WBInfo_columns,Fuc_Add, Fuc_Exel, Fuc_Edit, Fuc_Del})
        }

    }
    layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 16,
        },
    };
    //编辑对话框
    ModalEdit = (record) => {
        this.setState({ isModalEditShow: true, ModalTitle: '编辑' }, () => {
            this.formRef.current.setFieldsValue(record)
        })
    }
    //新建按钮 显示新建对话框
    ModalAdd = () => {
        this.setState({ isModalEditShow: true, ModalTitle: '新建' }, () => {
            this.formRef.current.resetFields()
        })
    }
    //删除对话框
    ModalDel =  (record,app) => {
        confirm({
            title: '是否删除数据?',
            icon: <ExclamationCircleOutlined />,
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            async onOk() {
                //record.ID
                const formData = new FormData();
                formData.append("ID",record.ID);
                const result = await delWBInfo(formData);
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
            },
        })
    }
    ModalDels = (app)=>{
        confirm({
            title: '是否批量删除数据?',
            icon: <ExclamationCircleOutlined />,
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            async onOk() {
                const formData = new FormData();
                const IDS =app.state.selectedRowKeys.join(',');
                if(IDS===""){
                    message.warn("没有选择数据");
                    Modal.destroyAll();
                    return;
                }
                formData.append("IDS",IDS);
                const result = await delWBInfos(formData);
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

    //Excel导入对话框
    ModalExcel = () => {
        const { history } = this.props;
        //对应的url需要填写
        history.push({ pathname: "/Admin/Upload/ExcelUp", columns: WBInfo_columns, submitUrl: "WBInfo",subTitle:"物料班组对照维护"});
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
        const { ModalTitle } = this.state;
        const formData = ConvertFomrData(form.getFieldsValue(true))
        if (ModalTitle === '编辑') {
            const result = await editWBInfo(formData);
            if (result.status === 0) {
                message.success("编辑成功");
                this.SearchData();
            }else{
                message.error("服务器无响应");
            }
        } else if (ModalTitle === '新建') {
            const result = await addWBInfo(formData);
            if (result.status === 0) {
                message.success("添加成功");
                this.SearchData();
            }else{
                message.error("服务器无响应");
            }
        }
        this.setState({ isModalEditShow: false })
    }
    ModalEditCancel = () => {
        this.setState({ isModalEditShow: false })
    }
    getOptions = (options) => {
        return options().map(item => <Option key={item.value + item.text} value={item.value}>{item.text}</Option>)
    }
    onSelectChange = selectedRowKeys =>{
        this.setState({ selectedRowKeys });
    }
    //加载
    componentDidMount = async () => {
        
        this.SearchData();
        
    }
    DownLoadDemo = ()=>{
        downloadDemoFile("物料班组.xlsx");
    }
    componentWillUnmount = () => {
        const {WBInfo_columns,Fuc_Edit,Fuc_Del} = this.state;

        if(Fuc_Edit||Fuc_Del){
            WBInfo_columns.pop();
            this.setState({WBInfo_columns})
        }
    }
    render() {
        const { dataSource, loading, ModalTitle, isModalEditShow,selectedRowKeys ,Fuc_Exel, Fuc_Add,Fuc_Del,WBInfo_columns} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
          };
        while(WBInfo_columns.length>4){
            WBInfo_columns.pop();
        }
        return (
            <div className="main">
                <div>
                    <AdvancedSearchForm SearchData={this.SearchData} Fielsds={WBInfoFielsds} form={this.form} />
                </div>
                <div className="toolArea">
                    {
                        Fuc_Add ? <Button type="primary" onClick={() => this.ModalAdd()}>新建</Button> : ""
                    }
                    &emsp;
                    {
                        Fuc_Exel ? <Button type="primary" onClick={() => this.ModalExcel()}>Excel导入</Button> : ""
                    }
                    &emsp;
                    <Button type="primary" onClick={()=>this.DownLoadDemo()} >模板下载</Button>
                    &emsp;
                    {Fuc_Del?<Button type="primary" danger onClick={()=>this.ModalDels(this)}>批量删除</Button>:""}
                </div>
                <Table
                    rowSelection={rowSelection}
                    dataSource={dataSource}
                    bordered
                    rowKey="ID"
                    sticky={true}
                    columns={WBInfo_columns}
                    size="middle"
                    loading={loading}
                    pagination={false}
                >
                </Table>
                <Modal title={ModalTitle} visible={isModalEditShow} onOk={() => this.ModalEditOk()} onCancel={() => this.ModalEditCancel()} >
                    <Form ref={this.formRef}  {...this.layout} >
                        <Form.Item
                            name="Matnr"
                            label="物料编码"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入物料编码'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="Maktx"
                            label="物料名称"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入物料名称'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="Bz"
                            label="班组"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入班组'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )

    }
}
