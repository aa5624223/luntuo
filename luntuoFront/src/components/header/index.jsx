import React, { Component } from 'react'
import {Modal} from 'antd'
import {withRouter} from 'react-router-dom'
import LinkButton from '../link-button'
import MenuList from '../../config/left-menu-list'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import './index.less'
class Header extends Component {
    state = {
        cTime:'',
        UserName:'',
    }
    componentDidMount=()=>{
        // setInterval(() => {
        //     let time = getTime();
        //     this.setState({
        //         cTime:time
        //     })
        // }, 1000); 
        // getTime();
        const {UserName} = this.props;
        this.setState({UserName});
    }
    handleExit=()=>{
        Modal.confirm({
            title:'确定退出当前用户吗?',
            okText:'确定',
            cancelText:'取消',
            onOk:()=>{
                memoryUtils.user = {};
                storageUtils.removeUser();
                this.props.history.replace('Login');
            }
        })
    }
    render() {
        const {UserName} = this.state;
        const pathname = this.props.history.location.pathname;
        let TopTitle;
        MenuList.forEach((item)=>{
            if(item.key === pathname){
                TopTitle = item.title;
            }else{
                if(item.children){
                    let cItem = item.children.find((item)=>item.key===pathname)
                    if(cItem){
                        TopTitle = cItem.title;
                    }
                }
            }
        })
        ///Admin/Upload/ExcelUp
        if(pathname==="/Admin/Upload/ExcelUp"){
            TopTitle = '上传Excel'
        }
        if(pathname==="/Admin/Test/DdOrderExcel"){
            TopTitle = '导入调度单'
        }
        return (
            <div className="Header">
                <div className="Header-top">
                    <span>欢迎，{UserName}</span>
                    <LinkButton onClick={this.handleExit}>退出</LinkButton>
                </div>
                <div className="Header-btm">
                    <div className="Header-btm-left">
                        <h1>{TopTitle}</h1>
                    </div>
                    <div className="Header-btn-right">
                        {/* <span>时间:{cTime}</span> */}
                    </div>
                </div>
            </div>
        )
    }
}

// function getTime(){
//         var now = Date.now();
//         const Year = now.getFullYear;
//         const Month = now.getMonth+1;
//         const Date = now.getDate();
//         const Hour = now.getHours();
//         const Minu = now.getMinutes();
//         const Second = now.getSeconds();
//         return `${Year}-${Month>9?Month:'0'+Month}-${Date} ${Hour}:${Minu}:${Second}`;  
// }
export default withRouter(Header)