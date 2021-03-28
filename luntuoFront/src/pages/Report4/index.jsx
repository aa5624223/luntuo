import React, { Component } from 'react'
import { Table ,message,Button} from 'antd'
//引入自定义组件
import AdvancedSearchForm from '../../components/AdvancedSearchForm'
//引入工具  
import {getPageRoles,isOpt,ConvertFomrData,downloadExcel} from '../../utils'
//引入API
import { getV_CgInfo} from '../../api'
//配置  
import { V_CgInfo_columns } from '../../config/table-columns'

import { V_CgInfoFielsds } from '../../config/form-Fields'

export default class Report4 extends Component {
    state = {
        V_CgInfo_columns:[],
        dataSource: [],
        dataTotal: 0,
        Fuc_ExelOut:false,
        current:1,
        loading: false,
    }
    //搜索数据
    SearchData = async (formData) => {
        if (formData === undefined) {
            formData = ConvertFomrData({page:1,pageSize:50});
        } else {
            if(formData.page===undefined || formData.pageSize===undefined){//说明不是翻页请求 把查询条件存入
                this.SearchDataTemp = formData;
                this.setState({current:1})
            }else{
                formData = {...this.SearchDataTemp,...formData};
                this.setState({current:formData.page});
            }
            formData = ConvertFomrData(formData);
        }
        this.setState({ loading: true });
        const result = await getV_CgInfo(formData);
        if(result.status === 0){
            const { V_CgInfo,V_CgInfo_Count} = result.data;
            this.setState({ dataSource: V_CgInfo,loading: false,V_CgInfo_columns:V_CgInfo_columns,dataTotal:V_CgInfo_Count})
        }else{
            this.setState({loading: false})
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
    ModalExcelOut = ()=>{
        const {dataSource} = this.state; 
        const ColumsWch = [
          {wch:20},
	      {wch:60},
	      {wch:20},
	      {wch:10},
	      {wch:10},
	      {wch:20},
          {wch:35},
          {wch:10},
          {wch:10},
          {wch:15},
          {wch:20},
          {wch:20},
          {wch:15},
        ]
        downloadExcel(dataSource,V_CgInfo_columns,ColumsWch,"采购需求单");
    }
    render() {
        const { dataSource, loading,V_CgInfo_columns,Fuc_ExelOut,current,dataTotal} = this.state;
        return (
            <div className="main">
                <div>
                    <AdvancedSearchForm SearchData={this.SearchData} Fielsds={V_CgInfoFielsds} form={this.form} />
                </div>
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
                scroll={{ x: 1700,y:460}} 
                columns={V_CgInfo_columns}
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
