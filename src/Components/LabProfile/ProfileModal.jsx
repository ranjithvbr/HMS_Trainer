import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Profile from '../../Images/trainee_img.jpg'
import { Upload, Icon, message } from 'antd';
import Labelbox from '../../helpers/labelbox/labelbox'
import BasicDetails from './BasicDetails'
import './ProfileModal.css'; 
import links from "../../helpers/Constant";
import axios from "axios";
import moment from "moment"; 
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon className="closeicon_title"/>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Modalcomp extends React.Component {
  constructor(props) {
    super(props);
    console.log('imae',props.editdata.vendor_profile_path);
    this.state = { 
      open: false, 
      basicdetails: true,
       Workingdetails: false,
      file: null,
      imageUrl: null,
      error:false,
      data:{}
  };
   

  }
  
        handleChange = info => {
        
          if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
          }
          if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
              this.setState({
                imageUrl,
                loading: false,
                file: info.file.originFileObj
              }),
            ); 

            // this.setState({
            //   file:info.file.originFileObj
            // })
          
            this.props.savefile(info.file.originFileObj)

          }
        }; 


  updateProfile=(data)=>{  
    console.log('called', data);
    this.setState(
      {data:data}
    );
  } 

   saveProfile=()=>{  
    var data  = this.state.data;
     data.uploadFile = this.state.file;
    console.log('called',data); 

    if(this.state.error ==true)
    {
      alert('Please check fields')
      return;
    }

     const postdata = new FormData();
     postdata.append('uploadFile', this.state.file);
     postdata.append('trainerId', this.state.data.trainerId);
     postdata.append('trainerName', this.state.data.trainerName);
     postdata.append('ccode', this.state.data.ccode);
     postdata.append('trainerPhoneNumber', this.state.data.trainerPhoneNumber);
     postdata.append('trainerEmail', this.state.data.trainerEmail);
     postdata.append('trainerWebsite', this.state.data.trainerWebsite);
     postdata.append('trainerAddress', this.state.data.trainerAddress);
     postdata.append('trainingMode', this.state.data.trainingMode);

    var self = this
    axios({
      method: 'POST',
      url: links.APIURL + 'trainer/updateTrainerProfileWeb',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: postdata
    })
      .then((response) => {
        console.log(response, "response_data")
        if(response.data.status==1){
          self.props.getdatacall()
          self.props.onClose(false)
          this.props.profileDetails()
        }
        else
          alert(response.data.msg)
       
      })
  }



  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };
  basicdetailsfn=()=>
  {
    this.setState({basicdetails:true,Workingdetails:false}) 
  }
  Workingdetailsfn=()=>
  { 
    this.setState({Workingdetails:true,basicdetails:false})
  }
  handleClose = (value) => {
    this.setState({ open: false });
    console.log(this.state.open)
  };
  handleClickClose=()=>
  {
    this.setState({open:false})
  }
  Cancel=()=>
  {
    this.setState({open:false})   
    console.log(this.state.open)  
  } 


  
  updateError=(value)=>{
    console.log('error',value)
    this.setState({error:value});
  }
  render() {

    const {editdata} = this.props;
    console.log('modalopemn',editdata)
     const uploadButton = (
          <div>
            <div className="upload-icon"><i class="fa fa-user-plus"></i></div>
          </div>
        );


       const { imageUrl } = this.state; 
    console.log(imageUrl);
    return ( 


      <div className="labmodaldiv_profile">
       
        <Dialog className="Dialogmodaltitle"
            onClose={this.props.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.props.open}
            maxWidth={this.props.xswidth ? 'xs' : 'md'}
            fullWidth={true}
            disableBackdropClick={true}
        >
          <DialogTitle id="customized-dialog-title" className="labModaltitle" onClose={this.props.onClose}>
              <div className="profile_container"> 
              <div className="profile_imagediv"> <div className="User-upload-container"><Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                    >
                      {imageUrl ? <img src={imageUrl} className="upload-img-circle" alt="avatar" style={{ width: '90px',height:'90px' }} /> : <img src={editdata.vendor_profile_path} className="upload-img-circle" 
                    alt="avatar" style={{ width: '90px',height:'90px' }} />}
                {/* {editdata.vendor_profile_path ? <img src={editdata.vendor_profile_path} className="upload-img-circle" 
                    alt="avatar" style={{ width: '90px',height:'90px' }} /> : uploadButton} */}
                    </Upload></div></div>
                    <div className="basic_details_head">Basic Details</div>
                </div> 
                                    
          </DialogTitle>

          <DialogContent dividers className="DialogContent">
                <div>
              <BasicDetails 
              data={this.props.editdata}
               closemodal={() => this.props.onClose(false)} 
                callget={()=>this.props.getdatacall()} 
                update={this.updateProfile}
                updateError={this.updateError}
                />
                  <div className="modalbuttons_container"><div><div><Button className="cancel_button" variant="contained" onClick={()=>this.props.onClose(false)}>Cancel</Button></div></div>
                <div><div><Button className="update_button" variant="contained" color="primary" 
                onClick={() => this.saveProfile()}
                >Update</Button></div></div> 
                  </div>
                </div>
            </DialogContent>`
          
        </Dialog>
      </div>
    );
  }
}

export default Modalcomp;
