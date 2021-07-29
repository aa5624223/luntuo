import React, { Component } from 'react'
import {Switch,Route,HashRouter,Redirect} from 'react-router-dom'
import 'default-passive-events'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Mobile_Login from './pages/Mobile_Login'
import Mobile_Admin from './pages/Mobile_Admin'
import {getClientType} from './utils/index'
import './App.less'

export default class App extends Component {

    render() {
        var u = navigator.userAgent;
        let agent = getClientType(u);
        if(agent ==='PC'){
            return (
                <HashRouter>
                    <Switch>
                        <Route path="/Admin" component={Admin}/>
                        <Route path="/Login" component={Login}/>
                        <Redirect to="/Login"/>
                    </Switch>
                </HashRouter>
            );
        }else{
            return (
                <HashRouter>
                    <Switch>
                        <Route path="/Mobile_Login" component={Mobile_Login}/>
                        <Route path="/Mobile_Admin" component={Mobile_Admin}/>
                        <Redirect to="/Mobile_Login"/>
                    </Switch>
                </HashRouter>
            )
        }
        
    }
}
