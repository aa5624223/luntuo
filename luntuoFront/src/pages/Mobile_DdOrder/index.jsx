import React, { Component } from "react";
//获得设置
import { GetFalineList } from "../../config/form-Fields";
import {
  Icon,
  List,
  Checkbox,
  DatePicker,
  Picker,
  Button,
  ActivityIndicator,
} from "antd-mobile";
//api
import { getDdOrder } from "../../api";
//工具
import moment from "moment";
//css
import "./index.css";
const Item = List.Item;
/**
 * 订单查询页面
 */
export default class Mobile_DdOrder extends Component {
  state = {
    dataSource: [],
    Count: 0, //数据条数
    btmHidden: true,
    Faline: [],
    PlantDt: "",
    FalineList: [],
    BtmToolsShow: true,
    loading: false, //显示加载器
  };
  //显示隐藏底部工具栏
  showActionSheet = () => {
    this.setState({
      BtmToolsShow: !this.state.BtmToolsShow,
    });
  };
  //查询数据
  SearchData = async () => {
    const { Faline, PlantDt } = this.state;
    let new_Faline, new_PlantDt;
    if (Faline.length === undefined || Faline.length === 0) {
      new_Faline = "";
    } else {
      new_Faline = Faline[0];
    }
    if (PlantDt === "") {
      new_PlantDt = "";
    } else {
      new_PlantDt = moment(PlantDt).format("YYYYMM");
    }
    //
    var formData = new FormData();
    formData.append("PlantDt", new_PlantDt);
    formData.append("Faline", Faline);
    this.setState({ loading: true });
    const result = await getDdOrder(formData);
    if (result.status === 0) {
      let { V_DdOrder, V_DdOrder_Count } = result.data;
      //过滤掉不生效的
      V_DdOrder = V_DdOrder.filter((item) => item.status === "是");
      V_DdOrder_Count = V_DdOrder.length === undefined ? 0 : V_DdOrder.length;
      this.setState({
        loading: false,
        dataSource: V_DdOrder,
        Count: V_DdOrder_Count,
      });
    } else {
      this.setState({ loading: false });
    }
  };
  //转向调度单明细界面
  RedirectToDet = (OrderId, LTOrder, TbCount, Faline) => {
    this.props.history.push({pathname:"/Mobile_Admin/Menu1/Mobile_DdOrderDet",
    ID: OrderId,LTOrder,TbCount,Faline});
  };
  componentDidMount = () => {
    this.SearchData();
  };
  render() {
    const {
      btmHidden,
      BtmToolsShow,
      PlantDt,
      Faline,
      loading,
      Count,
      dataSource,
    } = this.state;
    let FalineList = GetFalineList();
    const btnToolsEle = (
      <div
        style={{
          borderTop: "2px solid #ddd",
          position: "fixed",
          bottom: "0px",
          backgroundColor: "#fff",
          height: "13rem",
          paddingTop: "0.5rem",
          width: "100%",
        }}
      >
        <List renderHeader={`共找到${Count}条数据`}>
          <DatePicker
            mode="month"
            format="YYYY-MM-DD"
            onChange={(v) => this.setState({ PlantDt: v })}
            value={PlantDt}
          >
            <Item arrow="horizontal">计划月份</Item>
          </DatePicker>
          <Picker
            data={FalineList}
            title="产线"
            value={Faline}
            onChange={(v) => this.setState({ Faline: v })}
            onOk={(v) => this.setState({ Faline: v })}
          >
            <Item arrow="horizontal">产线</Item>
          </Picker>
          <Item>
            <Button type="primary" onClick={() => this.SearchData()}>
              查询
            </Button>
          </Item>
        </List>
      </div>
    );
    return (
      <div>
        <div>
          {dataSource.map((item) => {
            return (
              <Item
                key={item.ID}
                className="data-item"
                onClick={() => {
                  this.RedirectToDet(
                    item.ID,
                    item.LTOrder,
                    item.TbCount,
                    item.Faline
                  );
                }}
                arrow="horizontal"
              >
                <h3>调度单:{item.LTOrder}</h3>
                <p>
                  版本号:
                  {item.TbCount.length === 1
                    ? "0" + item.TbCount
                    : item.TbCount}
                  ,产线:{item.Faline}
                </p>
              </Item>
            );
          })}
        </div>
        {BtmToolsShow ? <div style={{ height: "14rem" }}></div> : ""}
        {BtmToolsShow ? btnToolsEle : ""}
        <Icon
          type={BtmToolsShow ? "down" : "up"}
          size="lg"
          color="#fff"
          onClick={this.showActionSheet}
          style={{
            position: "fixed",
            right: "1.5rem",
            padding: "0rem",
            bottom: BtmToolsShow ? "12.9rem" : "0.2rem",
            backgroundColor: "#108ee9",
            borderRadius: "0rem",
          }}
        >
          测试
        </Icon>
        <ActivityIndicator
          toast
          text="数据加载中"
          animating={loading}
        ></ActivityIndicator>
      </div>
    );
  }
}
