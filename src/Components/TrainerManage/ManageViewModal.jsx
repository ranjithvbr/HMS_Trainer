import React from 'react'
import './ManageViewModal.css';
import HomeIcon from "@material-ui/icons/Home";
import LanguageIcon from "@material-ui/icons/Language";
import LocationOnIcon from "@material-ui/icons/LocationOn";


class ManageViewModal extends React.Component {

  render() {
    const { view, category } = this.props;
    console.log('listare', view)
    return (
      <React.Fragment>
        <div className="modal_font ">
          {
            view.length > 0 &&
            view.map((item, i) => {
              return (
                <div className="card manage_card_arrange">
                  <div className="column_one">
                    <p>{item.tr_package_name}</p>
                    <p>{item.tr_session} Session</p>
                    <p>{item.tr_cost} (KWD)</p>
                  </div>
                  <div className="column_two">
                    <div className="package_flex_column" style={{ display: 'flex', color: "#333", fontSize: "15px" }}>
                      <div style={{ display: 'flex' }}>
                        <p>{this.props.trainingcategory}</p>
                        <p style={{ margin: '0px 5px' }}>-</p>
                        <p>{this.props.training}</p>
                        <p className="activ_stats">{item.tr_package_status?"Active" : "In-Active"}</p>
                      </div>
                      <div>
                        <div>
                          {item.tr_reschedule?"Reschedulable":"Not-Reschedulable"}
                            </div>
                      </div>
                    </div>

                    <p className="feature_head">Keywords</p>
                    <div className="key_container">
                      <p>
                        {/* {console.log(view[0].featuresList.length,"view.length")}
                        {console.log(index,"view.length")}

                      {view.length-1 === index ?
                        item.featuresList.map((list) => list.featureName + " , ")
                      :item.featuresList.map((list) => list.featureName)
                      } */}
                      {
                        item.featuresList.map((list,index) => {
                          if(view[0].featuresList.length-1 !== index){
                            return list.featureName + " , "
                          }else{
                            return list.featureName
                          }
                        }
                        )
                      }
                      </p>

                      <div className="icon_container">
                        {item.tr_training_mode.includes("1")
                          && <div style={{ textAlign: "center", width: '65px'}}>
                            <HomeIcon className="home_icon" />
                            <p style={{ marginBottom: "0px" }} className="trainingmode_text">Home</p>
                          </div>}
                          { item.tr_training_mode.includes("2")
                            && <div style={{ textAlign: "center", width: '65px'}}>
                              <LanguageIcon className="lang_icon_clr" />
                              <p style={{ marginBottom: "0px" }} className="trainingmode_text">Online</p>
                            </div>
                           } {item.tr_training_mode.includes("3") && <div style={{ textAlign: "center", width: '65px'}}>
                              <LocationOnIcon className="location_icon_clr" />
                              <p style={{ marginBottom: "0px" }} className="trainingmode_text">Center</p>
                            </div>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>

      </React.Fragment>
    );
  }
}
export default ManageViewModal; 