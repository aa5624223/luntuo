import React, { Component } from 'react'
//引入antd
import { Button, Table,Form,Input,Spin} from 'antd'
import moment from 'moment'
//自定义组件
import LinkButton from '../../components/link-button';
import { ArrowLeftOutlined } from '@ant-design/icons';
//引入api
import { getV_Sum_Num_BjInfo2,getV_BjInfo } from '../../api'
//引入工具类
import { ConvertFomrData,downloadExcel} from '../../utils'
//引入配置
import { DdOrder_BjInfo_First,V_BjInfo_columns} from '../../config/table-columns'
//引入样式
import './index.less'
//引入缓存
import store from 'store'
export default class DdOrder_BjInfo2 extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        var { DIDS, LTOrders } = this.props.location;
        if (DIDS === undefined || LTOrders === undefined) {
            DIDS = store.get("DdOrder_BjInfo_DIDS");
            LTOrders = store.get("DdOrder_BjInfo_LTOrders");
        } else {
            store.set("DdOrder_BjInfo_DIDS", DIDS);
            store.set("DdOrder_BjInfo_LTOrders", LTOrders);
        }
        this.state = {
            DIDS:DIDS,
            LTOrders:LTOrders,
            dataSource: [],
            loading: true,
            SearchContation: {},
            current: 1,
            dataTotal: 0,
            ExcelLoading: false,
            model: 0,
            expandRowKeys: [],
            searchText:'',
            SpinTip:'',
            
        }
    }
    //处理表格查询功能
    handleSearch = (selectedKeys, confirm, dataIndex)=>{
        const {SearchContation} = this.state;
        confirm({ closeDropdown: false })
        var filters = {};
        if(selectedKeys[0]!==undefined){
            filters[dataIndex] = selectedKeys[0];
            this.handleTableChange({},filters,{},0);
        }else{
            SearchContation[dataIndex]="";
            this.handleTableChange({},{},{},0);
        }
    }
    //重置
    handleReset = clearFilters=>{
        clearFilters();
        this.setState({ searchText: '' });
    }
    handleTableChange = async (pagination = {}, filters = {}, sorter = {},model) => {
        let { SearchContation,DIDS } = this.state;
        console.dir(filters);
        if (pagination.current === undefined) {
            SearchContation.page = 1;
            SearchContation.pageSize = 100;
        } else {
            SearchContation.page = pagination.current;
            SearchContation.pageSize = pagination.pageSize;
        }
        //添加条件
        if (filters !== {}) {
            for (let key in filters) {
                SearchContation[key] = filters[key];
            }
        }
        // 添加层级的条件
        // if(this.SearchSelect !==undefined && this.SearchSelect.value!==undefined){
        //     SearchContation["level"] = this.SearchSelect.value;
        // }
        // if(this.SearchSelect2 !==undefined && this.SearchSelect2.value!==undefined){
        //     SearchContation["level2"] = this.SearchSelect2.value;
        // }
        //添加表单的条件b
        const formReftemp = this.formRef.current;
        var tempFormData = formReftemp.getFieldsValue(true);//当前查询条件
        //创建提交后台数据
        SearchContation.DIDS = DIDS;
        //console.dir(tempFormData.Series);
        // if((tempFormData.Series==="" || tempFormData.Series===undefined) && model===1){
        //     message.warn("请输入系列，再查询");
        //     return;
        // }
        if(tempFormData.Series!=="" && tempFormData.Series!==undefined){
            SearchContation.model=1;
        }
        SearchContation = {...SearchContation,...tempFormData}
        const formData = ConvertFomrData(SearchContation);
        this.setState({ loading: true });
        //Pline
        const result = await getV_Sum_Num_BjInfo2(formData);
        if (result.status === 0) {
            const { V_BjInfo } = result.data;
            console.dir(V_BjInfo);
            //console.dir(V_BjInfo);
            if (V_BjInfo.length === 0) {
                //console.dir(V_BjInfo.length);
                this.setState({ dataSource: [], current: 1, dataTotal: 0, loading: false });
            } else {
                //console.dir("index");
                //val.replace(/\b(0+)/gi,"")
                V_BjInfo.forEach(item => {
                    item.FirstCode = item.FirstCode.replace(/\b(0+)/gi, "");
                    item.SecondCode = item.SecondCode.replace(/\b(0+)/gi, "");
                    item.ThirdCode = item.ThirdCode.replace(/\b(0+)/gi, "");
                    item.FourthCode = item.FourthCode.replace(/\b(0+)/gi, "");
                    item.FifthCode = item.FifthCode.replace(/\b(0+)/gi, "");
                })
                this.Arr = [];
                this.expandRowKeys2 = [];
                this.deepTree(V_BjInfo, 0, {});
                //console.dir(this.expandRowKeys);
                let tempSource = this.Arr.slice(0,9);
                this.setState({ dataSource: tempSource, current:1,dataTotal:this.Arr.length ,loading: false,expandRowKeys: this.expandRowKeys2,SearchContation:SearchContation});
            }
        }
    }
    //回退功能
    handleBack = () => {
        const { history } = this.props;
        history.goBack();
    }
    //Direction Right Down Left
    Codes = ["FirstCode", "SecondCode", "ThirdCode", "FourthCode", "FifthCode","SixthCode"];
    CodesName = ["FirstName", "SecondName", "ThirdName", "FourthName", "FifthName","SixthName"];
    Arr = [];
    expandRowKeys2 = [];
    //处理后台钣金的数据
    deepTree(data, index, pre) {
        if (index >= data.length) {
            return;
        }
        let Current = data[index];
        let keyIndex = 0;
        //var preNode = {};
        var nowNode = {};
        var CurrentNode = {};
        var flg = false;//后面是否都是新插入 
        let key;
        let NameKey;
        //let tempNode = {"Code":Current[key],"Num":Current["Num"+keyIndex],"children":childrenNode};
        //处理第一次空的插入
        if (pre === {}) {
            for (; keyIndex < this.Codes.length; keyIndex++) {
                key = this.Codes[keyIndex];
                NameKey = this.CodesName[keyIndex];
                //
                let tempNode = { Code: Current[key], Code2: (keyIndex + 1) + "层物料编码:" + Current[key], Num: Current["Num" + (keyIndex + 1)], Name: Current[NameKey],Pline1:Current["Pline1"], children: [] };
                if (keyIndex === 0) {
                    pre = tempNode;
                    nowNode = tempNode;
                    this.Arr.push(nowNode);
                    this.expandRowKeys2.push(nowNode.Code);
                } else {
                    nowNode.children.push(tempNode);
                    nowNode = tempNode;
                }
            }
            keyIndex = 0;
            index += 1;
            Current = data[index];
        }
        //判断是否要新插入
        key = this.Codes[0];
        NameKey = this.CodesName[0];
        if (Current[key] !== pre["Code"]) {//新插入
            let tempNode = { "Code": Current[key], Code2: (1) + "层物料编码:" + Current[key], "Num": Current["Num" + 1], Name: Current[NameKey], Pline1:Current["Pline1"],"children": [] };
            CurrentNode = tempNode;
            this.Arr.push(CurrentNode);
            this.expandRowKeys2.push(CurrentNode.Code);
            flg = true;
        }
        if (flg) {//全是新插入
            for (keyIndex = 1; keyIndex < this.Codes.length; keyIndex++) {
                key = this.Codes[keyIndex];
                NameKey = this.CodesName[keyIndex];
                if (Current[key] !== "") {
                    let tempNode = { "Code": Current[key], Code2: (keyIndex + 1) + "层物料编码:" + Current[key], "Num": Current["Num" + (keyIndex + 1)], Name: Current[NameKey], Pline1:Current["Pline"+(keyIndex+1)],Pline2:Current["Pline2"], Pline3:Current["Pline3"], Pline4:Current["Pline4"],Pline5:Current["Pline5"], "children": [] };
                    CurrentNode.children.push(tempNode);
                    this.expandRowKeys2.push(tempNode.Code);
                    CurrentNode = tempNode;
                }

            }
        } else {//不是全部都是全新插入 
            //寻找第一个Code不同的点
            for (keyIndex = 1; keyIndex < this.Codes.length; keyIndex++) {
                //undefined
                key = this.Codes[keyIndex];
                NameKey = this.CodesName[keyIndex];
                if (Current[key] === "") {
                    break;
                }
                if (flg) {//后面全是新插入
                    if (Current[key] === "") {
                        break;
                    }
                    let tempNode = { "Code": Current[key], Code2: (keyIndex + 1) + "层物料编码:" + Current[key], "Num": Current["Num" + (keyIndex + 1)], Name: Current[NameKey],Pline1:Current["Pline"+(keyIndex + 1)],"children": [] };
                    this.expandRowKeys2.push(tempNode.Code);
                    pre.children.push(tempNode);
                    pre = tempNode;
                    continue;
                }
                let tempNode = pre.children.find(item => {
                    if (item["Code"] === "") {
                        return false;
                    }
                    if (Current[key] === item["Code"]) {
                        return true;
                    } else {
                        return false;
                    }
                })
                if (tempNode === undefined) {//需要新插入
                    if (Current[key] === "") {
                        break;
                    }
                    tempNode = { Code: Current[key], Code2: (keyIndex + 1) + "层物料编码:" + Current[key], "Num": Current["Num" + (keyIndex + 1)], Name: Current[NameKey], Pline1:Current["Pline"+(keyIndex + 1)],"children": [] };
                    this.expandRowKeys2.push(tempNode.Code);
                    pre.children.push(tempNode);
                    pre = tempNode;
                    flg = true;
                } else {//不需要新插入
                    pre = tempNode;
                }
            }
        }
        this.deepTree(data, index + 1, this.Arr[this.Arr.length - 1]);
    }

    OpenOrCloseSingle = (record, type) => {
        let { expandRowKeys } = this.state;
        if (type) {
            expandRowKeys.push(record.Code);
        } else {
            expandRowKeys = expandRowKeys.filter(item => {
                if (item === record.Code) {
                    return false;
                } else {
                    return true;
                }
            })
        }
        this.setState({ expandRowKeys });
    }
    ExpandRow = (type) => {
        const { dataSource } = this.state;
        let expandRowKeys = [];
        for (let i = 0; i < type; i++) {
            if (i === 0) {
                expandRowKeys = [];
            }
            if (i === 1) {
                let tempKeys = dataSource.map(item => item.Code)
                expandRowKeys = [...expandRowKeys, ...tempKeys]
            }
            if (i === 2) {
                let tempKeys = [];
                dataSource.forEach(item => {
                    item.children.forEach(item2 => {
                        tempKeys.push(item2.Code);
                    })
                })
                expandRowKeys = [...expandRowKeys, ...tempKeys]
            }
            if (i === 3) {
                let tempKeys = [];
                dataSource.forEach(item => {
                    item.children.forEach(item2 => {
                        item2.children.forEach(item3 => tempKeys.push(item3.Code))
                    })
                })
                expandRowKeys = [...expandRowKeys, ...tempKeys]
            }
            if (i === 4) {
                let tempKeys = [];
                dataSource.forEach(item => {
                    item.children.forEach(item2 => {
                        item2.children.forEach(item3 => {
                            item3.children.forEach(item4 => tempKeys.push(item4.Code))
                        })
                    })
                })
                expandRowKeys = [...expandRowKeys, ...tempKeys]
            }

            if (i === 5) {
                let tempKeys = [];
                dataSource.forEach(item => {
                    item.children.forEach(item2 => {
                        item2.children.forEach(item3 => {
                            item3.children.forEach(item4 => {
                                item4.children.forEach(item5=>tempKeys.push(item5.Code))
                            })
                        })
                    })
                })
                expandRowKeys = [...expandRowKeys, ...tempKeys]
            }
        }
        this.setState({ expandRowKeys })
    }
    ExcelOut = async ()=>{
        const {SearchContation} = this.state;
        const ColumsWch = [
            {wch:10},//日期
            {wch:20},//一层编码
            {wch:45},//一层名称
            {wch:10},//一层数量
            {wch:10},//一层工艺
            {wch:20},//二层编码
            {wch:45},//二层名称
            {wch:10},//二层数量
            {wch:10},//二层工艺
            {wch:20},//三层编码
            {wch:45},//三层名称
            {wch:10},//三层数量
            {wch:10},//三层工艺
            {wch:20},//四层编码
            {wch:45},//四层名称
            {wch:10},//四层数量
            {wch:10},//四层工艺
            {wch:20},//五层编码
            {wch:45},//五层名称
            {wch:10},//五层数量
            {wch:10},//五层工艺
            {wch:20},//六层编码
            {wch:45},//六层名称
            {wch:10},//六层数量
            {wch:10},//六层工艺
            {wch:10},//系列
          ]
        this.setState({SpinTip:'Excel导出中，请等待',ExcelLoading:true});
        SearchContation.page = 1;
        SearchContation.pageSize = 999999;
        const formData = ConvertFomrData(SearchContation);
        //
        const result = await getV_BjInfo(formData);
        if(result.status===0){
            const {V_BjInfo} = result.data;
            
            V_BjInfo.forEach(item=>{
                item.Datetime1 = moment(item.Datetime1).format("YYYYMMDD");
            })
            console.dir(V_BjInfo);
            downloadExcel(V_BjInfo,V_BjInfo_columns,ColumsWch,"钣金需求单");
            this.setState({SpinTip:'Excel导出中，请等待',ExcelLoading:false});
        }
    }
    componentDidMount = async () => {
        this.handleTableChange();
    }
    render() {
        const { dataSource, loading, expandRowKeys ,SearchContation,current,dataTotal,SpinTip,ExcelLoading,LTOrders} = this.state;
        return (
            <div className="main">
                <div style={{margin:'10px',float:"left",width:'80%'}}>
                    <Form layout="inline" ref={this.formRef}>
                        <Form.Item>
                            <LinkButton onClick={() => this.handleBack()}>
                                <ArrowLeftOutlined />返回调度单
                            </LinkButton>
                        </Form.Item>
                        <Form.Item
                            label="系列"
                            name="Series"
                            style={{width:'160px'}}
                        >
                            <Input placeholder="默认所有系列"></Input>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={()=>this.handleTableChange({},{},{},1)}>查询</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={() => { this.ExpandRow(1) }}>查看第一层</Button>
                            &ensp;
                            <Button onClick={() => { this.ExpandRow(2) }}>查看第二层</Button>
                            &ensp;
                            <Button onClick={() => { this.ExpandRow(3) }}>查看第三层</Button>
                            &ensp;
                            <Button onClick={() => { this.ExpandRow(4) }}>查看第四层</Button>
                            &ensp;
                            <Button onClick={() => { this.ExpandRow(5) }}>查看第五层</Button>
                            &ensp;
                            <Button onClick={() => { this.ExpandRow(6) }}>查看第六层</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div style={{float:'left',textAlign:'right',width:'16%'}}>
                    <Button type="primary" onClick={()=>this.ExcelOut()}>导出Excel</Button>
                </div>
                <div style={{float:"left",width:"100%"}}>
                    <h2 style={{float:"left"}}>调度单:{LTOrders}</h2>
                    {
                    SearchContation.FirstCode===""||SearchContation.FirstCode===undefined?"":
                        <h2 style={{float:"left"}}>物料编码:{SearchContation.FirstCode}&nbsp;</h2>
                    }
                    {
                        SearchContation.FirstName===""||SearchContation.FirstName===undefined?"":
                        <h2 style={{float:"left"}}>物料名称:{SearchContation.FirstName}</h2>
                    }
                    {
                        SearchContation.Pline===""||SearchContation.Pline===undefined?"":
                        <h2 style={{float:"left"}}>状态:{SearchContation.Pline}</h2>
                    }
                </div>
                <Table
                    dataSource={dataSource}
                    bordered
                    rowKey="Code"
                    sticky={true}
                    scroll={{ y: 600 }}
                    size="small"
                    columns={DdOrder_BjInfo_First(this)}
                    loading={loading}
                    indentSize={15}
                    onRow={record => {
                        return {
                            onMouseEnter: event => { },
                            onMouseLeave: event => { }
                        }
                    }}
                    expandable={{
                        expandedRowKeys: expandRowKeys,
                        onExpand: (expanded, record) => { this.OpenOrCloseSingle(record, expanded) }
                    }}
                    pagination={{
                        position: ['bottomCenter'],
                        pageSizeOptions:[10],
                        current:current,
                        total:dataTotal,
                        showTotal:(total, range) => `一共 ${total} 条数据`,
                        pageSize:10,
                        onChange:(page,pageSize)=>{
                            let start = (page-1)*pageSize;
                            let end = (page)*pageSize;
                            if(this.Arr.length!==0){
                                if(end>this.Arr.length){
                                    end = this.Arr.length;
                                }
                                let tempArr = this.Arr.slice(start,end-1);
                                this.setState({dataSource:tempArr,current:page});
                            }
                            //this.Arr
                            //this.handleTableChange({page:page,pageSize:pageSize});
                        }
                    }}
                // expandable={{
                //     expandRowByClick: true,
                //     expandedRowRender,
                //     columnWidth: 3,
                //     indentSize: 0,
                //     expandedRowKeys: expandRowKeys1,
                //     onExpand: (expanded, record) => { this.OpenOrCloseSingle(record, expanded) }
                // }}
                >

                </Table>
                <Spin style={{ position: 'absolute', left: '48%', top: '47%' }} tip={SpinTip} spinning={ExcelLoading}></Spin>
            </div>
        )
    }
}
