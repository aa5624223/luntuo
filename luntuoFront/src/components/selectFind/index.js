import React, { Component } from 'react'
import { Select } from 'antd';
const { Option } = Select;
export default class selectFind extends Component {
    getOptions=()=>{
        const {options} =this.props;
        console.dir(this.props)
        return options().map(item=><Option key={item.value+item.text} value={item.value}>{item.text}</Option>)
    }
    render() {
        const {width} = this.props;
        return (
            <Select
                showSearch
                style={{ width: width }}
                placeholder="Select a person"
                optionFilterProp="children"
            >
                {this.getOptions()}
            </Select>
        )
    }
}
