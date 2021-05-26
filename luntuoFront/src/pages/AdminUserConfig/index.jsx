import React, { Component } from 'react'
import { Table, message, Col, Row, Input, Tabs, Checkbox, Button, Modal, Form } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
//自定义样式
import './index.less'
//自定义组件
//引入工具类
import memoryUtils from '../../utils/memoryUtils'
import {depTree,OrderTree} from '../../utils'
//获取配置
import { UserConfig_columns } from '../../config/table-columns'
//获取API
import { getUserList, addUser, editUser, delUser,getSite_Roles} from '../../api'
//全局参数
//全局变量
const { Search } = Input;
const { TabPane } = Tabs;
const { confirm } = Modal;
/*
    用户管理
*/
export default class AdminUserConfig extends Component {
    load_Add = false;
    formRef = React.createRef()
    state = {
        dataSource: [],
        dataTotal: 0,
        selectedRowKeys: [],
        CopyRowKeys:[],
        myTabs: [],
        loading: false,
        checkList: [],
        isModalEditShow: false,
        UserConfig_columns:[],
        ModalTitle: '',
        //给按钮添加loading 效果防止重复提交
        load_Edit:false
    }
    dataSource = []
    //数据查询的表单
    RefFormData = {}
    //数据查询
    SearchData = async (FormData) => {
        this.setState({ loading: true });
        const result = await getUserList();
        if (result.status === 0) {
            if (result.data == null) {
                message.warn("没有查到用户数据");
                return;
            }
            this.dataSource = result.data.UserInfo;
            const NewData = this.dataSource.slice(0, 9999);
            this.setState({
                dataSource: NewData,
                dataTotal: 1000,
                loading: false
            });
            // if (FormData.pageMode === undefined || FormData.pageMode === false) {
            //     message.success("查询成功");
            // }
        } else {
            message.warn("没有查到用户数据");
        }
        //FormData.page
        //FormData.pageSize
    }
    //表格选择配置
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    }
    //表格行配置
    onRow = record => {
        return {
            onClick: event => {// 点击行事件 获取当前需要修改的keys
                //Roles
                let checkList = record.Roles.split(',');
                this.setState({ selectedRowKeys: [record.ID], checkList });
            },
        }
    }
    //查询数据
    onSearch = value => {
        const list = this.dataSource.filter(item => {
            return item.UserName.indexOf(value) >= 0
        })
        this.setState({
            dataSource: list,
            dataTotal: 1000
        });
    }
    //复选框 选择
    CheckOnchange = (event) => {
        const { checkList } = this.state;
        let oldCheckList;
        const val = event.target.valueProp;
        if (event.target.checked) {
            checkList.push(val+"");
            console.dir(checkList);
            this.setState({ checkList });
        } else {
            oldCheckList = checkList.filter(item => item*1 !== val)
            console.dir(oldCheckList);
            this.setState({ checkList: oldCheckList })
        }
        
    }
    //更改权限
    submitChange = async () => {
        //this.state.checkList 更改的list
        //selectedRowKeys 更改的id
        const { selectedRowKeys, checkList } = this.state;
        if (selectedRowKeys[0] === undefined || selectedRowKeys[0] === 0 || selectedRowKeys[0] === "") {
            message.warn("请先选择用户");
            return;
        }
        var List = checkList.join(',');
        if (List.length !== 0 && List[0]===',') {
            List = List.substr(1);
        }
        //接下来提交数据
        var formData = new FormData();
        formData.append("ID", selectedRowKeys[0]);
        formData.append("Roles", List);
        this.setState({load_Edit:true})
        const result = await editUser(formData)
        if (result.status === 0) {
            message.success("更改权限成功");
            this.SearchData();//重新查询数据
            this.setState({load_Edit:false})
        }
    }
    //编辑用户
    ModalEdit = (record,event) => {
        event.stopPropagation();
        this.setState({ isModalEditShow: true, ModalTitle: '编辑用户' }, () => {
            this.formRef.current.setFieldsValue(record)
        })
    }
    //添加用户
    ModalAdd = () => {
        this.setState({ isModalEditShow: true, ModalTitle: '新建用户' }, () => {
            this.formRef.current.resetFields()
        })
    }
    //删除用户
    ModalDel = (record,event) => {
        event.stopPropagation();
        confirm({
            title: '是否删除数据?',
            icon: <ExclamationCircleOutlined />,
            okText: '是',
            okType: 'danger',
            cancelText: '否',
             onOk: async ()=> {
                let formData = new FormData();
                formData.append("ID", record.ID);
                const result = await delUser(formData)
                if (result.status === 0) {
                    message.success("删除成功");
                    this.SearchData();//重新查询数据
                }
            },
            onCancel() {
            },
        })
    }
    ModalEditOk = async () => {
        if(this.load_Add){
            message.warn('请勿重复提交!');
            return;
        }
        const form = this.formRef.current;
        try {
            await form.validateFields();
        } catch (errorInfo) {
            message.warn('请检查数据的正确性')
            return;
        }
        const { ModalTitle } = this.state;
        this.load_Add = true;
        try{
            if (ModalTitle === '编辑用户') {
                let data = form.getFieldsValue(true)
                let formData = new FormData();
                formData.append("ID", data.ID);
                formData.append("PWD", data.PWD);
                formData.append("UserCode", data.UserCode);
                formData.append("UserName", data.UserName);
                
                const result = await editUser(formData)
                if (result.status === 0) {
                    message.success("编辑用户成功");
                    this.SearchData();//重新查询数据
                }
            } else {//新建用户
                let data = form.getFieldsValue(true)
                let formData = new FormData();
                formData.append("PWD", data.PWD);
                formData.append("UserCode", data.UserCode);
                formData.append("UserName", data.UserName);
                const result = await addUser(formData)
                if (result.status === 0) {
                    message.success("添加用户成功");
                    this.SearchData();//重新查询数据
                }else{
                    message.error("用户编号重复");
                }
            }
            this.setState({ isModalEditShow: false })
        }catch(_e){
        }finally{
            this.load_Add = false;
        }
        
    }
    ModalEditCancel = () => {
        this.setState({ isModalEditShow: false })
    }

    //获取标签
    getTabs = () => {
        const { myTabs, checkList } = this.state;
        if (myTabs!==undefined && myTabs.length > 0) {
            return (
                <Tabs defaultActiveKey="1">
                    {
                        myTabs.map(item => {
                            return (
                                <TabPane tab={item.title} key={item.key}>
                                    {
                                        item.children.map(item2 => {
                                            if (item2.isAuth) {
                                                let checked1;
                                                if (checkList.length > 0) {
                                                    checked1 = checkList.find(it =>{
                                                        return it*1=== item2.id;
                                                    } );
                                                }
                                                return (
                                                    <div key={item2.key + "_div"}>
                                                        <h2>
                                                            <Checkbox checked={checked1 !== undefined} style={{ fontWeight: 600 }} onChange={(e) => this.CheckOnchange(e)} valueProp={item2.id}> {item2.title}</Checkbox>
                                                        </h2>
                                                        &emsp;&emsp;
                                                        {
                                                            item2.children === undefined ?
                                                                "" :
                                                                item2.children.map(item3 => {
                                                                    let checked2;
                                                                    if (checkList.length > 0) {
                                                                        checked2 = checkList.find(it => it*1 === item3.id);
                                                                    }
                                                                    if (item3.isAuth) {
                                                                        return <Checkbox checked={checked2 !== undefined} key={item3.key + "_checkBox"} onChange={(e) => this.CheckOnchange(e)} valueProp={item3.id}>{item3.title}</Checkbox>
                                                                    } else {
                                                                        return ""
                                                                    }
                                                                })
                                                        }
                                                    </div>
                                                )
                                            } else {
                                                return "";
                                            }

                                        })
                                    }
                                </TabPane>
                            )
                        })
                    }
                </Tabs>
            )
        }
    }
    componentDidMount = async () => {
        //获取标签
        let formData = new FormData();
        let myTabs;
        const user = memoryUtils.user;
        formData.append('AuthConfig',user.Roles);
        const result = await getSite_Roles(formData);
        if(result.status===0){
            const {Site_Roles} = result.data;
            let menuList = depTree(Site_Roles,0);
            menuList = OrderTree(menuList);
            myTabs = menuList.filter(item => {
                if (item.isAuth) {
                    return true;
                } else {
                    return false;
                }
            });
        }else{
            message.error("服务器无响应");
        }
        
        this.SearchData({
            pageMode: true,
        });
        this.setState({
            myTabs,
            UserConfig_columns:UserConfig_columns
        })
    }
    //复制权限
    ModalCopy = (record,event)=>{
        event.stopPropagation();
        this.setState({CopyRowKeys:record.Roles.split(',')})
        message.success("权限已复制");
    }
    ModalPaste = (record,event)=>{
        event.stopPropagation();
        const {CopyRowKeys} = this.state;
        console.dir(record.ID);
        this.setState({checkList:CopyRowKeys,CopyRowKeys:[],selectedRowKeys: [record.ID]})
        message.success("权限已粘贴");
    }
    componentWillUnmount = () => {
        UserConfig_columns.pop();
    }
    render() {
        const { dataSource, selectedRowKeys, loading, ModalTitle, isModalEditShow,load_Edit} = this.state;
        const rowSelection = {
            columnWidth:"16px",
            checkStrictly: true,
            type: "radio",
            fixed: true,
            selectedRowKeys: selectedRowKeys,
            onChange: this.onSelectChange,
        }
        //插入操作
        if(UserConfig_columns.length>=3){
            UserConfig_columns.pop();
        }
        UserConfig_columns.push(
            {
                title: '操作',
                width: 90,
                fixed: 'right',
                dataIndex: 'operation',
                render: (_, record) => {
                    return (
                        <div style={{ textAlign: 'center' }}>
                            {this.state.CopyRowKeys.length===0?<Button type="dashed" size="small" onClick={(event)=>this.ModalCopy(record,event)} >复制权限</Button>:<Button type="default" onClick={(event)=>this.ModalPaste(record,event)} size="small">粘贴权限</Button>}&nbsp;
                            <Button size="small" type="primary" onClick={(event) => this.ModalDel(record,event)} danger>删除</Button>&nbsp;
                            <Button size="small" type="primary" onClick={(event) => this.ModalEdit(record,event)} >编辑</Button>
                        </div>
                    )
                }
            }
        )

        //UserConfigFielsds
        return (
            <Row className="Content-main">
                <Col span={1}></Col>
                <Col span={10} className="left_content">
                    <Row style={{ marginBottom: "10px" }}>
                        <Col span={12}>
                            <Search placeholder="输入用户名搜索" enterButton onSearch={this.onSearch} />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={11}>
                            <Button type="primary" onClick={() => this.submitChange()} loading={load_Edit}>提交更改</Button>
                            &emsp;
                            <Button type="primary" onClick={() => this.ModalAdd()}>添加</Button>
                        </Col>
                    </Row>

                    <Table
                        className="TabUserConfig"
                        dataSource={dataSource}
                        bordered
                        rowKey="ID"
                        sticky={true}   
                        columns={this.state.UserConfig_columns}
                        scroll={{ y: 600}}
                        size="small"
                        loading={loading}
                        pagination={false}
                        rowSelection={rowSelection}
                        onRow={this.onRow}
                    >
                    </Table>
                </Col>
                <Col span={1}></Col>
                <Col span={12}>
                    {this.getTabs()}
                </Col>
                <Modal title={ModalTitle} visible={isModalEditShow} onOk={() => this.ModalEditOk()} onCancel={() => this.ModalEditCancel()} >
                    <Form ref={this.formRef} >
                        <Form.Item
                            name="UserCode"
                            label="用户编号"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户编号'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="UserName"
                            label="用户名称"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名称'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="PWD"
                            label="用户密码"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户密码'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </Row>
        )
    }
}
