import React, { Component } from 'react'
import { Table,message,Button} from 'antd'
import moment from 'moment'
//引入工具
import {getPageRoles,isOpt,ConvertFomrData,downloadExcel} from '../../utils'
//引入API 
import {getV_BjInfo} from '../../api'
//配置 
import { V_BjInfo_columns } from '../../config/table-columns'
//模拟数据
// import { BjInfo } from '../../anaData'
export default class Report2 extends Component {
    state = { 
        dataSource: [],
        V_BjInfo_columns:[],
        dataTotal: 0,
        Fuc_ExelOut:false,
        current:1,
        loading: true,
    }
    //搜索数据
    SearchData = async (formData) => {
        if(formData===undefined){
            formData = ConvertFomrData({page:1,pageSize:50});
        }else {
            if(formData.page===undefined || formData.pageSize===undefined){//说明不是翻页请求 把查询条件存入
                this.SearchDataTemp = formData;
                this.setState({current:1})
            }else{
                formData = {...this.SearchDataTemp,...formData};
                this.setState({current:formData.page});
            }
            formData = ConvertFomrData(formData);
        }
        this.setState({loading:true})
        const result = await getV_BjInfo(formData);
        if(result.status===0){
            const {V_BjInfo,V_BjInfo_Count} = result.data;
            this.setState({ dataSource: V_BjInfo,loading:false,V_BjInfo_columns:V_BjInfo_columns,dataTotal:V_BjInfo_Count})
        }else{
            this.setState({loading: false,V_BjInfo_columns})
            message.error("服务器无响应");
        }
    }
    componentDidMount = async () => {
        this.SearchData();
        let {Fuc_ExelOut} = this.state;
        const {pathname} = this.props.location;
        this.Roles = await getPageRoles(pathname);
        if(isOpt(this.Roles,"Excel导出")){
            Fuc_ExelOut = true;
        }
        this.setState({Fuc_ExelOut})
    }
    ModalExcelOut = async ()=>{
        //const {dataSource} = this.state; 
        const ColumsWch = [
        {wch:10},
          {wch:20},
	      {wch:45},
	      {wch:20},
	      {wch:45},
	      {wch:20},
	      {wch:45},
          {wch:20},
          {wch:45},
          {wch:20},
          {wch:45},
          {wch:10},
        ]
        let formData = {...this.SearchDataTemp,...{page:1,pageSize:99999}};
        formData = ConvertFomrData(formData);
        const result = await getV_BjInfo(formData);
        if(result.status===0){
            const {V_BjInfo} = result.data;
            V_BjInfo.forEach(item=>{
                item.Datetime1 = moment(item.Datetime1).format("YYYYMMDD");
            })
            downloadExcel(V_BjInfo,V_BjInfo_columns,ColumsWch,"钣金需求单");
        }
    }
    
    render() {
        const { dataSource, loading,V_BjInfo_columns,Fuc_ExelOut,current,dataTotal} = this.state;
        return (
            <div className="main">
                <div className="toolArea">
                    
                    {
                        Fuc_ExelOut?<Button type="primary" onClick={() => this.ModalExcelOut()}>Excel导出</Button>:""
                    }
                </div>
                <Table
                dataSource={dataSource}
                bordered
                rowKey="ID"
                sticky={true}
                scroll={{ x: 3000,y:570}} 
                columns={V_BjInfo_columns}
                size="middle"
                loading={loading}
                pagination={{
                    position: ['bottomCenter'],
                    pageSizeOptions:[50],
                    current:current,
                    total:dataTotal,
                    showTotal:(total, range) => `一共 ${total} 条数据`,
                    pageSize:50,
                    onChange:(page,pageSize)=>{
                        this.SearchData({page:page,pageSize:pageSize});
                    }
                }}
                >
                </Table>
            </div>
        )
    }
}
