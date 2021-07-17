import React, { Component } from "react";
import {
  Icon,
  List,
  DatePicker,
  InputItem,
  Button,
  ActivityIndicator,
} from "antd-mobile";
//引入api
import { getV_DdOrder_Det } from "../../api";
//引入工具
import moment from 'moment'
//引入缓存
import store from "store";
//css
import "./index.css";
const Item = List.Item;
export default class Mobile_DdOrderDet extends Component {
  state = {
    dataSource: [],
    FilterData:[],//过滤后的数据
    Count: 0,
    BtmToolsShow: true, //底部是否显示
    //调度单信息
    ID: 0,
    LTOrder: "",
    TbCount: "",
    Faline: "",
    //查询的条件
    Datetime1: "", //投产日期
    Series: "", //系列
    //页面查询loading
    loading: false,
    //页面详细信息
    //LTOrder
    Det_Show: false,
    Det_Index:0,
    Det_ZjNo: "", //整机编码
    Det_Matnr: "", //物料编码
    Det_Series: "", //系列
    Det_Box: "", //分动箱
    Det_Num: "", //数量
    Det_Datetime1: "", //投产日期
    Det_Datetime2: "", //交货日期
    Det_Config: "", //配置
  };
  //显示隐藏底部工具栏
  showActionSheet = () => {
    const { BtmToolsShow } = this.state;
    this.setState({
      BtmToolsShow: !BtmToolsShow,
    });
  };
  Back = () => {
    this.props.history.replace("/Mobile_Admin/Menu1/Mobile_DdOrder");
  };
  SearchData = async () => {
    const { ID, LTOrder, TbCount, Faline } = this.state;
    const formData = new FormData();
    formData.append("IDS", ID);
    this.setState({ loading: true });
    const result = await getV_DdOrder_Det(formData);
    if (result.status === 0) {
      const { V_DdOrder_Det, V_DdOrder_Det_Count } = result.data;
      this.setState({
        loading: false,
        dataSource: V_DdOrder_Det,
        FilterData:V_DdOrder_Det,
        Count: V_DdOrder_Det_Count,
      });
    } else {
      this.setState({ loading: false });
    }
  };
  //过滤本页面的数据
  filterData = ()=>{
      const {dataSource,Series,Datetime1} = this.state;
      let new_Datetime1 = '';
      let new_Series = '';
      if(Datetime1!==''){
        new_Datetime1 = moment(Datetime1).format("YYYYMMDD")
      }
      if(Series!==''){
        new_Series = Series.toUpperCase();
      }
      let FilterData = dataSource.filter(item=>{
          if( (new_Series==='' || item.Series===new_Series) && (new_Datetime1==='' || new_Datetime1===item.Datetime1) ){
              return true;
          }else{
              return false;
          }
      })
      this.setState({FilterData});
  }
  //重置查询
  resetSearch = ()=>{
      const {dataSource} = this.state;
      console.dir(dataSource);
      this.setState({
          FilterData:dataSource,
          Datetime1:'',
          Series:''
      })
  }
  //显示详情
  showDets = (obj,Det_Index)=>{
      this.setState({
          Det_Show:true,
          Det_Index,
          Det_ZjNo:obj.ZjNo,
          Det_Matnr:obj.Matnr,
          Det_Series:obj.Series,
          Det_Box:obj.Box,
          Det_Num:obj.Num,
          Det_Datetime1:obj.Datetime1,
          Det_Datetime2:obj.Datetime2,
          Det_Config:obj.Config
        })
  }
  //返回数据列表
  backToList = ()=>{
      this.setState({Det_Show:false})
  }
  componentDidMount = () => {
    let { ID, LTOrder, TbCount, Faline } = this.props.location;
    if (ID === undefined || ID === "" || ID === 0) {
      ID = store.get("Mobile_DdOrderDet_ID");
      LTOrder = store.get("Mobile_DdOrderDet_LTOrder");
      TbCount = store.get("Mobile_DdOrderDet_TbCount");
      Faline = store.get("Mobile_DdOrderDet_Faline");
    } else {
      store.set("Mobile_DdOrderDet_ID", ID);
      store.set("Mobile_DdOrderDet_LTOrder", LTOrder);
      store.set("Mobile_DdOrderDet_TbCount", TbCount);
      store.set("Mobile_DdOrderDet_Faline", Faline);
    }
    this.setState(
      {
        ID,
        LTOrder,
        TbCount,
        Faline,
      },
      () => {
        this.SearchData();
      }
    );
  };
  render() {
    const {
      BtmToolsShow,
      Datetime1,
      LTOrder,
      Series,
      FilterData,
      Count,
      loading,
      Det_Show,
      Det_Index,
      Det_ZjNo,
      Det_Matnr,
      Det_Series,
      Det_Box,
      Det_Num,
      Det_Config
    } = this.state;
    //工具区
    const btnToolsEle = (
      <div
        style={{
          position: "fixed",
          borderBottom: "2px solid #ddd",
          backgroundColor: "#fff",
          height: "14rem",
          paddingTop: "0.5rem",
          width: "100%",
          zIndex: 9,
        }}
      >
        <List renderHeader={`共找到${Count}条数据`}>
          <h2
            style={{
              position: "fixed",
              top: "4.2rem",
              left: "2rem",
              color: "#1DA57A",
            }}
            onClick={this.Back}
          >
            返回
          </h2>
          <Item>
            <span style={{ fontWeight: 600 }}>
              调度单:LT20200701,产线:南线,版本:01
            </span>
          </Item>
          <DatePicker
            mode="date"
            format="YYYY-MM-DD"
            value={Datetime1}
            onChange={(v) => this.setState({ Datetime1: v })}
          >
            <Item arrow="horizontal">投产日期</Item>
          </DatePicker>
          <InputItem value={Series} arrow="horizontal" onChange={(v)=>this.setState({Series:v})} placeholder="请输入系列">
            系列
          </InputItem>
          <Item>
            <Button type="primary" size="small" onClick={()=>this.filterData()} >查询</Button>
            <p></p>
            <Button type="ghost" size="small" onClick={()=>this.resetSearch()} >重置</Button>
            <p></p>
          </Item>
        </List>
      </div>
    );
    //详情信息
    const DetEle = (
      <div style={{marginTop:'1rem'}}>
        <h2>明细&nbsp;{Det_Index}</h2>
        <List className="my-list">
          <Item>调度单号:{LTOrder}</Item>
          <Item>整机编码:{Det_ZjNo}</Item>
          <Item>物料编码:{Det_Matnr}</Item>
          <Item>系列:{Det_Series}&emsp;分动箱:{Det_Box}&emsp;数量:{Det_Num}</Item>
          <Item arrow="horizontal" wrap> 
            配置:{Det_Config}
          </Item>
        </List>
        <Button type="primary" style={{marginTop:'1rem'}} onClick={()=>this.backToList()} >返回列表</Button>
      </div>
    );
    return (
      <div>
        {/* 显示列表 */}
        {!Det_Show ? (
          <div>
            {BtmToolsShow ? btnToolsEle : ""}
            {BtmToolsShow ? <div style={{ height: "19rem" }}></div> : ""}
            <div style={{ zIndex: 1 }}>
             
              {FilterData.length>0?FilterData.map((item, index) => (
                <Item
                  style={{ margin: "10px" }}
                  key={item.ID}
                  arrow="horizontal"
                  onClick={()=>this.showDets(item,index+1)}
                >
                  <p>
                    {index + 1}.投产日期:{item.Datetime1},系列:{item.Series}
                  </p>
                  <p>
                    物料号:{item.Matnr},数量:{item.Num}
                  </p>
                </Item>
              )):<h2>没有查到数据</h2>}
            </div>
            <Icon
              type={BtmToolsShow ? "down" : "up"}
              size="lg"
              color="#fff"
              onClick={this.showActionSheet}
              style={{
                position: "fixed",
                right: "1.5rem",
                padding: "0rem",
                top: "23rem",
                backgroundColor: "#108ee9",
                borderRadius: "0rem",
              }}
            ></Icon>
            <ActivityIndicator
              toast
              text="数据加载中"
              animating={loading}
            ></ActivityIndicator>
          </div>
        ) : (
          DetEle
        )}
      </div>
    );
  }
}
