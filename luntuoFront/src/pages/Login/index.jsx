import React, { Component } from 'react'
import {Form,Input,Button,message} from 'antd'
import {Redirect,withRouter} from 'react-router-dom'

import {UserOutlined,LockOutlined} from '@ant-design/icons'
import './login.less'
import logo from '../../assets/images/999.png'
import Layout from 'antd/lib/layout/layout';
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
const Item = Form.Item;
// const layout={
//     wrapperCol: {
//         offset:0,
//         span: 23 
//     },
// }
// const btnLayout={
//     wrapperCol: {
//         offset: 0,
//         span: 23,
//     },
// }
class Login extends Component {
    formRef = React.createRef();
    handleSubmit = async (event)=>{
        event.preventDefault();
        const form = this.formRef.current;
        const {username,password} = form.getFieldsValue(true);
        //redict
        var formData = new FormData();
        formData.append("username",username);
        formData.append("password",password);
        const error = form.getFieldsError();
        if(error.find(item=>item.errors.length>0)){
            return;
        }
        //{status:0,data:user}
        const result = await reqLogin(formData);
        if(result.status===0){//登录成功
            if(result.data==null || result.data.UserInfo.length===0){
                message.warn("账号或密码错误");
                return;
            }
            if(result.data.UserInfo[0].Roles==='NULL' ||result.data.UserInfo[0].Roles===undefined||result.data.UserInfo[0].Roles===""){
                message.warn("账号还没有设置权限");
                return;
            }
            message.success("登录成功");
            //保存user
            var user;
            for(var key in result.data){
                var temp = result.data[key][0];
                if(typeof(temp) === "object"){
                    user = result.data[key][0];
                    break;
                }
            }
            //const user = result.data.G_UserM[0];
            //user.Roles = user.Roles.replaceAll('#','');
            memoryUtils.user = user;//将当前登录用户保存到内存中
            //保存到本地
            storageUtils.saveUser(user);
            
            this.props.history.replace('/Page/MainPage');
        }else if(result.status===1){//没有找到账号密码
            message.error("账号密码错误");
        }else{
            message.error("登录失败");
        }
    }
    render() {
        console.log("Login");
        const user = storageUtils.getUser();
        //storageUtils.removeUser();
        //console.log(user.ID);
        var {redict} = this.props.location;
        if(user && user.ID){
            if(redict!==true){
                memoryUtils.user = user;//将当前登录用户保存到内存中
                return <Redirect to='/Admin' />
            }
            
        }
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo" className="Loginlogo"></img>
                    <h1>常发轮拖排产系统</h1>
                </div>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form {...Layout} ref={this.formRef} onSubmitCapture={this.handleSubmit}>
                        <Item name="username" rules={[
                            {required:true,message:'请输入用户名'},
                            {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是数字、字母、下划线、' },
                            {whitespace:true,message:'账号不能为空格'}
                        ]} >
                            <Input placeholder="账号" prefix={<UserOutlined style={{color:'rgba(0,0,0,0.25)'}}></UserOutlined>} />
                        </Item>
                        <Item name="password" rules={[
                            {required:true,message:'请输入密码'},
                            {pattern:/^[a-zA-Z0-9_@]+$/,message:'密码名必须是数字、字母、下划线、@符号' },
                            {whitespace:true,message:'密码不能为空格'}
                        ]} >
                            <Input.Password placeholder="密码" prefix={<LockOutlined style={{color:'rgba(0,0,0,0.25)'}} />} />
                        </Item>
                        <Item>
                            <Button className="login-button" type="primary" htmlType="submit">登录</Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}

export default withRouter(Login);