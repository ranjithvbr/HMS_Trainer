import React, { Component } from 'react';
import Paper from '@material-ui/core/Card'
import Logo from '../../Images/Logo.png';
import TextField from '@material-ui/core/TextField';
// import Submitimage from '../../images/login-button image.png';
// import Checkbox from '@material-ui/core/Checkbox'
import Trainer_image from '../../Images/trainer.png'
import './Forgot.css'
import { Button, notification, Divider, Space } from 'antd';
import Grid from '@material-ui/core/Grid';
// import Email from '../../images/envelope.png'
// import Eye from '../../Images/eye.svg'
// import SearchIcon from "@material-ui/icons/Search";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Inbox from '../../Images/inbox.svg'
import {Link,NavLink} from "react-router-dom";
import links from "../../helpers/Constant";
import axios from "axios";
import moment from "moment";



export default class Forgot extends Component {
 constructor(props)
  {
    super(props);
     this.state={email:null,hidden:true}
  }
  toggleshow=()=>
  {
    this.setState({hidden:!this.state.hidden})
    console.log("i am clicked",this.state.hidden)
  }
  onchange=(e)=>
  {
    this.setState({email:e.target.value})
  }



   validateEmail=(email)=> {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     console.log('tseg', re.test(email))
 
  return re.test(email);
}



  
  resetPassword=()=>{ 

     if(this.state.email == null || this.state.email ==undefined)
    {
      notification.error({
        message: "Enter your registered emailid",
        description:
          ''
      });
      return;

     } else if (!this.validateEmail(this.state.email)){
  notification.error({
    message: "Enter valid emailid",
        description:
          ''
      });
      return ; 
     }
     
    var self = this
    axios({
      method: 'POST',
      url: links.APIURL + 'trainer/trainerLoginWeb',
      data: {
        "email": this.state.email,
        "password":this.state.password
      }
    })
      .then((response) => { 
        if(response.data.status==1){
          self.setState({ draweropen: true }) ;
          notification.success({
    message: 'Login Successfull',
    description:
      'Welcome to Dashboard'
  });  
          
  localStorage.setItem("trainerId", response.data.data[0].vendor_id); 
          localStorage.setItem("userId", response.data.data[0].id);
          localStorage.setItem("trainer", JSON.stringify(response.data.data[0])); 
    this.props.history.push("/Home/Dashboard");


        }else
        { 
           notification.error({
    message: response.data.msg,
  });


        }
       

      })

    
    
  }




    render() {
  
       return (
              <div className="pharmacy_forget_container">
              <Grid container>
              <Grid item xs={12} md={7} className="pharmacy_image_grid">
                    <div className="pharmacy_image_container">
                    <div className="pharmacy_image_div">
                    <div className="pharmacy_image_login">
                       <img src={Trainer_image} alt="1" className="pharmacy_image"/>
                         {/* <p className="pharmacy_text">PHARMACY</p> */}
                    </div>
                  </div>
                  </div>
                    </Grid>
               
       <Grid item xs={12} md={5} className="pharmacy_grid_container">
       <div className="pharmacy_main_container">
        
         <div className="pharmacy_paper_div">
              <div className="pharmacy_text_container">
              <div className="logo_container"><div className="logo_div"><img className="logo_image" src={Logo}/></div></div>
                 <div className="pharmacy_Welcometext-container"><p className="Welcometext">REQUEST NEW PASSWORD</p></div>
                {/*  <div className="password_text">Enter the current email address associated with your ONE MOMENT</div>
                 <div className="password_text">account, then click submit.We'll email you a link to a page where you can</div>
                 <div className="password_text">easily create a new password</div> */}
                 <div className="pas_msg">
                 Enter the current email address associated with your ONE MOMENT account, then click submit.We'll email you a link to a page where you can easily create a new password
                 </div>
                 
                 <div className="pharmacy_email_container"><TextField type="text" placeholder=""   onChange={this.onchange}  value={this.state.email} label="EMAIL"

                  InputProps={{
    endAdornment: (
      <InputAdornment>
        <IconButton>
        <img className="inbox_icon" src={Inbox}/>
        </IconButton>
      </InputAdornment>
    )
  }}/>
                 </div>
          
                 
                 
                 <div className="pharmacy_submit_container"><button className="login"  onClick={this.resetPassword}>Submit</button></div>

                     <div className="cancel_container"><a className="cancelbutton" onClick={()=>this.props.history.push('/login')}>Cancel</a></div>
                </div>
                       </div>
                       </div>
              </Grid>
                    
                 
                </Grid>
                </div>
                      

                )
            }
        }
       