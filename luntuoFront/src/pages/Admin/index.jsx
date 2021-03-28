import React, { Component } from 'react'
import { Redirect,Route, Switch,withRouter} from 'react-router-dom'
import {Layout,message} from 'antd'
//引入工具类
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {depTree,OrderTree} from '../../utils'
//引入个人组件
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
//import left_menu from '../../config/left-menu-list'
//引入API
import {getSite_Roles} from '../../api'
//引入页面
import AdminOptLog from '../AdminOptLog'
import AdminUserConfig from '../AdminUserConfig'
import Deskop from '../Deskop'
import Matrial from '../Matrial'
import MRP from '../MRP'
import OptRecord from '../OptRecord'
import Report1 from '../Report1'
import Report2 from '../Report2'
import Report3 from '../Report3'
import Report4 from '../Report4'
import Service1 from '../Service1'
import Service2 from '../Service2'
import Service3 from '../Service3'
import Service4 from '../Service4'
import ExcelUp from '../ExcelUp'

const {Sider,Content} = Layout
class Admin extends Component {
    state = {
        menuList:[]
    }
    componentDidMount = ()=>{
        let user = memoryUtils.user;
        //const {menuList} = this.state;
        if (!user || !user.ID) {
            user = storageUtils.getUser();
        }
        if (user && user.ID) {
            this.getAuth();
        }
        
    }
    //获取用户权限
    getAuth = async ()=>{
        //获取用户的权限，和侧边栏
        const user = memoryUtils.user;
        let formData = new FormData();
        formData.append('AuthConfig',user.Roles);

        const result = await getSite_Roles(formData);
        if(result.status===0){//登录成功
            const {Site_Roles} = result.data;
            //获取侧边栏
            let menuList = depTree(Site_Roles,0);
            menuList = OrderTree(menuList);
            this.setState({
                menuList
            })
            //用树
        }else{
            message.error("获取侧边栏失败");
        }
    }
    render() {
        //判断用户
        let user = memoryUtils.user;
        const {menuList} = this.state;
        if (!user || !user.ID) {
            user = storageUtils.getUser();
        }
        if (!user || !user.ID) {
            return <Redirect to='/Login' />
        }
        //const menuList = await this.getAuth();
        
        return (
            <Layout style={{height:'936px'}}>
                <Sider >
                    <LeftNav menuList={menuList} />
                </Sider>
                <Layout style={{height:'936px'}}>
                    <Header UserName={user.UserName}/>
                    <Content style={{margin:'20px',backgroundColor: '#fff',overflow:'auto'}}>
                        <Switch>
                            {/* <Redirect from='/Admin' exact to='/Admin/Deskop'/> */}

                            <Redirect from='/Admin' exact to='/Admin/Deskop'/>
                            <Route path='/Admin/Deskop' component={Deskop}/>
                            <Route path='/Admin/ReportSearch/Report1' component={Report1}/>
                            <Route path='/Admin/ReportSearch/Report2' component={Report2}/>
                            <Route path='/Admin/ReportSearch/Report3' component={Report3}/>
                            <Route path='/Admin/ReportSearch/Report4' component={Report4}/>

                            <Route path='/Admin/Service/Service1' component={Service1}/>
                            <Route path='/Admin/Service/Service2' component={Service2}/>
                            <Route path='/Admin/Service/Service3' component={Service3}/>
                            <Route path='/Admin/Service/Service4' component={Service4}/>

                            <Route path='/Admin/Admin/MRP' component={MRP}/>
                            <Route path='/Admin/Admin/Matrial' component={Matrial}/>
                            <Route path='/Admin/Admin/AdminUserConfig' component={AdminUserConfig}/>
                            <Route path='/Admin/Admin/AdminOptLog' component={AdminOptLog}/>
                            <Route path='/Admin/Upload/ExcelUp' component={ExcelUp}/>
                            <Route path='/Admin/Admin/OptRecord' component={OptRecord}/>
                        </Switch>
                    </Content>
                    {/* <Footer tyle={{textAlign: 'center', color: '#cccccc'}}>Footer</Footer> */}
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(Admin);