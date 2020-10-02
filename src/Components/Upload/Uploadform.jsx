import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import "./Uploadform.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Upload } from "antd";
import uploadimage from "../../Images/upload-button.png";
export default class Uploadform extends Component {
  render() {
    return (
      <div className="upload_form_container">
        <Grid container spacing={3} style={{ marginTop: "0px", width: "100%" }}>
          <Grid container spacing={3} xs={12}>
            <Grid item xs={12} md={6}>
              <Labelbox
                className="label-box"
                labelname="Media Title"
                type="text"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="uploadfiles-wrapper">
                <p className="upload_text"> Upload</p>
                <Upload className="upload-field">
                  <div className="upload-button">
                    <Button className="Button-container">
                      Browse File{" "}
                      <div className="uploadimage-container">
                        <img className="uploadimage" src={uploadimage} />
                      </div>
                    </Button>
                  </div>
                </Upload>
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <Labelbox
                className="label-box"
                labelname="Description"
                type="textarea"
              />
            </Grid>
          </Grid>
          <div className="Active_Checkbox-container">
            <FormControlLabel
              value="active"
              control={<Checkbox color="green" />}
              label="Active"
              labelPlacement="end"
            />
          </div>
          <span className="button-container">
            <Button className="Upload">Upload</Button>
            <Button className="Cancel-form" onClick={()=>this.props.closemodal(false)}>Cancel</Button>
          </span>
        </Grid>
      </div>
    );
  }
}
