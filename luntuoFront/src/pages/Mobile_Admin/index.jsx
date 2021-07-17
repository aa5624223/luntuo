import React, { Component } from "react";
import { NavBar, Drawer, Icon, List, Popover } from "antd-mobile";

import { Redirect, Route, Switch, withRouter, Link } from "react-router-dom";

//引入工具类
import { depTree, OrderTree } from "../../utils";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
//引入api
import { getSite_Roles } from "../../api";
//引入页面
import Mobile_DdOrder from "../Mobile_DdOrder";
import Mobile_DdOrderDet from '../Mobile_DdOrderDet'
import "antd-mobile/dist/antd-mobile.css";
import "./index.css";
const Item = List.Item;
class Mobile_Admin extends Component {
  state = {
    HeadTitle: "",
    DrawerOpen: false,
    DrawerListEle: "",
    PopoverVisianle: false, //控制右侧的弹出层
  };
  //显示和隐藏左侧边
  onOpenChange = (...args) => {
    const { DrawerOpen } = this.state;
    this.setState({ DrawerOpen: !DrawerOpen });
  };
  //显示和隐藏右侧边栏
  handleVisibleChange = (visible) => {
    this.setState({
      PopoverVisianle: visible,
    });
  };
  //右侧边栏菜单点击事件
  onSelect = (opt) => {
    switch(opt.props.value){
        case 'exit':
            memoryUtils.user = {};
            storageUtils.removeUser();
            this.props.history.replace('/Mobile_Login');
            break;
        default:
    }
  };
  //获得侧边栏
  getSideBar = async () => {
    const user = memoryUtils.user;
    let formData = new FormData();
    formData.append("AuthConfig", user.Roles);
    const result = await getSite_Roles(formData);
    if (result.status === 0) {
      //登录成功
      const { Site_Roles } = result.data;
      let menuList = depTree(Site_Roles, 0);
      menuList = OrderTree(menuList);
      menuList = menuList.filter((item) => item.isMobile);
      console.dir(menuList);
      let DrawerListEle = (
        <div>
          {menuList.map((item) => {
            return (
              <List key={item.key} renderHeader={item.title}>
                {item.children === undefined
                  ? ""
                  : item.children.map((item2) => {
                      return (
                        <Item
                          key={item2.key}
                          onClick={() =>
                            this.setState({ HeadTitle: item2.title })
                          }
                        >
                          <Link to={item.key} style={{ color: "black" }}>
                            {item2.title}
                          </Link>
                        </Item>
                      );
                    })}
              </List>
            );
          })}
        </div>
      );
      this.setState({
        DrawerListEle,
        HeadTitle: menuList[0].children[0].title,
      });
    }
  };
  componentDidMount = () => {
    //获得侧边栏
    this.getSideBar();
  };
  render() {
    const {
      HeadTitle,
      DrawerOpen,
      DrawerListEle,
      PopoverVisianle,
    } = this.state;
    return (
      <div>
        <NavBar
          icon={<Icon type="ellipsis"></Icon>}
          onLeftClick={() => this.onOpenChange()}
          rightContent={
            <Popover
              mask
              overlayStyle={{ color: "currentColor" }}
              visible={PopoverVisianle}
              overlay={[
                (<Popover.Item key="4" value="exit" icon={<Icon type="cross"></Icon>} data-seed="logId">退出登录</Popover.Item>),
              ]}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-10, 0],
              }}
              onVisibleChange={this.handleVisibleChange}
              onSelect={this.onSelect}
            >
              <div
                style={{
                  height: "100%",
                  padding: "0 10px",
                  marginRight: "-10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon type="down" />
              </div>
            </Popover>
          }
        >
          {HeadTitle}
        </NavBar>
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight }}
          enableDragHandle
          contentStyle={{ color: "", textAlign: "center", paddingTop: '3rem' }}
          sidebar={DrawerListEle}
          open={DrawerOpen}
          onOpenChange={this.onOpenChange}
        >
          <Switch>
            <Redirect
              from="/Mobile_Admin"
              exact
              to="/Mobile_Admin/Menu1/Mobile_DdOrder"
            ></Redirect>
            <Route
              path="/Mobile_Admin/Menu1/Mobile_DdOrder"
              component={Mobile_DdOrder}
            ></Route>
            <Route
              path="/Mobile_Admin/Menu1/Mobile_DdOrderDet"
              component={Mobile_DdOrderDet}
              >
            </Route>
          </Switch>
        </Drawer>
      </div>
    );
  }
}
export default withRouter(Mobile_Admin);
