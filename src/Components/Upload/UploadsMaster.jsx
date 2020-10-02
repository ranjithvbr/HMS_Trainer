import React, { Component } from "react";
import plus from "../../Images/plus.png";
import Grid from "@material-ui/core/Grid";
import "./UploadsMaster.css";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import Uploadform from "./Uploadform";
import Uploaddetails from "./Uploaddetails";

export default class UploadsMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleClickopen = () => {
    this.setState({ open: true });
  };
  handleClickclose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="uploadmaster">
        <div className="uploadsmasterheader">
          <Grid container>
            <Grid items xs={6} md={6}>
              <div className="titleuser">MEDIA UPLOADS</div>
            </Grid>
            <Grid items xs={6} md={6}>
              <div className="plus-container">
                <img
                  className="plus-icon"
                  src={plus}
                  alt={"hi"}
                  onClick={this.handleClickopen}
                />
              </div>
            </Grid>
          </Grid>
        </div>
        <Uploaddetails />
        <div className="Upload-modal-container">
          <Modalcomp
            visible={this.state.open}
            closemodal={this.handleClickclose}
            title={"Create a User"}
          >
            <Uploadform visible={this.state.open}
            closemodal={this.handleClickclose}/>
          </Modalcomp>
        </div>
      </div>
    );
  }
}
