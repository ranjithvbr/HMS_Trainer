import React, { Component } from 'react';
import Paper from '@material-ui/core/Card'
import Logo from '../../Images/Logo.png';
import TextField from '@material-ui/core/TextField';
import { Button, notification, Divider, Space } from 'antd';
// import Submitimage from '../../images/login-button image.png';
import Checkbox from '@material-ui/core/Checkbox'
import Trainer_image from '../../Images/trainer.png'
import './Login.css'
import Grid from '@material-ui/core/Grid';
// import Email from '../../Images/envelope.png'
import Eye from '../../Images/eye.svg';
import SearchIcon from "@material-ui/icons/Search";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Inbox from '../../Images/inbox.svg'
import links from "../../helpers/Constant";
import axios from "axios";
import moment from "moment"; 
// import Doctor from '../../images/doctorlogin.png'
import {Link,NavLink} from "react-router-dom";
import AppRouter from '../../routers'; 





export default class Login extends Component {
  constructor(props)    
  {
    super(props);
     this.state={email:"",password:"",hidden:true,draweropen:false}
  }





  toggleshow=()=>
  {
    this.setState({hidden:!this.state.hidden})
    console.log("i am clicked",this.state.hidden)
  }
  onchange=(e)=>
  {
    this.setState({password:e.target.value})
  }

  onchangeEmail = (e) => {
    this.setState({ email: e.target.value })
  }

  draweropen=()=>{ 
    if (this.state.email == null || this.state.email ==undefined)
    {
      notification.error({
        message: "Email is required",
        description:
          ''
      });
      return;

    } else if (this.state.password == null || this.state.password == undefined){
      notification.error({
        message: "Password is required",
        description:
          ''
      });
      return;
   
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
  fogotpush = () => {
    this.props.history.push("/forgot")
  }

    render() {
  
       return (<div>
          {this.state.draweropen===false&&
              <div className="pharmacy_login_container">
              <Grid container>
              <Grid item xs={12} md={7} className="pharmacy_image_grid">
                    <div className="pharmacy_image_container">
                    <div className="pharmacy_image_div">
                    <div className="pharmacy_image_login">
                    <div>
                       <img src={Trainer_image} alt="1" className="pharmacy_image"/>
                        </div>
                    </div>
                  </div>
                  </div>
                    </Grid> 

              

               
       <Grid item xs={12} md={5} className="pharmacy_grid_container">
       <div className="pharmacy_main_container">
        
         <div className="pharmacy_paper_div">
              <div className="pharmacy_text_container">
              <div className="logo_container"><div className="logo_div"><img className="logo_image" src={Logo}/></div></div>
                 <div className="pharmacy_Welcometext-container"><p className="Welcometext">WELCOMES YOU</p></div>
                 <div className="pharmacy_email_container">
                 <TextField   type="text"  placeholder="example@gmail.com"  label="EMAIL"
                       onChange={this.onchangeEmail}
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
                 
                 <div className="password_container"><TextField  type={this.state.hidden ? "password" : "text"} onChange={this.onchange}  value={this.state.password} placeholder="" className="trrainer_password" label="PASSWORD"  
                 
                  InputProps={{
    endAdornment: (
      <InputAdornment>
        <IconButton>
          <img className="logineye_icon" src={Eye} onClick={this.toggleshow}/>

        </IconButton>
      </InputAdornment>
    )
  }}/>
                 
                 </div>
                 <div className="login_button_container">
                 <button className="login" onClick={this.draweropen} >Login</button>
                 </div>
                 <div className="cancel_container">
                  
                     <p className="cancelbutton" onClick={this.fogotpush}>Forgot Password?</p>
                    
                   </div>
                </div>
                       </div>
                       </div>
              </Grid>
                    
                 
                </Grid>
                </div>}
                </div>
                      

                )
            }
        }
       