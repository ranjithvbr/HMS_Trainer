import React,{Component} from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import Moment from 'react-moment';
import Paper from '@material-ui/core/Paper';
// import './PharmacyEntryMaster'
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox'
import Button from '@material-ui/core/Button';
import './BasicDetails.css';
import HomeIcon from '@material-ui/icons/Home';
import LanguageIcon from '@material-ui/icons/Language';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Checkbox from '@material-ui/core/Checkbox';
 import ValidationLibrary from "../../helpers/validationfunction";
 
export default class BasicDetails extends React.Component{

    constructor(props) 
    {
    super(props)
    this.state={
        home:0,
        loc: 0,
        lang:0,
        labmanage_test: {
            'vendor_address': {
                'value': props.data.vendor_address,
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null,
            },
            'vendor_email': {
                'value': props.data.vendor_email,
                validation: [{ 'name': 'email' }, { 'name': 'required' }],
                error: null,
                errmsg: null,
            }, 
            'vendor_website' : {
                'value': props.data.vendor_website,
               validation: [{ 'name': 'required' },{'name': 'webUrl' }],
               error: null,
               errmsg: null,
           },
            'vendor_phone': {
                'value': props.data.vendor_phone,
                validation: [{ 'name': 'required' }, { 'name': 'mobile' }],
                error: null,
                errmsg: null,
            },
             'trainerName': {
                 'value': props.data.trainerName,
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null,
            },
            
        },
        trainerId: localStorage.getItem("trainerId"),
       
    } 
    console.log("sdfkjsdhfjkshdf",this.props)
}

     handleHomeChange = (event) => {
         console.log(event.target.checked)
       this.setState({
           home: event.target.checked?1:0
       },()=>{
               this.props.update({
                   "trainerId": this.state.trainerId,
                   "trainerName": this.state.labmanage_test.trainerName.value,
                   "ccode": "91",
                   "trainerPhoneNumber": this.state.labmanage_test.vendor_phone.value,
                   "trainerEmail": this.state.labmanage_test.vendor_email.value,
                   "trainerWebsite": this.state.labmanage_test.vendor_website.value,
                   "trainerAddress": this.state.labmanage_test.vendor_address.value,
                   "trainingMode": this.state.home + ',' + this.state.lang + ',' + this.state.loc
               })
       }
       );
    };

   

     handleLangChange = (event) => {
       this.setState({
           lang: event.target.checked ? 2 : 0
       },()=>{
               this.props.update({
                   "trainerId": this.state.trainerId,
                   "trainerName": this.state.labmanage_test.trainerName.value,
                   "ccode": "91",
                   "trainerPhoneNumber": this.state.labmanage_test.vendor_phone.value,
                   "trainerEmail": this.state.labmanage_test.vendor_email.value,
                   "trainerWebsite": this.state.labmanage_test.vendor_website.value,
                   "trainerAddress": this.state.labmanage_test.vendor_address.value,
                   "trainingMode": this.state.home + ',' + this.state.lang + ',' + this.state.loc
               })
       }
       );
    };


     handleLocChange = (event) => {
       this.setState({
           loc: event.target.checked ? 3 : 0
       },()=>{
               this.props.update({
                   "trainerId": this.state.trainerId,
                   "trainerName": this.state.labmanage_test.trainerName.value,
                   "ccode": "91",
                   "trainerPhoneNumber": this.state.labmanage_test.vendor_phone.value,
                   "trainerEmail": this.state.labmanage_test.vendor_email.value,
                   "trainerWebsite": this.state.labmanage_test.vendor_website.value,
                   "trainerAddress": this.state.labmanage_test.vendor_address.value,
                   "trainingMode": this.state.home + ',' + this.state.lang + ',' + this.state.loc
               })
       }
       );
    };



changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);

    var labmanage_test = this.state.labmanage_test;
    var targetkeys = Object.keys(labmanage_test);
     var errorcheck = ValidationLibrary.checkValidation(data, labmanage_test[key].validation);
    
    labmanage_test[key].value = data;
    labmanage_test[key].error = !errorcheck.state;
    labmanage_test[key].errmsg = errorcheck.msg; 
    console.log('val', labmanage_test)
    this.setState({ labmanage_test },()=>{
        this.props.update({
            "trainerId": this.state.trainerId,
            "trainerName": this.state.labmanage_test.trainerName.value,
            "ccode": "91",
            "trainerPhoneNumber": this.state.labmanage_test.vendor_phone.value,
            "trainerEmail": this.state.labmanage_test.vendor_email.value,
            "trainerWebsite": this.state.labmanage_test.vendor_website.value,
            "trainerAddress": this.state.labmanage_test.vendor_address.value,
            "trainingMode": this.state.home + ',' + this.state.lang + ',' + this.state.loc
        })
    });
    var filtererr = targetkeys.filter((obj) =>
        labmanage_test[obj].error == true || labmanage_test[obj].error == null);
    if (filtererr.length > 0) {

        this.props.updateError(true)
        this.setState({
            error: true,
            errordummy: false
        }) 
       
    } else {
        this.setState({ error: false })
        this.props.updateError(false)
    }
}

checkValidation = () => {
    console.log('checkvalid')
    var labmanage_test = this.state.labmanage_test;
    var targetkeys = Object.keys(labmanage_test);
    console.log(targetkeys);
    for (var i in targetkeys) {
        var errorcheck = ValidationLibrary.checkValidation(labmanage_test[targetkeys[i]].value, labmanage_test[targetkeys[i]].validation);
        console.log(errorcheck);
        labmanage_test[targetkeys[i]].error = !errorcheck.state;
        labmanage_test[targetkeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = targetkeys.filter((obj) =>
        labmanage_test[obj].error == true);
    console.log(filtererr.length)
    if (filtererr.length > 0) {
        console.log('true')
        this.setState({ error: true })
        this.props.updateError(true)
    }
    else {
        console.log('false')
        this.setState({ error: false })
        this.props.updateError(false)

    }
    this.setState({ labmanage_test })
}


  check =(data)=>{
       const { training_mode} = this.props.data;

    if (Object.keys(this.props.data).length >0){
      return training_mode.match(data); 
    }else
    return false
    
  }

componentWillMount = () => { 
    console.log('trainingmode',this.props.data)
   
   
     if(this.check(1)){
         console.log('called')
         this.setState({ home: 1 });
     }
    

       if(this.check(2)){
           console.log('called1')
           this.setState({ lang: 2 });
       }
     


    if (this.check(3)){
        console.log('called2')
        this.setState({ loc: 3 });
    }
       



 
};



componentDidMount = () => {
     this.props.update({
        "trainerId": this.state.trainerId,
        "trainerName": this.state.labmanage_test.trainerName.value,
        "ccode": "91",
        "trainerPhoneNumber": this.state.labmanage_test.vendor_phone.value,
        "trainerEmail": this.state.labmanage_test.vendor_email.value,
        "trainerWebsite": this.state.labmanage_test.vendor_website.value,
        "trainerAddress": this.state.labmanage_test.vendor_address.value,
        "trainingMode": this.state.home + ',' + this.state.lang + ',' + this.state.loc
    })
    this.checkValidation()
};

render()
{
    return(
        <div className = "container">
            <div className="basic_details_container">
                <Grid container>
                    <Grid item xs={12} md={6} className="basicdetails_container">
                        <div className="basicdetails_firstgrid">
                            <div className="basicdetails_child">
                                <Labelbox type="text" 
                                labelname="Address" 
                              
                                    changeData={(data) => this.changeDynamic(data,'vendor_address')}
                                    value={this.state.labmanage_test.vendor_address.value}
                                    error={this.state.labmanage_test.vendor_address.error}
                                    errmsg={this.state.labmanage_test.vendor_address.errmsg}

                                />
                                {/* <Labelbox type="text" labelname="Contact  Person" 
                                    changeData={(data) => this.changeDynamic(data, 'trainerName')}
                                    value={this.state.labmanage_test.trainerName.value}
                                    error={this.state.labmanage_test.trainerName.error}
                                    errmsg={this.state.labmanage_test.trainerName.errmsg}
                                
                                /> */}
                                 <Labelbox type="text" labelname="Email Id"
                                    changeData={(data) => this.changeDynamic(data, 'vendor_email')}
                                    value={this.state.labmanage_test.vendor_email.value}
                                    error={this.state.labmanage_test.vendor_email.error}
                                    errmsg={this.state.labmanage_test.vendor_email.errmsg} />
                                    <Labelbox type="text" labelname="Website"
                                    changeData={(data) => this.changeDynamic(data, 'vendor_website')}
                                    value={this.state.labmanage_test.vendor_website.value}
                                    error={this.state.labmanage_test.vendor_website.error}
                                    errmsg={this.state.labmanage_test.vendor_website.errmsg} />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} className="basicdetails_container">
                        <div className="basicdetails_firstgrid">
                            <div className="basicdetails_child">
                                <Labelbox type="number" labelname="Mobile Number" 
                                    changeData={(data) => this.changeDynamic(data, 'vendor_phone')}
                                    value={this.state.labmanage_test.vendor_phone.value}
                                    error={this.state.labmanage_test.vendor_phone.error}
                                    errmsg={this.state.labmanage_test.vendor_phone.errmsg}
                                    
                                    />
                                    {/* <div  className = "icons_size">
                        <div className ="training_basic_profile">Training Mode</div>
                        <Checkbox checked={this.state.home}
                         className="checkbox_height"
                          onChange={this.handleHomeChange}
                          value={1}
                          />
                            <HomeIcon className = "home_icon_clr"/>
                        <Checkbox checked={this.state.lang} className="checkbox_height" 
                        onChange={this.handleLangChange} value={2}/>
                            <LanguageIcon  className = "lang_icon_clr"/>
                        <Checkbox checked={this.state.loc} className="checkbox_height" onChange={this.handleLocChange} value={3}/>
                            <LocationOnIcon  className = "location_icon_clr"/>
                    </div> */}
                               
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Grid item xs={12} md ={12}>
                    {/* <div  className = "icons_size">
                        <div className ="training_basic_profile">Training Mode</div>
                        <Checkbox checked={this.state.home}
                         className="checkbox_height"
                          onChange={this.handleHomeChange}
                          value={1}
                          />
                            <HomeIcon className = "home_icon_clr"/>
                        <Checkbox checked={this.state.lang} className="checkbox_height" 
                        onChange={this.handleLangChange} value={2}/>
                            <LanguageIcon  className = "lang_icon_clr"/>
                        <Checkbox checked={this.state.loc} className="checkbox_height" onChange={this.handleLocChange} value={3}/>
                            <LocationOnIcon  className = "location_icon_clr"/>
                    </div> */}
                </Grid> 

                 
            </div>
        </div>
    )
}
}
