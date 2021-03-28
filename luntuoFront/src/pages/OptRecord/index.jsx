import React, { Component } from 'react'
import { Table, Button,Tooltip,message,Modal} from 'antd'
import { SearchOutlined } from '@ant-design/icons';
//引入自定义组件
import AdvancedSearchForm from '../../components/AdvancedSearchForm'
//引入API
import { getLogInfo} from '../../api'
//引入工具
import {ConvertFomrData} from '../../utils'
//配置 
import { V_LogInfo_columns } from '../../config/table-columns'
import { V_LogInfoFielsds } from '../../config/form-Fields'

export default class OptRecord extends Component {
    SearchDataTemp = {};
    state = {
        dataSource: [],
        dataTotal: 0,
        loading: false,
        isModalShow:false,
        ModalData:{}, 
        current:1,
        V_LogInfo_columns:[] 
    }
    SearchData = async (formData)=>{
        if(formData===undefined){
            formData = ConvertFomrData({page:1,pageSize:20});
        }else{
            if(formData.page===undefined || formData.pageSize===undefined){//说明不是翻页请求 把查询条件存入
                this.SearchDataTemp = formData;
                this.setState({current:1})
            }else{//说明是翻页请求 加入历史查询条件
                
                formData = {...this.SearchDataTemp,...formData};
                this.setState({current:formData.page});
            }
            console.dir(formData);
            formData = ConvertFomrData(formData);
        }
        V_LogInfo_columns.push({
            title: '详细',
            width: 20,
            fixed: 'right',
            dataIndex: 'operation',
            render: (_, record) => {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <Tooltip placement="top" title="详细" >
                            <Button size="small" icon={<SearchOutlined />} onClick={() => this.ModalOpen(record)} ></Button>
                        </Tooltip>
                    </div>
                )
            }
        })
        this.setState({loading:true});
        const result = await getLogInfo(formData);
        if(result.status===0){
            const {V_LogInfo,V_LogInfo_Count} = result.data;
            this.setState({dataSource:V_LogInfo,loading:false,V_LogInfo_columns,dataTotal:V_LogInfo_Count})
        }else{
            message.error("服务器无响应");
            this.setState({loading:false,V_LogInfo_columns})
        }
    }

    ModalOpen = (record)=>{
        this.setState({isModalShow:true,ModalData:record})
    }
    ModalOK = ()=>{
        this.setState({isModalShow:false})
    }
    ModalCancel = ()=>{
        this.setState({isModalShow:false})
    }
    componentDidMount = ()=>{
        this.SearchData();
    }
    componentWillUnmount = ()=>{
        let {V_LogInfo_columns} = this.state;
        V_LogInfo_columns.pop();
        this.setState({V_LogInfo_columns});
    }
    render() {
        const {dataSource,dataTotal,loading,isModalShow,ModalData,current} = this.state;
        if(V_LogInfo_columns.length>6){
            V_LogInfo_columns.pop();
        }
        return (
            <div className="main">
                <div>
                    <AdvancedSearchForm SearchData={this.SearchData} Fielsds={V_LogInfoFielsds} form={this.form} />
                </div> 
                <Table
                    dataSource={dataSource} 
                    bordered 
                    rowKey = "ID"
                    sticky={true}
                    columns={V_LogInfo_columns}
                    //scroll={{y: 600 }} 
                    size="middle"
                    loading = {loading}
                    pagination={{
                        position: ['bottomCenter'],
                        pageSizeOptions:[20],
                        current:current,
                        total:dataTotal,
                        showTotal:(total, range) => `一共 ${total} 条数据`,
                        pageSize:20,
                        onChange:(page,pageSize)=>{
                            this.SearchData({page:page,pageSize:pageSize});
                        }
                    }}
                >
                </Table>
                <Modal title="详细" visible={isModalShow} okText="确认" cancelText="关闭" onOk={()=>this.ModalOK()} onCancel={()=>this.ModalCancel()}>
                    <h2>操作类型</h2><p>&emsp;&emsp;{ModalData.TypeName}</p>
                    <h2>操作人</h2><p>&emsp;&emsp;{ModalData.UserName}</p>
                    <h2>操作人编码</h2><p>&emsp;&emsp;{ModalData.UserCode}</p>
                    <h2>操作时间</h2><p>&emsp;&emsp;{ModalData.DateTime1}</p>
                    <h2>操作内容</h2><p>&emsp;&emsp;{ModalData.Contents}</p>
                </Modal>
            </div>
        )
    }
}
