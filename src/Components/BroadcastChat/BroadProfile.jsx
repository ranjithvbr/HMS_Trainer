import React from 'react';
import './Broadcastwindow.css';
import { Select } from 'antd';

const { Option } = Select;

function handleChange(value) {
    console.log(`selected ${value}`);
  }

class BroadProfile extends React.Component{
    render(){
        return(
            <div>
                <div>
                   <label className="select_package_broadprofile">Select Package</label>
                </div>
                <div className ="chat_select_width">
                <Select  defaultValue="Fitness" onChange={handleChange}>
                    <Option  value="indoor">Indoor</Option>
                    <Option value="option 1">Option 1</Option>
                    <Option value="option 2">Option 2</Option>
                </Select>
                </div>
              
            </div>
                        )
    }
}
export default BroadProfile