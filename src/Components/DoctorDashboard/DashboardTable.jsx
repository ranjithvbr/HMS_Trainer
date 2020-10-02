import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp"
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import "./DashboardTable.css"

import dateFormat from 'dateformat';
// import Greenwalk from '../../images/greenwalk.png'
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone'
import ProfileView from './ProfileView'
const current_date=(dateFormat(new Date(),"dd mmm yyyy"))

class DashboardTable extends React.Component{
    
    state={
        openview:false
    }

    createData=(parameter) =>{
        var keys=Object.keys(parameter)
        var values=Object.values(parameter)
  
        var returnobj={}
        
        for(var i=0;i<keys.length;i++){
        returnobj[keys[i]]=values[i]
        }
        return(returnobj)
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
         
        return(
            <div>
                
                <div className="nurse_dashboard_buttons_wrap">
         <Card  component={NavLink} to="/appointments" className="nurse_button5 nurse_button_common_styles">
          <p className="nurse_button_text" >Total Appointments</p>
          <div className="divider_container"><div className="divider_1px"></div></div>
          <div className="nurse_dash_numeric_wrap"><p className="nurse_dash_numeric_value">18</p></div>
          </Card>
          <Card className="nurse_button1 nurse_button_common_styles" component={NavLink} to="/manageservice">
         <p className="nurse_button_text">Manage Services</p>
         <div className="divider_container"><div className="divider_1px"></div></div>
         <div className="nurse_dash_numeric_wrap"><p className="nurse_dash_numeric_value">4</p></div>
         </Card>
        <Card className="nurse_button3 nurse_button_common_styles" component={NavLink} to="/cancelhistory">
          <p className="nurse_button_text">Cancelled</p>
          <div className="divider_container"><div className="divider_1px"></div></div>
          <div className="nurse_dash_numeric_wrap"><p className="nurse_dash_numeric_value">5</p></div>
          </Card>
          <Card className="nurse_button2 nurse_button_common_styles">
          <p className="nurse_button_text">Total Revenue(KWD)</p>
          <div className="divider_container"><div className="divider_1px"></div></div>
          <div className="nurse_dash_numeric_wrap"><p className="nurse_dash_numeric_value">10</p></div>
          </Card>
    

      </div>
      <div className="today_Appointments"><span>Today's Appointments</span><span className="current_date">{current_date}</span></div>
             
                <Tablecomponent
                
                 heading={[
                    { id: "", label: "S.No" },
                    { id: "type", label: "Type" },
                    { id: "name", label: "Name" },
                    { id: "number", label: "Number" },
                    { id: "age", label: "Age" },
                    { id: "time", label: "Time" },
                    { id: "service", label: "Service" },
                    { id: "", label: "Action" }
                ]}
  

            rowdata={[
                this.createData({type: <PhoneIphoneIcon className="react-icon-mob" />,name: "test", number: "1", age: "35", time: "10.00 AM", service: "Consulting"}),
                // this.createData({type: <img src={crowngold} />,name: "ashwin", number: "2", age: "35", time: "10.30 AM", service: "Tooth Whitening"}),
                // this.createData({type:<img src={Greenwalk} className="head-icon"/>,name: "syed", number: "3", age: "35", time: "11.30 AM", service: "Root Canal"}),
                this.createData({type:<PhoneIphoneIcon className="react-icon-mob" />,name: "edwin", number: "4", age: "35", time: "11.30 AM", service: "Root Canal"}),
                // this.createData({type:<img src={crowngold} />,name: "arjun", number: "5", age: "35", time: "11.30 AM", service: "Root Canal"}),
                // this.createData({type:<img src={Greenwalk} className="head-icon"/>,name: "raja", number: "6", age: "32", time: "11.30 AM", service: "Root Canal"}),
                this.createData({type:<PhoneIphoneIcon className="react-icon-mob" />,name: "rani", number: "7", age: "35", time: "11.30 AM", service: "Root Canal"}),
            ]}

    tableicon_align={""}
    modelopen={(e)=>this.modelopen(e)}
    EditIcon="close"
    DeleteIcon="close"
  />
 <div className="buttons_container">
        <div>
          <Button component={NavLink} to="/availability" className="nurse_dash_bottom_buttons nurse_dash_bottom1">Availability Calendar</Button>
          <Button className="nurse_dash_bottom_buttons nurse_dash_bottom2" component={NavLink} to="/mediaupload" >Media Uploads</Button>
          <Button className="nurse_dash_bottom_buttons nurse_dash_bottom3" component={NavLink} to="/advertise">Advertisement Booking</Button>
        </div>
        </div>
        
        {/* <Modalcomp  visible={this.state.openview} title={"View details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
        </Modalcomp> */}
        <ProfileView open={this.state.openview} onClose={this.closemodal}/>

        <Modalcomp  visible={this.state.editopen} title={"Edit details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
        </Modalcomp>
              

        </div>
        )
    }
}

export default DashboardTable;