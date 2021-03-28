import React, { Component } from 'react'
import { Table,message,Button} from 'antd'
//引入自定义组件
import AdvancedSearchForm from '../../components/AdvancedSearchForm'
//引入工具
import {getPageRoles,isOpt,ConvertFomrData,downloadExcel} from '../../utils'
//引入API
import { getV_JjInfo} from '../../api'
//配置 
import { V_JjInfo_columns } from '../../config/table-columns'
import { V_JjInfoFielsds } from '../../config/form-Fields'

export default class Report3 extends Component {
    state = {
        dataSource: [],
        dataTotal: 0,
        loading: true, 
        current:1,
        Fuc_ExelOut:false,
        V_JjInfo_columns:[],
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
        const result = await getV_JjInfo(formData);
        if(result.status === 0){
            const { V_JjInfo,V_JjInfo_Count } = result.data;
            this.setState({ dataSource: V_JjInfo,loading: false,V_JjInfo_columns:V_JjInfo_columns,dataTotal:V_JjInfo_Count})
        }else{
            this.setState({loading: false,V_JjInfo_columns})
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
          {wch:15},
	      {wch:20},
	      {wch:45},
	      {wch:10},
	      {wch:10},
	      {wch:10},
          {wch:10},
        ]
        downloadExcel(dataSource,V_JjInfo_columns,ColumsWch,"钣金需求单");
    }
    render() {
        const { dataSource, loading,V_JjInfo_columns,Fuc_ExelOut,current,dataTotal} = this.state;
        return (
            <div className="main">
                <div>
                    <AdvancedSearchForm SearchData={this.SearchData} Fielsds={V_JjInfoFielsds} form={this.form} />
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
                scroll={{ y: 460}} 
                columns={V_JjInfo_columns}
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
