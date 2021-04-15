import React, { Component } from 'react'
import { Table, Form, DatePicker, Input, Select, Button, Upload, message, Modal, Spin} from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import LinkButton from '../../components/link-button';
import XLSX from 'xlsx'
import { UploadOutlined, CheckCircleTwoTone, ArrowLeftOutlined } from '@ant-design/icons';
//引入api
import { submitDdOrder } from '../../api'
//引入配置
import { DdOrder_Det_columns } from '../../config/table-columns'
const { confirm } = Modal;
export default class DdOrderExcel extends Component {
    formRef = React.createRef();
    state = {
        dataSource: [],
        loading: false,
        uploading: false,
        uploadState: 0,
    }
    key = 0;
    loadExcelUp = false
    attes = {
        name: 'file',
        headers: { authorization: 'authorization-text' },
        showUploadList: false,
        beforeUpload: (file) => {
            if (file.name.lastIndexOf('.xls') === -1 && file.name.lastIndexOf('.xlsx') === -1) {
                message.error("请上传Excel文件");
                return false;
            }
            const columns = DdOrder_Det_columns();
            const fileReader = new FileReader();
            this.setState({ loading: true })
            fileReader.onload = (event, _this) => {
                try {
                    const { result } = event.target;
                    const workbook = XLSX.read(result, { type: 'binary', cellDates: true });
                    let data = []; // 存储获取到的数据
                    for (const sheet in workbook.Sheets) {
                        if (workbook.Sheets.hasOwnProperty(sheet)) {
                            // 利用 sheet_to_json 方法将 excel 转成 json 数据
                            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                            
                            data = data.map(item => {
                                let single = {}
                                columns.forEach(item2 => {
                                    if (item[item2.title] !== undefined) {
                                        if (item2.title.indexOf('日期') !== -1 || item2.title.indexOf('时间') !== -1) {
                                            if (item[item2.title] instanceof Date) {
                                                single[item2.dataIndex] = moment(item[item2.title]).add(1, 'days').format('YYYYMMDD');
                                            } else {
                                                single[item2.dataIndex] = item[item2.title]
                                            }
                                        } else {
                                            single[item2.dataIndex] = item[item2.title]
                                        }

                                    }
                                })
                                single.key = "key" + (this.key++)
                                return single
                            })
                        }
                        //只读一张表
                        break;
                    }
                    this.setState({ dataSource: data, uploadState: 1 });
                } catch (e) {
                    message.error("请上传Excel文件");
                    throw e;
                }
            }
            this.setState({ loading: true })
            fileReader.readAsBinaryString(file, this);
            return false;
        }
    }
    //提交整个调度单
    DdExcelUp = async () => {
        if (this.loadExcelUp) {
            message.warn("文件上传中,请勿重复提交");
            return;
        }
        const { dataSource } = this.state;
        if (dataSource.length <= 0) {
            message.warn("请先提交Excel");
            return;
        }
        
        const form = this.formRef.current;
        try {
            await form.validateFields();
        } catch (errorInfo) {
            console.dir(errorInfo);
            message.warn("请验证数据完整性")
            return;
        }

        //头部数据打包
        const HeadData = { ...form.getFieldsValue(true) };

        const fomrData = new FormData();
        HeadData.PlanDt = moment(HeadData.PlanDt).format("YYYYMM");
        //
        fomrData.append("HeadData", JSON.stringify(HeadData));
        //明细数据打包

        const SubmitData = dataSource.map(item => {
            return item;
        })
        let i = 0;
        for (; i < SubmitData.length; i++) {
            delete SubmitData[i].TbIndex;
            //检查投产日期和计划月份是否相同 Datetime1,HeadData.PlanDt
            if((SubmitData[i].Datetime1+"").indexOf(HeadData.PlanDt)===-1){
                message.warn('请检查Excel的投产日期，和计划月份不同');
                return;
            }
            fomrData.append(`list[${i}]`, JSON.stringify(SubmitData[i]))
        }
        fomrData.append("Count", i);
        this.loadExcelUp = true;
        this.setState({uploading:true})
        try {
            const result = await submitDdOrder(fomrData);
            if (result.status === 0) {
                confirm({
                    icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
                    title: 'Excel上传成功，请勿重复上传',
                    okText: '确认',
                })
                this.setState({ dataSource: [] })
                this.loadExcelUp = false;
            } else if (result.status === 2) {
                message.error("SAP接口错误");
                this.loadExcelUp = false;
            } else if (result.status === 3) {
                console.dir(result.msg);
                message.error("物料编码错误，请检查:"+JSON.stringify(result.msg));
                this.loadExcelUp = false;
            } else {
                message.error("网络错误");
                this.loadExcelUp = false;
            }
        } catch {
            this.loadExcelUp = false;
            this.setState({uploading:false})
        } finally {
            this.loadExcelUp = false;
            this.setState({uploading:false})
        }

    }
    handleBack = () => {
        const { history } = this.props;
        history.goBack();
    }
    render() {
        const { dataSource,uploading} = this.state;
        return (
            <div className="main">
                <div className="toolArea">
                    <Form ref={this.formRef} layout="inline" initialValues={{ Faline: '南线' }}>
                        <Form.Item>
                            <LinkButton onClick={() => this.handleBack()}>
                                <ArrowLeftOutlined />返回调度单
                            </LinkButton>
                        </Form.Item>

                        <Form.Item
                            label="计划月份:"
                            name="PlanDt"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: '请选择计划月份'
                                    }
                                ]
                            }
                        >
                            <DatePicker locale={locale} picker="month" />
                        </Form.Item>
                        {/* 只能两位 */}
                        <Form.Item
                            label="序号"
                            name="NO"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: '请输入序号'
                                    }
                                ]
                            }
                        >
                            <Input type="number"></Input>
                        </Form.Item>
                        <Form.Item
                            label="产线"
                            name="Faline"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: '请输入产线'
                                    }
                                ]
                            }

                        >
                            <Select>
                                <Select.Option value="南线">南线</Select.Option>
                                <Select.Option value="北线">北线</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Upload {...this.attes}>
                                <Button icon={<UploadOutlined />}>Excel导入</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={() => this.DdExcelUp()}>生单</Button>
                        </Form.Item>
                    </Form>
                </div>
                <Table
                    dataSource={dataSource}
                    rowKey="key"
                    bordered
                    columns={DdOrder_Det_columns()}
                    pagination={false}
                    size="small"
                >
                </Table>
                <Spin style={{position:'absolute',left:'48%',top:'47%'}} tip="数据上传中..." spinning={uploading}>
                </Spin>
            </div>
        )
    }
}
