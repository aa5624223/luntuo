import React, { Component } from 'react'
import { Table, Button, Modal, Form, Input, Select,message} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
//自定义方法
import '../../utils'
//引入自定义组件
import AdvancedSearchForm from '../../components/AdvancedSearchForm'
//引入工具
import { getPageRoles, isOpt, ConvertFomrData } from '../../utils'
//引入API
import { getV_MRPInfo, getTypeInfo ,addMRPInfo, editMRPInfo ,delMRPInfo,delMRPInfos} from '../../api'
//模拟数据
// import { MRPInfo } from '../../anaData'
// import { FactoryList, TypeList } from '../../config/form-Fields'
//配置 
import { V_MRPInfo_columns } from '../../config/table-columns'
import { MRPFielsds } from '../../config/form-Fields'
const { Option } = Select;
const { confirm } = Modal;
export default class MRP extends Component {
    formRef = React.createRef();
    state = {
        dataSource: [],
        dataTotal: 0,
        TypeInfo:[],
        loading: true,
        isModalEditShow: false,//控制编辑对话框的显示
        ModalTitle: '',
        V_MRPInfo_columns:[],
        selectedRowKeys:[],
        Fuc_Add: false,
        Fuc_Edit: false,
        Fuc_Del: false
    }
    //搜索数据
    SearchData = async (formData) => {
        let {Fuc_Add, Fuc_Edit, Fuc_Del} = this.state;
        const { pathname } = this.props.location;
        this.Roles = await getPageRoles(pathname);
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
                V_MRPInfo_columns.push({
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
        this.setState({ loading: true });
        const result = await getV_MRPInfo(formData);
        const result2 = await getTypeInfo();
        if(result.status === 0){
            const { V_MRPInfo } = result.data;
            const { TypeInfo } = result2.data;
            this.setState({ dataSource: V_MRPInfo, TypeInfo:TypeInfo ,loading: false,V_MRPInfo_columns,Fuc_Add, Fuc_Edit, Fuc_Del})
        }else{
            message.error("服务器无响应");
            this.setState({loading: false,V_MRPInfo_columns,Fuc_Add, Fuc_Edit, Fuc_Del})
        }
    }
    componentDidMount = () => {
        this.SearchData();
    }
    componentWillUnmount = () => {
        const {Fuc_Edit,Fuc_Del} = this.state;
        if(Fuc_Edit||Fuc_Del){
            V_MRPInfo_columns.pop();
            this.setState(V_MRPInfo_columns);
        }
        
    }
    //编辑按钮 显示编辑对话框
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
    //删除按钮
    ModalDel = (record,app) => {
        confirm({
            title: '是否删除数据?',
            icon: <ExclamationCircleOutlined />,
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            async onOk() {
                const formData = new FormData();
                formData.append("ID",record.ID);
                const result = await delMRPInfo(formData);
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
                const result = await delMRPInfos(formData);
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
    //点击 编辑/新建 对话框OK
    ModalEditOk = async ()  => {
        const form = this.formRef.current;
        try {
            const values = await form.validateFields();
            console.log(values);
        } catch (errorInfo) {
            message.warn('请检查数据的正确性')
            return;
        }
        //获取数据发送给服务端
        //const {WerksID,TypeID,MRP,ID} = form.getFieldsValue(true);
        const { ModalTitle } = this.state;
        const formData = ConvertFomrData(form.getFieldsValue(true))
        if (ModalTitle === '编辑') {
            const result = await editMRPInfo(formData);
            if (result.status === 0) {
                message.success("编辑成功");
                this.SearchData();
            }else{
                message.error("服务器无响应");
            }
        } else if (ModalTitle === '新建') {
            const result = await addMRPInfo(formData);
            if (result.status === 0) {
                message.success("添加成功");
                this.SearchData();
            }else{
                message.error("服务器无响应");
            }
        }
        this.setState({ isModalEditShow: false })
    }
    //点击编辑/新建 对话框 取消
    ModalEditCancel = () => {
        this.setState({ isModalEditShow: false })
    }
    getOptions = (options) => {
        if(options.length>0){
            return options.map(item => <Option key={item.ID} value={item.ID}>{item.Name}</Option>)
        }else{
            return <Option>数据获取中</Option>
        }
        
    }
    onSelectChange = selectedRowKeys =>{
        this.setState({ selectedRowKeys });
    }
    
    render() {
        const { dataSource, loading, isModalEditShow, ModalTitle,TypeInfo,Fuc_Add,Fuc_Del,selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
          };
        if(this.state.V_MRPInfo_columns.length>3){
            this.state.V_MRPInfo_columns.pop();
        }
        return (
            <div className="main">
                <div>
                    <AdvancedSearchForm SearchData={this.SearchData} Fielsds={MRPFielsds(TypeInfo)} form={this.form} />
                </div>
                <div className="toolArea">
                    {Fuc_Add?<Button type="primary" onClick={() => this.ModalAdd()}>新建</Button>:""}
                    &emsp;
                    {Fuc_Del?<Button type="primary" danger onClick={()=>this.ModalDels(this)}>批量删除</Button>:""}
                </div>
                <Table
                    rowSelection={rowSelection}
                    dataSource={dataSource}
                    bordered
                    rowKey="ID"
                    sticky={true}
                    columns={this.state.V_MRPInfo_columns}
                    size="middle"
                    loading={loading}
                    pagination={false}
                >
                </Table>
                <Modal title={ModalTitle} visible={isModalEditShow} onOk={() => this.ModalEditOk()} onCancel={() => this.ModalEditCancel()} >
                    <Form ref={this.formRef}  >
                        <Form.Item
                            name="TypeID"
                            label="业务"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择业务'
                                },
                            ]}
                        >
                            <Select
                                showSearch
                                style={{ width: 300 }}
                                placeholder="Select a person"
                                optionFilterProp="children"
                            >
                                {this.getOptions(TypeInfo)}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="MRP"
                            label="MRP"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入MRP'
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
