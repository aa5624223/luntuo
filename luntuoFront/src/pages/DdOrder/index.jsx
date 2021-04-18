import React, { Component } from 'react'
import {Table,Button,message,Modal,Input,Form, DatePicker} from 'antd'
import moment from 'moment'
import locale from 'antd/es/date-picker/locale/zh_CN';
import { ExclamationCircleOutlined } from '@ant-design/icons';

//引入配置
import {GetDdOrder_columns,GetDdOrder_Det_Status} from '../../config/table-columns'
//引入工具
import {ConvertFomrData} from '../../utils'
//引入api
import {getDdOrder,editDdOrder,editDdOrder_status,delDdOrder,demantExe,getV_DdOrder_Det} from '../../api'
//引入模拟数据
const { confirm } = Modal;
export default class DdOrder extends Component {
    //对话框配置
    formRef = React.createRef();
    formRef2 = React.createRef();
    layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 16,
        },
    };
    //state配置
    state = {
        dataSource:[],
        searchText: '',
        searchedColumn: '',
        selectedRowKeys:[],
        //记录当前查询条件
        SearchContation:{},
        Fuc_Del:true,
        Fuc_Edit:true,
        loading:true,
        current:1,
        dataTotal:0,
        ModalTitle:'编辑',
        //编辑对话框是否显示
        isModalEditShow:false,
        //需求计划执行对话框是否显示
        isModalExeShow:false,
        isModalDetStatusShow:false,
        DataSource_DetStatus:[]
    }
    
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
      };
    //删除
    ModalDel = async (record,app)=>{
        if(record.status==='是'){
            message.warn("生效调度单不可删除");
            return;
        }
       //delDdOrder 
       confirm({
        title: '是否删除数据?',
        icon: <ExclamationCircleOutlined />,
        okText: '是',
        okType: 'danger',
        cancelText: '否',
        async onOk() {
            //record.ID
            const formData = new FormData();
            formData.append("ID",record.ID);
            const result = await delDdOrder(formData);
            if(result.status===0){
                message.success("删除成功");
                Modal.destroyAll();
                const {current,SearchContation} = app.state;
                const pageSize = 20;
                app.handleTableChange({current,pageSize},SearchContation);
            }else{
                message.error("服务器无响应");
                Modal.destroyAll();
            }
        },
        onCancel() {
        },
    })
    }
    //编辑对话框
    ModalEdit = (record,_this)=>{
        _this.setState({ isModalEditShow: true, ModalTitle: '编辑' }, () => {
            _this.formRef.current.setFieldsValue(record)
        })
    }
    //更改生效状态
    changeStatus = async (record,_this)=>{
        //record.status,record.UpTime,record.PlanDt,recored.
        const formData = ConvertFomrData(record);
        const result = await editDdOrder_status(formData);
        if(result.status===0){
            const {current,SearchContation} = this.state;
            const pageSize = 20;
            message.success("更改成功");
            this.handleTableChange({current,pageSize},SearchContation);
        }else{
            message.error("网络错误");
        }
    }
    //关闭对话框
    ModalEditCancel = ()=>{
        this.setState({isModalEditShow:false});
    }
    //编辑
    ModalEditOk = async ()=>{
        const form = this.formRef.current;
        try {
            await form.validateFields();
        } catch (errorInfo) {
            message.warn('请检查数据的正确性')
            return;
        }
        const formData = ConvertFomrData(form.getFieldsValue(true))
        const result = await editDdOrder(formData);
        if (result.status === 0) {
            const {current,SearchContation} = this.state;
            const pageSize = 20;
            message.success("编辑成功");
            this.handleTableChange({current,pageSize},SearchContation);
            
        }else{
            message.error("服务器无响应");
        }
        this.setState({ isModalEditShow: false })
    }
    //重置
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    //明细汇总
    OrderDet = ()=>{
        const { history } = this.props;
        const {selectedRowKeys} = this.state;
        //console.dir(selectedRowKeys.join(',') 
        //IDS
        if(selectedRowKeys.length===0){
            message.warn("请先选择要汇总的调度单");
            return;
        }
        history.push({pathname:"/Admin/DdOrder/DdOrderDet",IDS:selectedRowKeys.join(',')});
    }
    //表格更改时调用的方法 confirm({ closeDropdown: false }); =查询
    handleTableChange = async (pagination={},filters={},sorter={})=>{
        const {SearchContation} = this.state;
        if(pagination.current === undefined){
            SearchContation.page = 1;
            SearchContation.pageSize = 20;
        }else{
            SearchContation.page = pagination.current;
            SearchContation.pageSize = pagination.pageSize;
        }
        //翻页请求
        if(filters!=={}){
            for(let key in filters){
                SearchContation[key] = filters[key];
            }
        }
        
        //用于提交到后台
        const formData = new FormData();
        for(let key in SearchContation){
            if(SearchContation[key]!==null){
                formData.append(key,SearchContation[key]);
            }
        }
        this.setState({loading:true})
        let result = await getDdOrder(formData);
        try{
            if(result.status===0){
                const {DdOrder,DdOrder_Count} = result.data;
                this.setState({loading:false,dataSource:DdOrder,SearchContation,dataTotal:DdOrder_Count,current:SearchContation.page})
            }else{
                this.setState({loading:false})
                message.error("网络无响应");
            }
        }catch(error){
            this.setState({loading:false})
            message.error("网络无响应");
        }
        
    }
    //查询点击
    SearchDet = async (DID)=>{
        var formData = new FormData();
        formData.append("IDS",DID);
        const result = await getV_DdOrder_Det(formData);
        if(result.status === 0){
            const {V_DdOrder_Det} = result.data;
            //DataSource_DetStatus
            this.setState({isModalDetStatusShow:true,DataSource_DetStatus:V_DdOrder_Det})
            //GetDdOrder_Det_Status
        }else{
            message.error("网络错误");
        }
        //getV_DdOrder_Det
    }
    //导入调度单
    ExcelIn = ()=>{
        const { history } = this.props;
        history.push({pathname:"/Admin/DdOrder/DdOrderExcel"});
    }
    //需求计划执行 对话框
    demantExe = async ()=>{
        const {selectedRowKeys,dataSource} = this.state;
        if(selectedRowKeys.length!==1){
            message.warn("一次只能选择一条调度单");
            return;
        }
        const record = dataSource.filter(item=>{
            if(item.ID === selectedRowKeys[0]){
                return true;
            }else{
                return false;
            }
        })
        if(record[0].status!=='是'){
            message.warn("不生效的调度单不可执行需求计划");
            return;
        }
        this.setState({ isModalExeShow: true},()=>{
            const Year = record[0].PlanDt.substring(0,4);
            const Month = record[0].PlanDt.substring(4,6);
            const dt = new Date(Year+"-"+Month);
            console.dir(Year+"-"+Month);
            this.formRef2.current.setFieldsValue({ID:selectedRowKeys[0],dt:moment(dt).startOf('Month')})
        })
    }
    //需求计划执行
    ModalExeOk = async ()=>{
        const form = this.formRef2.current;
        try {
            await form.validateFields();
        } catch (errorInfo) {
            message.warn('请检检查数据正确性')
            return;
        }
        var data = form.getFieldsValue(true);
        data.newdt = moment(data.dt).format("YYYYMMDD");
        console.dir(data);
        var formData = new FormData();
        formData.append("ID",data.ID);
        formData.append("dt",data.newdt);
        //
        const result = await demantExe(formData);
        if(result.status===0){
            const {current,SearchContation} = this.state;
            const pageSize = 20;
            message.success("需求计划执行中,请等待完成");
            
            this.handleTableChange({current,pageSize},SearchContation);

        }else if(result.status===1){
            message.error("需求计划执行失败:"+result.msg);
        }
        this.setState({isModalExeShow:false});
    }
    ModalExeCancel = async ()=>{
        this.setState({isModalExeShow:false})
    }
    ModalDetStatusCancel = ()=>{
        this.setState({isModalDetStatusShow:false})
    }
    onSelectChange = selectedRowKeys =>{
        this.setState({ selectedRowKeys });
    }
    //钣金需求
    demantBj = ()=>{
        //selectedRowKeys
        //selectedRowKeys
        const {dataSource,selectedRowKeys} = this.state;
        var LTOrders=[];
        var newRecord = dataSource.filter(item=>{
            for(let i=0;i<selectedRowKeys.length;i++){
                if(selectedRowKeys[i]===item.ID){
                    return true;
                }
            }
            return false;
        })
        for(let i=0;i<newRecord.length;i++){
            if(newRecord[i].BjStatus!=='已完成'){
                message.warn("不能选择未完成的调度单");
                return;
            }
            LTOrders.push(newRecord[i].LTOrder);
        }
        for(let i=0;i<newRecord.length;i++){
            for(let j=i+1;j<newRecord.length;j++){
                if(newRecord[i].PlanDt!==newRecord[j].PlanDt){
                    message.warn("不能选择计划月份不同的调度单");
                    return;
                }
            }
        }
        const { history } = this.props;
        history.push({pathname:"/Admin/DdOrder/DdOrder_BjInfo",DIDS:selectedRowKeys.join(','),LTOrders:LTOrders.join(',')});

    }
    //机加需求
    demantJj = ()=>{
        //selectedRowKeys
        const {dataSource,selectedRowKeys} = this.state;
        var LTOrders=[];
        var newRecord = dataSource.filter(item=>{
            for(let i=0;i<selectedRowKeys.length;i++){
                if(selectedRowKeys[i]===item.ID){
                    return true;
                }
            }
            return false;
        })
        for(let i=0;i<newRecord.length;i++){
            if(newRecord[i].JjStatus!=='已完成'){
                message.warn("不能选择未完成的调度单");
                return;
            }
            LTOrders.push(newRecord[i].LTOrder);
        }
        for(let i=0;i<newRecord.length;i++){
            for(let j=i+1;j<newRecord.length;j++){
                if(newRecord[i].PlanDt!==newRecord[j].PlanDt){
                    message.warn("不能选择计划月份不同的调度单");
                    return;
                }
            }
        }
        const { history } = this.props;
        history.push({pathname:"/Admin/DdOrder/DdOrder_JjInfo",DIDS:selectedRowKeys.join(','),LTOrders:LTOrders.join(',')});

    }
    //采购需求
    demantCg = ()=>{
        //selectedRowKeys
        const {dataSource,selectedRowKeys} = this.state;
        var LTOrders=[];
        var newRecord = dataSource.filter(item=>{
            for(let i=0;i<selectedRowKeys.length;i++){
                if(selectedRowKeys[i]===item.ID){
                    return true;
                }
            }
            return false;
        })
        for(let i=0;i<newRecord.length;i++){
            if(newRecord[i].JjStatus!=='已完成'){
                message.warn("不能选择未完成的调度单");
                return;
            }
            LTOrders.push(newRecord[i].LTOrder);
        }
        for(let i=0;i<newRecord.length;i++){
            for(let j=i+1;j<newRecord.length;j++){
                if(newRecord[i].PlanDt!==newRecord[j].PlanDt){
                    message.warn("不能选择计划月份不同的调度单");
                    return;
                }
            }
        }
        const { history } = this.props;
        history.push({pathname:"/Admin/DdOrder/DdOrder_CgInfo",DIDS:selectedRowKeys.join(','),LTOrders:LTOrders.join(',')});
        
    }
    componentDidMount = async ()=>{
        this.handleTableChange();
    }
    render() {
        const DdOrder_columns = GetDdOrder_columns(this);
        const {dataSource,loading,SearchContation,ModalTitle,isModalEditShow,current,dataTotal,selectedRowKeys,isModalExeShow,isModalDetStatusShow,DataSource_DetStatus} = this.state;
        const rowSelection ={
            selectedRowKeys,
            columnWidth:15,
            onChange: this.onSelectChange,
        }
        return (
            <div className="main">
                <div className="toolArea">
                    <Button type="primary" onClick={()=>this.ExcelIn()}>导入调度单</Button>
                    &emsp;
                    <Button type="primary" onClick={()=>this.OrderDet()} >明细汇总</Button>
                    &emsp;
                    <Button type="primary" onClick={()=>this.demantExe()} >需求计划执行</Button>
                    &emsp;
                    <Button type="primary" onClick={()=>this.demantBj()} >钣金需求报表</Button>
                    &emsp;
                    <Button type="primary" onClick={()=>this.demantJj()} >机加需求报表</Button>
                    &emsp;
                    <Button type="primary" onClick={()=>this.demantCg()} >采购需求报表</Button>
                    <p style={{textAlign:"left",fontSize:"22px"}}>
                        当前查询条件:
                        {SearchContation.LTOrder?"订单号:"+SearchContation.LTOrder+"":""}
                        &emsp;
                        {SearchContation.Faline?"产线:"+SearchContation.Faline+"":""}
                        &emsp;
                        {SearchContation.status?"是否生效:"+SearchContation.status:""}
                    </p>
                </div>
                <Table
                rowSelection={rowSelection}
                dataSource={dataSource}
                bordered
                rowKey="ID"
                sticky={true}
                columns={DdOrder_columns}
                size="middle"
                loading = {loading}
                pagination={{
                    position: ['bottomCenter'],
                        pageSizeOptions:[20],
                        current:current,
                        total:dataTotal,
                        showTotal:(total, range) => `一共 ${total} 条数据`,
                        pageSize:20,
                        // onChange:(page,pageSize)=>{
                        //     this.handleTableChange({page:page,pageSize:pageSize});
                        // }
                }}
                onChange={this.handleTableChange}
                >

                </Table>
                <Modal title={ModalTitle} visible={isModalEditShow} onOk={() => this.ModalEditOk()} onCancel={() => this.ModalEditCancel()} >
                    <Form ref={this.formRef}  {...this.layout} >
                        <Form.Item
                            name="LTOrder"
                            label="调度单号"
                        >
                            <Input readOnly />
                        </Form.Item>
                        <Form.Item
                            name="Faline"
                            label="产线"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入产线'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        {/* <Form.Item
                            name="status"
                            label="生效"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入选择'
                                },
                            ]}
                        >
                            <Select defaultValue="是">
                                <Option value="是">是</Option>
                                <Option value="否">否</Option>
                            </Select>
                        </Form.Item> */}
                    </Form>
                </Modal>
                <Modal title="需求计划执行" visible={isModalExeShow} onOk={()=>this.ModalExeOk()} onCancel={()=>this.ModalExeCancel()} >
                    <Form ref={this.formRef2}>
                        <Form.Item
                            name="dt"
                            label="期初库存日期"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入期初库存日期'
                                },
                            ]}
                        >
                            <DatePicker locale={locale} format="YYYYMMDD"  ></DatePicker>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal title="" width={1000}  visible={isModalDetStatusShow} onOk={()=>this.ModalDetStatusCancel()} onCancel={()=>this.ModalDetStatusCancel()}>
                    <div style={{maxHeight:"700px",overflowY:"scroll"}}>
                        <Table
                            sticky={true}
                            rowKey="ID"
                            bordered
                            dataSource={DataSource_DetStatus}
                            columns={GetDdOrder_Det_Status()}
                            size = "middle"
                            pagination={false}
                        >

                        </Table>
                    </div>
                    
                </Modal>
            </div>
        )
    }
}
