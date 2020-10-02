import React, { Component } from 'react';
import Paper from '@material-ui/core/Card'
import Logo from '../../Images/Logo.png';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox'
import Trainer_image from '../../Images/Trainer_login.png'
import './Trainer_forgotpass.css'
import Grid from '@material-ui/core/Grid';
import Email from '../../Images/inbox.svg';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default class TrainerForget extends Component {
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
              <div className="trainer_forget_container">
              <Grid container>
              <Grid item xs={12} md={7} className="trainer_image_grid">
                    <div className="trainer_image_container">
                    <div className="trainer_image_div">
                    <div className="trainer_image_login">
                       <img src={Trainer_image} alt="1" className="trainer_image"/>
                         <p className="trainer_text">TRAINER</p>
                    </div>
                  </div>
                  </div>
                    </Grid>         
     
                    <Grid item xs={12} md={5} className="trainer_grid_container">
       <div className="trainer_main_container">
        
         <div className="trainer_paper_div">
              <div className="trainer_text_container">
              <div className="logo_container">
                  <div className="logo_div">
                      <img className="logo_image" src={Logo}/>
                  </div>
              </div>
                <div className="trainer_Welcometext-container">
                     <p className="Welcometext">REQUEST NEW PASSWORD</p>
                </div>
                     <div>
                     <p className = "text_align_span">Enter thye current email address associated with your ONE MOMENT account,then click 
                       submit. We'll email youn a link to a page where you caneasily create a new password</p>
                     </div>
                
                 <div className="trainer_email_container"><TextField type="text" placeholder="divya@gmail.com"  type={this.state.hidden ? "password" : "text"} onChange={this.onchange}  value={this.state.password} label="Email"

                  InputProps={{
    endAdornment: (
      <InputAdornment>
        <IconButton>
          <img className="inbox_icon" src={Email} onClick={this.toggleshow}/>
        </IconButton>
      </InputAdornment>
    )
  }}/>
                 </div>
          
                 
                 
                 <div className="trainer_submit_container"><button className="login">Submit</button></div>
                 <div className="cancel_container"><a className="cancelbutton">Cancel</a></div>
                </div>
                       </div>
                       </div>
              </Grid>
                    
                    
                 
                </Grid>
                </div>
                      

                )
            }
        }
       