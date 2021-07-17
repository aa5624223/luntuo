import React, { Component } from 'react'
import {Form,Input,Button, message} from 'antd'
import {Redirect,withRouter} from 'react-router-dom'

import { reqLogin } from '../../api'

import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

import './index.css'
class Mobile_Login extends Component {
    formRef = React.createRef(); 
    state = {
    }
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
            message.success("登录成功")
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
            //转到主页
            this.props.history.replace('/Mobile_Admin');
        }else if(result.status===1){
            message.warn("账号密码错误");
        }else{
            message.error("服务器无响应");
        }
        

    }
    render() {
        const user = storageUtils.getUser();
        //storageUtils.removeUser();
        //console.log(user.ID);
        var {redict} = this.props.location;
        if(user && user.ID){
            if(redict!==true){
                memoryUtils.user = user;//将当前登录用户保存到内存中
                return <Redirect to='/Mobile_Admin' />
            }
        }
        return (
            <div className="container">
                <div className="wrapper">
                    <div className="left-top-sign">常发农装</div>
                    <div className="welcome">轮拖排产系统</div>
                    <div className="InputArea">
                        <Form
                            ref={this.formRef}
                            layout="vertical"
                            onSubmitCapture={this.handleSubmit}
                        >
                            <Form.Item label="账号" name="username" 
                                rules={[
                                    {required:true,message:'请输入用户名'},
                                    {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是数字、字母、下划线、' },
                                    {whitespace:true,message:'账号不能为空格'}
                                ]} 
                            >
                                <Input placeholder="账号"></Input>
                            </Form.Item>
                            <Form.Item label="密码" name="password"
                                rules={[
                                    {required:true,message:'请输入密码'},
                                    {pattern:/^[a-zA-Z0-9_@]+$/,message:'密码名必须是数字、字母、下划线、@符号' },
                                    {whitespace:true,message:'密码不能为空格'}
                                ]}
                            >
                                <Input type="password" placeholder="密码"></Input>
                            </Form.Item>
                            <Button type="primary" shape="round" className="loginBtn" htmlType="submit">登录</Button>
                        </Form>
                    </div>
                    
                </div>
            </div>
            
        )
    }
}
export default withRouter(Mobile_Login);