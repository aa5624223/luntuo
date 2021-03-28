import React, { Component } from 'react'
import moment from 'moment';
import { Table, Form, Input, DatePicker, Button, Tooltip, message } from 'antd'
import { FolderOpenOutlined } from '@ant-design/icons';
//引入API
import { getUploadInfo } from '../../api'
//引入工具
import { ConvertFomrData } from '../../utils'
//配置 
import { UploadInfo_columns } from '../../config/table-columns'
import { SERVER_ADDRESS_FILEPATH } from '../../utils/StaticSet'
export default class Report1 extends Component {
    formRef = React.createRef();
    dataSourceAll = [];
    state = {
        dataSource: [],
        dataTotal: 0,
        loading: false,
    }
    SearchData = async (formData) => {
        if (formData === undefined) {
            formData = new FormData();
        } else {
            formData = ConvertFomrData(formData);
        }
        UploadInfo_columns.push({
            title: '操作',
            width: 25,
            fixed: 'right',
            dataIndex: 'operation',
            render: (_, record) => {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <Tooltip placement="top" title="打开" >
                            <Button size="small" icon={<FolderOpenOutlined />} onClick={() => this.ModalOpen(record)} ></Button>
                        </Tooltip>

                    </div>
                )
            }
        })

        this.setState({ loading: true })
        const result = await getUploadInfo(formData);
        if (result.status === 0) {
            const { UploadInfo } = result.data;
            this.setState({ dataSource: UploadInfo, loading: false })
            this.dataSourceAll = UploadInfo;
        } else {
            message.error("服务器无响应");
            this.setState({ loading: false })
        }
    }
    //搜索数据 
    SearchDataForm = async (FormData) => {
        let { dataSource } = this.state;
        const form = this.formRef.current;
        const { FileName, Budat } = form.getFieldsValue(true);
        dataSource = this.dataSourceAll.filter(item => {
            if (FileName !== "" && FileName !== undefined) {
                if (item.FileName.indexOf(FileName) === -1) {
                    return false
                }
            }
            if (Budat !== "" && Budat !== undefined) {
                if (!moment(item.Budat).isBefore(Budat)) {
                    return false;
                }
            }
            return true;
        })
        this.setState({ dataSource: dataSource })
    }
    componentDidMount = () => {
        this.SearchData();
    }
    componentWillUnmount = () => {
        UploadInfo_columns.pop();
        this.setState({ UploadInfo_columns });
    }
    ModalOpen = (record) => {
        window.open(SERVER_ADDRESS_FILEPATH + record.FileName)
    }
    //编辑按钮 显示编辑对话框
    ModalEdit = (record) => {
        //record.path
    }
    formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 4 },
    }
    render() {
        const { dataSource, loading } = this.state;
        return (
            <div className="main">
                <div>
                    <Form ref={this.formRef}>
                        <Form.Item
                            style={{ display: 'inline-flex', width: 'calc(20% - 4px)' }}
                            name="FileName"
                            label="文件名"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            style={{ display: 'inline-flex', width: 'calc(18% - 4px)', marginLeft: '8px' }}
                            name="Budat"
                            label="上传日期"
                        >
                            <DatePicker
                                format="YYYY-MM-DD"
                            />
                        </Form.Item>
                        <Button type="primary" onClick={() => { this.SearchDataForm() }}>查询</Button>
                    </Form>
                </div>
                <Table
                    dataSource={dataSource}
                    bordered
                    rowKey="ID"
                    sticky={true}
                    //scroll={{ x: 2600}} 
                    columns={UploadInfo_columns}
                    size="middle"
                    loading={loading}
                    pagination={false}
                >
                </Table>
            </div>
        )
    }
}
