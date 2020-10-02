import React from "react";
import { Input } from "antd";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import { NavLink } from "react-router-dom";
import "./Chatwindow.css"
import UserDp from './UserDp';
import MessageMaster from './MessageMaster';

class Chatwindow extends React.Component{

    state={
        openview:false
    }

        modelopen=(data)=>{
            if(data==="view"){
                this.setState({openview:true})
            }
            else if(data==="edit"){
                this.setState({editopen:true})
            }
        }

        closemodal=()=>{
                this.setState({openview:false,editopen:false})
        }

    render(){
        
    const { Search } = Input;
         
        return(
            <div className = "first_second_div">
                <div className ="first_column_chat mt-4">
                    <UserDp/>
                </div>
                <div className ="second_column_chat">
                    <MessageMaster/>                  
                </div>
            </div>
        )
    }
}

export default Chatwindow;