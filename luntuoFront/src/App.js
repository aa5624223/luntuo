import React, { Component } from 'react'
import {Switch,Route,HashRouter,Redirect} from 'react-router-dom'
import 'default-passive-events'
import Login from './pages/Login'
import Admin from './pages/Admin'
import './App.less'

export default class App extends Component {

    render() {
        return (
            <HashRouter>
           <Switch>
			   <Route path="/Admin" component={Admin}/>
               <Route path="/Login" component={Login} ></Route>
               <Redirect to="/Login"/>
           </Switch>
           </HashRouter>
        );
    }
}
