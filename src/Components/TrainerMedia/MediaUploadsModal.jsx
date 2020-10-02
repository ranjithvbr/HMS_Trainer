import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import "./MediaUploadsModal.css";
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from "@material-ui/core/Checkbox";
import { Upload } from "antd";
import { FiInfo } from "react-icons/fi";
import uploadimage from "../../Images/upload-button.png";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import UploadMedia from "./UploadMedia";

export default class MediaUploadsModal extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <>
        <div
          className={`trainer_mrdiauploads ${
            this.state.open === true && "d-none"
          }`}
        >
          <Grid container spacing={3}>
            {/* MEDIA TITLE LABEL*/}
            <Grid item xs={12} md={6}>
              <div className="media_title_head">
                <Labelbox type="text" labelname="Media Title" />
              </div>
            </Grid>
            {/*UPLOAD LABEL */}
            <Grid item xs={12} md={6}>
              <div className="trainermedia_upload">
                Upload
                <span>
                  <FiInfo className="info_icon" onClick={this.handleOpen} />
                </span>
              </div>
              <div className="trainerload_container">
                <Upload className="upload-field">
                  <div className="trainermedia_button">
                    <Button className="tarinerButton_container">
                      myimage.mp4
                      <div className="uploadimage-container">
                        <img className="uploadimage" src={uploadimage} />
                      </div>
                    </Button>
                  </div>
                </Upload>
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div className="trainermedia_checkbox">
                <Labelbox
                  type="textarea"
                  labelname="Description"
                  placeholder="optional Text"
                />
              </div>
              <div className="media_checkbox_container">
                <Checkbox />
                <span className="media_active">Active</span>
              </div>
              <div className="tarinermediabutton_container">
                <Button className="media_upload">Cancel</Button>
                <Button
                  className="mediacancel_form"
                  onClick={() => this.props.closemodal(false)}
                >
                  Update
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
        <Modalcomp
          clrgreen
          title="UPLOAD INSTRUCTIONS"
          visible={this.state.open}
          closemodal={this.handleClose}
        >
          <UploadMedia />
        </Modalcomp>
      </>
    );
  }
}
