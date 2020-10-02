import React from 'react'
import avatar from "../../Images/prf.png";
import "./clientsmodal.css";
import Paper from '@material-ui/core/Paper';
import LanguageIcon from "@material-ui/icons/Language";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HomeIcon from "@material-ui/icons/Home";

class Clientsmodal extends React.Component {
  state = {
    viewdata: '',
    other: "",
    fulladdress:false
  }
  componentWillReceiveProps(props) {

    if (props.viewdata)
      this.setState({
        viewdata: props.viewdata
      });


    if (props.other)
      this.setState({
        other: props.other
      });


  }
  check = (data) => {
    if (Object.keys(this.props.viewdata).length > 0) {
      var training_mode = this.props.viewdata.packageList[0].tr_training_mode;
      return training_mode.match(data);
    } else return false;
  };


  render() {
    const { viewdata, other } = this.state;
    console.log('dataare', other)
    console.log(this.props.viewdata, "datas getting")
    return (
      <>
        <div className="first_half">
          <div>
            <img src={viewdata.profile_image != null ? viewdata.profile_image : avatar} style={{ height: "150px" }} />
          </div>
          <div className="full_content" >
            <span className="contents_editing"><b style={{ fontWeight: "bold", color: "black" }}>{viewdata != '' && viewdata.name.toUpperCase()}</b></span>
            <span className="contents_editing">{viewdata != '' && viewdata.age} Years / {viewdata != '' && viewdata.gender} </span>
            <span onClick={()=>this.setState({fulladdress:!this.state.fulladdress})} className={`${!this.state.fulladdress && "fulladdress_show"} contents_editing`}>{viewdata.address?viewdata.address:"----"}
            {/* <span className="jabriya_edit" >...</span> */}
            </span>
            <span className="contents_editing">
              {this.props.other.phone_no != null && this.props.other.phone_no}</span>
            <span className="contents_editing">
              <span className="watchreport_edit">Watch Report</span></span>
          </div>
        </div>
        <div className="package_head">
          <div className="packagehistory_edit">PACKAGE HISTORY</div>
        </div>


        <Paper className="paperedit">
          <div className="store_edit">
            {this.state.viewdata.packageList && this.state.viewdata.packageList.map((val) => (

              <div>
                <div className="second_half">

                  <div className="card card_edit" >
                    <div className="button_edit">{val.tr_package_name && val.tr_package_name}</div>
                    <div className="content_parent">

                      <div className="trianing_category_edit">
                        <span className="inside_contents">Training Category</span>
                        <span className="inside_contents">Training</span>
                      </div>

                      <div className="trianing_category_edit">
                        <span className="inside_contents_top">{val.training_category}</span>
                        <span className="inside_contents_top">{val.training}</span>
                      </div>

                      <div className="trianing_category_edit">
                        <span className="inside_contents">Total Session</span>
                        <span className="inside_contents">Total Cost(KWD)</span>
                      </div>

                      <div className="trianing_category_edit">
                        <span className="inside_contents_top">{val.tr_session}</span>
                        <span className="traing_mode_oncard">

                          {val.tr_training_mode.includes(1) && (
                            <div style={{ textAlign: 'center' }}>
                              <HomeIcon className="home_icon" />
                              <p style={{ margin: "0px 5px 0px 10px" }} className="trainingmode_text">Home</p>
                            </div>
                          )}

                          {val.tr_training_mode.includes(2) && (
                            <div style={{ textAlign: 'center' }}>
                              <LanguageIcon className="lang_icon_clr" />
                              <p style={{ margin: "0px 5px 0px 5px" }} className="trainingmode_text">Online</p>
                            </div>
                          )}

                          {val.tr_training_mode.includes(3) && (
                            <div style={{ textAlign: 'center' }}>
                              <LocationOnIcon className="location_icon_clr" />
                              <p style={{ margin: "0px 5px 0px 5px" }} className="trainingmode_text">Center</p>
                            </div>
                          )}
                        </span>

                        <span className="inside_contents_top">{val.tr_cost}</span>
                      </div>
                    </div>
                    <div className="border_edit"></div>
                    <span className="fasttrack_edit">{val.tr_package_details}
                    </span>
                  </div>
                </div>
              </div>
            ))

            }
          </div>
        </Paper>

      </>

    )
  }
}
export default Clientsmodal;
