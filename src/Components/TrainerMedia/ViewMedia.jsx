import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Labelbox from '../../helpers/labelbox/labelbox'
// import Button from '@material-ui/core/Button';
// import Dialog from "@material-ui/core/Dialog";
import './ViewMedia.css'
import Profile from '../../Images/trainee_img.jpg' ;
// import CloseIcon from '@material-ui/icons/Close';
const styles = {};

export default class ViewMedia extends Component {
    render() {
        const styles = "";
        const { classes, onClose, cancel, selectedValue, ...other } = this.props;
    
        return (
            <>
        
            <div>
                <Grid container>
                    <Grid item xs={12} md={6} className="media_title_container">
                    <Labelbox type="text" labelname="Media Title" />
                    <p className="media_active_view">Active</p>
                    </Grid>
                    <Grid item xs={12} md={6} style={{display:"flex",justifyContent:"flex-end"}}> 
                    <div className="mediauploads_img_edit">
                    <img src={Profile} className="view_media_img"/>
                    </div>    
                    </Grid> 
                </Grid>
            </div>
            </>
        )
    }
}
