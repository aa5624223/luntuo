import React, { Component} from 'react'
import { Link,withRouter } from 'react-router-dom'
import { Input, Menu,Modal,Form, message} from 'antd'
//从配置文件读取侧边栏
//import menuList from '../../config/left-menu-list'
import logo from '../../assets/images/999.png'
//引入工具
import { ConvertFomrData } from '../../utils'
//引入API
import { editUser} from '../../api'

//
import localStore from '../../utils/storageUtils'
import './index.less'
/*
    左侧导航组件
*/
const SubMenu = Menu.SubMenu;
class LeftNav extends Component {
    formRef = React.createRef();
    state = {
        isModalEditShow:false
    }
    PawEdit = ()=>{
        const user = localStore.getUser();
        //密码修改 显示对话框 
        this.setState({isModalEditShow:true},()=>{
            this.formRef.current.setFieldsValue({ID:user.ID,PWD:'',PWDAGAIN:''})
        })
    }
    handleCheckPwd(rules,value,callback){
        let cfmPwd = this.props.form.getFieldValue('cfmloginpass');
        if(cfmPwd && cfmPwd !== value){
            callback(new Error('两次密码输入不一致'))
        }else{
 
            // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
            callback();
        }
    }
    handleCfmPwd(rules,value,callback){
        let loginpass = this.props.form.getFieldValue('loginpass');
        if(loginpass && loginpass !== value){
            callback(new Error('两次密码输入不一致'))
        }else{
            
            // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
            callback();
        }
    }
    ModalPwdEditOk = async ()=>{
        //editUser
        const form = this.formRef.current;
        try {
            const values = await form.validateFields();
            console.log(values);
        } catch (errorInfo) {
            message.warn('请检查数据的正确性')
            return;
        }
        const formData = ConvertFomrData(form.getFieldsValue(true))
        const result = await editUser(formData);
        if(result.status===0){
            message.success("修改成功");
        }else{
            message.error("服务器无响应");
        }
        this.setState({isModalEditShow:false})
    }
    ModalPwdEditCancel=()=>{
        this.setState({isModalEditShow:false})
    }
    //生成侧边栏
    getSideMenu_Map = (menuList)=>{
        const pathname = this.props.history.location.pathname;
        return menuList.reduce((pre,item)=>{
            //找到要展开的菜单栏
            let cItem = undefined;
            if(item.children!==undefined){
                cItem = item.children.find(cItem=>{
                    return (pathname.indexOf(cItem.key)===0)
                })
            }
            if(cItem){
                this.openKey = item.key;
            }
            //遍历生成侧边栏 
            if(!item.isSubMenu){
                if(item.isOpt){//调用的是函数
                    pre.push((
                        <Menu.Item onClick={()=>this[item.key]()} key={item.key}>
                            {item.title}
                        </Menu.Item>
                    ))
                }else{
                    pre.push((
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    ))
                }
                
            }else{
                pre.push((
                    <SubMenu key={item.key} title={item.title} >
                        {this.getSideMenu_Map(item.children)}
                    </SubMenu>
                ))
            }
            return pre;
        },[])
    }
    render() {
        const {isModalEditShow} = this.state;
        const {menuList} = this.props;
        const MenuList = this.getSideMenu_Map(menuList);
        const openKey = this.openKey;
        const pathname = this.props.history.location.pathname;
        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt="logo" className="logo"></img>
                    <h1>轮拖排产系统</h1>
                </Link>
                <Menu mode="inline" theme="dark" selectedKeys={[pathname]} defaultOpenKeys={[openKey]}>
                    {MenuList}
                </Menu>
                <Modal title="修改密码" visible={isModalEditShow} onOk={()=>this.ModalPwdEditOk()} onCancel={()=>this.ModalPwdEditCancel()}>
                    <Form ref={this.formRef}  >
                        <Form.Item 
                        name="PWD"
                        label="密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码'
                            }
                        ]}
                        >
                            <Input type="password"></Input>
                        </Form.Item>
                        <Form.Item 
                        name="PWDAGAIN"
                        label="再次输入密码"
                        rules={[
                            {
                                required: true,
                                message: '请再次输入密码'
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (!value || getFieldValue('PWD') === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject('两次密码输入不一致');
                                },
                              }),
                        ]}
                        >
                            <Input type="password"></Input>
                        </Form.Item>
                    </Form>

                </Modal>
            </div>
        )
    }
}
export default withRouter(LeftNav)