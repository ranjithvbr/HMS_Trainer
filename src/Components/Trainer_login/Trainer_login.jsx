import React, { Component } from 'react';
import Paper from '@material-ui/core/Card'
import Logo from '../../Images/Logo.png';
import TextField from '@material-ui/core/TextField';
import Trainer_image from '../../Images/Trainer_login.png'
import './Trainer_login.css'
import Grid from '@material-ui/core/Grid';
import Email from '../../Images/inbox.svg'
import Eye from '../../Images/eye.svg'
// import SearchIcon from "@material-ui/icons/Search";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
// import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default class Trainer_login extends Component {
    constructor(props)
    {
      super(props);
       this.state={password:"",hidden:true}
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
  
        render() {  
           return (
              <div className="trainer_login_container">
              <Grid container>
                 <Grid item xs={12} md={7} className="trainer_image_grid">
                    <div className="trainer_image_container">
                    {/* <div className="trainer_image_div"> */}
                    {/* <div className="trainer_image_login"> */}
                    <div>
                       <img src={Trainer_image} className="trainer_image"/>
                        <p className="trainer_text">TRAINER</p>
                        </div>
                    </div>
                  {/* </div> */}
                  {/* </div> */}
                    </Grid>
               
       <Grid item xs={12} md={5} className="trainer_grid_container">
       <div className="trainer_main_container">
                     <div className="logo_div">
                        <img className="logo_image" src={Logo}/>
                    </div>
        
         <div className="trainer_paper_div">
              <div className="trainer_text_container">
                <div className="logo_container">
              
                </div>
                 <div className="trainer_Welcometext-container"><p className="Welcometext">WELCOMES YOU</p></div>
                 <div className="trainer_email_container"><TextField   type="text"  placeholder="priya@gmail.com"  label="EMAIL"

                  InputProps={{
    endAdornment: (
      <InputAdornment>
         <IconButton>
          <img className="inbox_icon" src={Email}/>
        </IconButton> 
      </InputAdornment>
    )
  }}/>
                 </div>
                 
                 <div className="password_container"><TextField type={this.state.hidden ? "password" : "text"}   onChange={this.onchange}  placeholder="" className="trrainer_password" label="PASSWORD"  
                 
                  InputProps={{
    endAdornment: (
      <InputAdornment>
         <IconButton>
          <img className="inbox_icon" src={Eye} onClick={this.toggleshow}/>

        </IconButton>
      </InputAdornment>
    )
  }}/>
                 
                 </div>
                 <div className="login_button_container">
                 <button className="login">Login</button>
                 </div>
                 <div className="cancel_container"><a className="cancelbutton">Forget Password?</a></div>
                </div>
                       </div>
                       </div>
              </Grid>
                    
                 
                </Grid>
                </div>
                      

                )
            }
        }