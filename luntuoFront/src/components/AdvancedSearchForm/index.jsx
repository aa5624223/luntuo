import React, { useState } from 'react';
import { Form, Row, Col, Input, Select ,Button,DatePicker} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import './index.less'
import LinkButton from '../link-button';
const { Option } = Select;
const { RangePicker } = DatePicker;
const AdvancedSearchForm = (props) => {
    //提交的Url,查找数据的函数,第一次是否显示数据
    const {SearchData,Fielsds} = props;
    const [expand, setExpand] = useState(false);
    const [form] = Form.useForm();
    const getInput = (data)=>{
      switch(data.type){
        case 'Input':
          return <Input placeholder={data.placeholder} name={data.name} />
        case 'Select':
          return <Select value={data.defaultValue+""}  name={data.name} >{getOpts(data.Options)}</Select>
        case 'SelectFind':
          return <Select showSearch value={data.defaultValue+""} optionFilterProp="children"  name={data.name}>{getOpts(data.Options)}</Select>
        case 'DateTime':
          return <RangePicker name={data.name} />
        default:
          return null
      }
    }
    //获得select 的option
    const getOpts = (Options)=>{
      return Options.map((opt)=><Option value={opt.value+""} key={opt.value} >{opt.text}</Option>)
    }
    //获得表单
    const getFields = () => {
      const count = expand ? 6 : 3;
      let t = 0;
      const children = Fielsds.map(item=>{
        if(t>=count){
          t++;
          return null
        }else{
          t++;
          return (
            <Col span={item.span} key={item.key} >
              <Form.Item name={item.name} label={item.label} rules={item.rules} >
                  {getInput(item)}
              </Form.Item>
            </Col>
          )
        }
      })
      return children;
    };
    //处理表单提交事件
    const handleSubmit = async (event)=>{
      if(event){
        event.preventDefault();
      }
      const FormData = form.getFieldsValue(true);
      const error = form.getFieldsError();
      if(error.find(item=>item.errors.length>0)){
        return;
      }
      SearchData(FormData);
    }
    // const onFinish = (values) => {
    // };
    
    return (
      // onFinish={onFinish}
      <Form form={form} name="advanced_search" className="ant-advanced-search-form" style={{margin:"20px 0px"}}>
        <Row gutter={24}>
          {getFields()}
          <Col span={6}>
          <Button type="primary" htmlType="submit" onClick={handleSubmit} >查询</Button>
          <Button style={{margin: '0 8px',}} onClick={() => {form.resetFields();}}>重置</Button>
            {
              Fielsds.length>=3?
              (
              <LinkButton style={{fontSize: 12,}}  onClick={() => {setExpand(!expand);}}>
                {expand ? <UpOutlined />: <DownOutlined />}
                {expand ? "收起":"展开"}
              </LinkButton>
              ):
              ""
            }
          </Col>
          
        </Row>
        
      </Form>
    );
  };
export default AdvancedSearchForm;