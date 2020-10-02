import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import "./ManageServiceModal.css";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Labelbox from "../../helpers/labelbox/labelbox";
import { notification, Select, Dropdown, Tag, Input } from "antd";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import HomeIcon from "@material-ui/icons/Home";
import LanguageIcon from "@material-ui/icons/Language";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CloseIcon from "@material-ui/icons/Close";
import Paper from "@material-ui/core/Paper";
import links from "../../helpers/Constant";
import axios from "axios";
import moment from "moment";
import ValidationLibrary from "../../helpers/validationfunction";
import { BreadcrumbItem } from "reactstrap";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const { Option, OptGroup } = Select;
const styles = {};
// const {  Tag  } = antd;

export default class ManageServiceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      home: 0,
      loc: 0,
      lang: 0,
      editActive: null,
      cancel: null,
      list: [],
      active: 0,
      reschedule: 1,
      newFeaturesList: [],
      deleteFeaturesList: [],
      packageDeleteList: [],
      packageName: "",
      trainingCategoryId: JSON.parse(localStorage.getItem("trainer"))
        .tr_training_category_id,
      trainerTrainingId: JSON.parse(localStorage.getItem("trainer"))
        .tr_training_id,
      session: "",
      cost: "",
      maxBooking: "",
      trainingMode: "",
      trainerPackageId: null,
      packageDetails: "",
      trainerId: localStorage.getItem("trainerId"),
      userdata: JSON.parse(localStorage.getItem("trainer")),
      createdBy: 19,
      features: [],
      avoidmulticlick:true,
      training: [
        {
          trainingId: "",
          trainingName: "",
        },
      ],
      category: [
        {
          trainerCatId: "",
          trainerCatName: "",
        },
      ],
      labmanage_test: {
        packageName: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        session: {
          value: "",
          validation: [{ name: "required" }, { name: "allowNumaricOnly" }],
          error: null,
          errmsg: null,
        },

        cost: {
          value: "",
          validation: [{ name: "required" }, { name: "allowNumaricOnly1" }],
          error: null,
          errmsg: null,
        },
        maxBooking: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        packageDetails: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        features: {
          value: "",
          validation: [],
          error: null,
          errmsg: null,
        },
      },
    };
  }

  open = () => {
    this.setState({ view: true });
  };

  editView = (item, key) => {
    if (this.state.trainerPackageId > 0) {
      var res = window.confirm("Your changes won't saved");
      if (!res) return;
    }

    console.log("fsdfsd", item);
    console.log(item.trainerPackageId);
    this.setState({
      editActive: key,
      active: item.active,
      reschedule: item.reschedule,
    });
    if (item.trainerPackageId != null && item.trainerPackageId != undefined) {
      this.setState({
        trainerPackageId: item.trainerPackageId,
      });
    }

    var labmanage_test = this.state.labmanage_test;
    labmanage_test["packageName"].value = item.packageName;
    labmanage_test["session"].value = item.session;
    labmanage_test["cost"].value = item.cost;
    labmanage_test["maxBooking"].value = item.maxBooking;
    labmanage_test["packageName"].value = item.packageName;
    labmanage_test["packageDetails"].value = item.packageDetails;
    var trainingMode = item.trainingMode.split(",");
    console.log("fsdgsdgsd", trainingMode);
    if (trainingMode[0] != null) {
      this.setState({ home: trainingMode[0] });
    } else if (trainingMode[1] != null) {
      this.setState({ lang: trainingMode[1] });
    } else if (trainingMode[2] != null) {
      this.setState({ loc: trainingMode[2] });
    }

    this.setState({
      labmanage_test,
      features: item.features,
    });
  };

  onclose = () => {
    this.setState({ view: false });
  };

  log = (e,index) => {
    console.log(e, "uyguy");
    var features = this.state.features.filter(
      (item) => item.featureName != e
    );
    
    console.log('uyguy', features)
    this.setState({ features }, () => console.log('uyguy',this.state.features));
  };

  log1 = (e) => {
    console.log(e, "uyguy");
  
    var filter = this.state.features.filter(
      (item) => item.featureName != e.featureName
    );
    
    this.setState({ features: filter });


    //update delete list
    if (this.props.edithide && e.featuresId && this.state.editActive >= 0) {

      console.log("deletetagloaded");
      var obj = {};
      obj.featuresId = e.featuresId;
      var deleteFeaturesList = this.state;
    

  
      this.setState({ deleteFeaturesList: [...this.state.deleteFeaturesList,obj] }
       
      );
    }
  };

  closeList = (e) => {
    if (this.state.editActive != null) {
      alert("Update in progress");
      return;
    }
    console.log(e);
    var list = this.state.list;
    var currentItem = list[e];
    if (this.props.edithide) {
      var obj = {};
      var packageDeleteList = this.state.packageDeleteList;
      obj.trainerPackageId = currentItem.trainerPackageId;
      packageDeleteList.push(obj);
      this.setState({ packageDeleteList }, () =>
        console.log("deleted", packageDeleteList)
      );
    }
    list.splice(e, 1);
    this.setState({ list });
  };

  addToFeatures = () => {
    
    
    var labmanage_test = this.state.labmanage_test;

    var existscheck = this.state.features.find((data)=>{
      return data.featureName === labmanage_test["features"].value
    })

    if(!existscheck){

    let value = labmanage_test["features"].value;
    if (value == "") {
      alert("Field Required");
      return;
    }

    var obj = {};
    obj.featureName = value;
    this.setState(
      {
        features: this.state.features.concat(obj),
      },
      () => {
        console.log("features", this.state.features);
      }
    );

    labmanage_test["features"].value = "";
    this.setState({ labmanage_test });
    }else{
      notification.error({
        message: "This keyword is already existed",
      });
      labmanage_test["features"].value = "";
      this.setState({ labmanage_test });
    }
  };

  multiAdd = () => {
    this.setState({avoidmulticlick:false})
    const {
      packageName,
      trainingCategoryId,
      trainerTrainingId,
      session,
      cost,
      maxBooking,
      trainingMode,
      packageDetails,
      trainerId,
      createdBy,
      features,
    } = this.state.labmanage_test;

    var self = this;
    var labmanage_test = this.state.labmanage_test;
    var targetkeys = Object.keys(labmanage_test);
    console.log(targetkeys);

    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        labmanage_test[targetkeys[i]].value,
        labmanage_test[targetkeys[i]].validation
      );
      console.log(errorcheck);
      labmanage_test[targetkeys[i]].error = !errorcheck.state;
      labmanage_test[targetkeys[i]].errmsg = errorcheck.msg;
    }

    var filtererr = targetkeys.filter(
      (obj) => labmanage_test[obj].error == true
    );
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      console.log(filtererr);
      this.setState({ error: true });
    } else {
      var obj=[];
     
      obj.push({
          packageName: this.state.labmanage_test.packageName.value,
          trainingCategoryId: this.state.trainingCategoryId,
          trainerTrainingId: this.state.trainerTrainingId,
          session: this.state.labmanage_test.session.value,
          cost: this.state.labmanage_test.cost.value,
          maxBooking: this.state.labmanage_test.maxBooking.value,
          trainingMode:
            this.state.home + "," + this.state.lang + "," + this.state.loc,
          packageDetails: this.state.labmanage_test.packageDetails.value,
          trainerId: this.state.trainerId,
          createdBy: this.state.createdBy,
          updatedBy: this.state.createdBy,
          features: this.state.features,
          newFeaturesList: this.state.features,
        trainerPackageId: this.state.trainerPackageId,
          deleteFeaturesList: this.props.edithide ? this.state.alwaysdeleteFeaturesList : this.state.deleteFeaturesList,
          active: this.state.active,
          reschedule: this.state.reschedule,
          trainer: this.state.userdata.trainingName,
        });

        console.log('fsdfwe',obj);

      this.setState({
        list:obj ,
      },()=>{
          this.submit()
      });
      
      //reset selected value
      // this.reset();
    }
  };






  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);

    var labmanage_test = this.state.labmanage_test;
    var targetkeys = Object.keys(labmanage_test);
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      labmanage_test[key].validation
    );

    labmanage_test[key].value = data;
    labmanage_test[key].error = !errorcheck.state;
    labmanage_test[key].errmsg = errorcheck.msg;
    console.log("labmanage_test", labmanage_test);

    this.setState({ labmanage_test });
    var filtererr = targetkeys.filter(
      (obj) =>
        labmanage_test[obj].error == true || labmanage_test[obj].error == null
    );
    if (filtererr.length > 0) {
      this.setState({
        error: true,
        errordummy: false,
      });
    } else {
      this.setState({ error: false });
    }
  };

  changeDynamic1 = (data, key) => {
    console.log("key", key);
    console.log("data", data);

    var labmanage_test1 = this.state.labmanage_test1;
    var targetkeys = Object.keys(labmanage_test1);
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      labmanage_test1[key].validation
    );
    labmanage_test1[key].value = data;
    labmanage_test1[key].error = !errorcheck.state;
    labmanage_test1[key].errmsg = errorcheck.msg;
    console.log("labmanage_test", labmanage_test1);

    this.setState({ labmanage_test1 });
    var filtererr = targetkeys.filter(
      (obj) =>
        labmanage_test1[obj].error == true || labmanage_test1[obj].error == null
    );
    if (filtererr.length > 0) {
      this.setState({
        error: true,
        errordummy: false,
      });
    } else {
      this.setState({ error: false });
    }
  };

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  getTrainingList = () => {
    var self = this;
    axios({
      method: "POST", //get method
      url: links.APIURL + "trainer/getTrainingListCategoryBased",
      data: {
        trainerId: this.state.trainerId,
        trainingCatId: this.state.trainingCategoryId,
      },
    }).then((response) => {
      if (response.data.status) {
        this.setState({
          training: response.data.data,
        });
      }
    });
  };

  handleChange = (data, key) => {
    if (key == 0) {
      this.setState(
        {
          trainingCategoryId: data,
        },
        () => {
          this.getTrainingList();
        }
      );
    } else if (key == 1) {
      this.setState(
        {
          trainerTrainingId: data,
        },
        () => {
          // this.getTrainingList()
        }
      );
    }
  };

  componentWillReceiveProps = (props) => {
    if (props.edithide ) {
    
      if (props.packageDetail.length > this.state.list.length) {
         
        console.log('fsd', props.packageDetail)
       
        var data = props.packageDetail[0];
       
      
      //reset selected value
     


        
       

        if (this.state.trainerPackageId ==null){
          console.log(data.tr_reschedule,"data.tr_reschedule")
          var labmanage_test = this.state.labmanage_test;
          labmanage_test["packageName"].value = data.tr_package_name;
          labmanage_test["session"].value = data.tr_session;;
          labmanage_test["cost"].value = data.tr_cost;
          labmanage_test["maxBooking"].value = data.tr_max_booking;
          labmanage_test["packageDetails"].value = data.tr_package_details;
          this.setState({
            trainerPackageId: data.trainerPackageId,
          });
          if(this.check(data.tr_training_mode,1)){
         console.log('called')
         this.setState({ home: 1 });
     }
    

        if (this.check(data.tr_training_mode,2)){
           console.log('called1')
           this.setState({ lang: 2 });
       }
     


    if (this.check(data.tr_training_mode,3)){
        console.log('called2')
        this.setState({ loc: 3 });
    }

    console.log(data,"featuresList")
    var alwaysdeleteFeaturesList = []
    data.featuresList.map((val)=>{
      alwaysdeleteFeaturesList.push({featuresId:val.featuresId})
    })

       
          this.setState(
            {
              labmanage_test,
              features: data.featuresList,
              alwaysdeleteFeaturesList:alwaysdeleteFeaturesList,
              // newFeaturesList: data.featuresList,
              // active: data.tr_package_status,
              // reschedule: data.tr_reschedule
              active:data.tr_package_status,
              reschedule:data.tr_reschedule
            },
            () => console.log(this.state)
          );

        }

      

    

        
      }
    }
  };
  componentDidMount = () => {
    // this.getCategoryList();
    // this.getTrainingList();
    axios({
      method:'POST',
      url:links.APIURL + "trainer/getTrainerDetails",
      data:{"trainerId":this.state.trainerId}

    }).then((response) => {
          console.log("getprof_data",response.data.data[0])
         this.setState({
          trainingMode:response.data.data[0].training_mode,
         })
    })
  };

  getCategoryList = () => {
    var self = this;
    axios({
      method: "POST", //get method
      url: links.APIURL + "getTrainerCategoryList",
      data: {
        trainerId: this.state.trainerId,
      },
    }).then((response) => {
      console.log(response);
      if (response.data.status) {
        this.setState({
          category: response.data.data,
        });
      }
    });
  };

  open = () => {
    this.setState({ view: true });
  };
  onclose = () => {
    this.setState({ view: false });
  };

  handleHomeChange = (event) => {
    console.log(event.target.checked);
    this.setState({
      home: event.target.checked ? 1 : 0,
    });
  };

  handleLangChange = (event) => {
    console.log(event.target.checked);
    this.setState({
      lang: event.target.checked ? 2 : 0,
    });
  };

  handleLocChange = (event) => {
    console.log(event.target.checked);
    this.setState({
      loc: event.target.checked ? 3 : 0,
    });
  };

  submit = () => {
    const {
      packageName,
      trainingCategoryId,
      trainerTrainingId,
      session,
      cost,
      maxBooking,
      trainingMode,
      packageDetails,
      trainerId,
      createdBy,
      features,
    } = this.state.labmanage_test;
    var self = this;

    
      if (this.props.edithide) {
        this.update();
      } else {
        //add package

        // var postData = this.state.list.concat({
        //   packageName: this.state.labmanage_test.packageName.value,
        //   trainingCategoryId: this.state.trainingCategoryId,
        //   trainerTrainingId: this.state.trainerTrainingId,
        //   session: this.state.labmanage_test.session.value,
        //   cost: this.state.labmanage_test.cost.value,
        //   maxBooking: this.state.labmanage_test.maxBooking.value,
        //   trainingMode: this.state.home + ',' + this.state.lang + ',' + this.state.loc,
        //   packageDetails: this.state.labmanage_test.packageDetails.value,
        //   trainerId: this.state.trainerId,
        //   createdBy: this.state.createdBy,
        //   features: this.state.features
        // });
        if(this.state.home || this.state.lang || this.state.loc){

        axios({
          method: "POST",
          url: links.APIURL + "trainer/addTrainingManagePackage",
          data: {
            packageList: this.state.list,
          },
        }).then((response) => {
          if (response.data.status == 1) {
            this.reset();
            this.props.refresh(true);
            this.props.closemodal(false);
            this.setState({avoidmulticlick:true})
            notification.success({
              message: "Package Added",
              description: "",
            });
          } else {
            notification.error({
              message: response.data.msg,
              description: "Process failed",
            });
          }
        });
      }else{
        notification.info({
          message: "Please choose atleast one Training Mode",
        });
      }
      }
   
  };
  check = (data, value) => {
   
    if (data.match(value) == null) return false;
    else if (data.match(value).length > 0) return true;
  };


  // saveEdit = () => {
  //   var list = this.state.list;
  //   if (
  //     this.state.trainerPackageId != null &&
  //     this.state.trainerPackageId != undefined &&
  //     this.state.trainerPackageId > 0
  //   ) {
  //     var findIndex = this.state.list.findIndex(
  //       (item) => item.trainerPackageId == this.state.trainerPackageId
  //     );
  //   } else {
  //     var findIndex = this.state.editActive;
  //   }

  //   console.log("index", findIndex);
  //   if (findIndex != -1) {
  //     list[findIndex] = {
  //       trainerPackageId: this.state.trainerPackageId,
  //       packageName: this.state.labmanage_test.packageName.value,
  //       trainingCategoryId: this.state.trainingCategoryId,
  //       trainerTrainingId: this.state.trainerTrainingId,
  //       session: this.state.labmanage_test.session.value,
  //       cost: this.state.labmanage_test.cost.value,
  //       maxBooking: this.state.labmanage_test.maxBooking.value,
  //       trainingMode:
  //         this.state.home + "," + this.state.lang + "," + this.state.loc,
  //       packageDetails: this.state.labmanage_test.packageDetails.value,
  //       trainerId: this.state.trainerId,
  //       createdBy: this.state.createdBy,
  //       updatedBy: this.state.createdBy,
  //       features: this.state.features,
  //       newFeaturesList: this.state.features,
  //       deleteFeaturesList: list[findIndex].deleteFeaturesList,
  //       active: this.state.active,
  //       reschedule: this.state.reschedule,
  //       trainer: this.state.userdata.trainingName,
  //     };
  //   }

  //   this.setState({ list, editActive: null, trainerPackageId: null }, () => {
  //     console.log("lsllfds", this.state.list);
  //     this.reset();
  //   });
  // };

  reset = () => {
    //reset selected value
    var labmanage_test = this.state.labmanage_test;
    labmanage_test["packageName"].value = "";
    labmanage_test["session"].value = "";
    labmanage_test["cost"].value = "";
    labmanage_test["maxBooking"].value = "";
    labmanage_test["packageName"].value = "";
    labmanage_test["packageDetails"].value = "  ";

    this.setState(
      {
        labmanage_test,
        features: [],
        home: 0,
        loc: 0,
        lang: 0,
        active: 0,
        reschedule: 0,
      },
      () => console.log(this.state)
    );
  };


 

  update = () => {
    console.log(this.state.list,"listee");

    // var postData = this.state.list.concat({
    //     packageName: this.state.labmanage_test.packageName.value,
    //     trainingCategoryId: this.state.trainingCategoryId,
    //     trainerTrainingId: this.state.trainerTrainingId,
    //     session: this.state.labmanage_test.session.value,
    //     cost: this.state.labmanage_test.cost.value,
    //     maxBooking: this.state.labmanage_test.maxBooking.value,
    //     trainingMode: this.state.home + ',' + this.state.lang + ',' + this.state.loc,
    //     packageDetails: this.state.labmanage_test.packageDetails.value,
    //     trainerId: this.state.trainerId,
    //     createdBy: this.state.createdBy,
    //   newFeaturesList: this.state.features,
    //   deleteFeaturesList: this.state.deleteFeaturesList
    //   });

    this.setState({avoidmulticlick:false})

  
    console.log("submited", {
      packageUpdateList: this.state.list,
      packageDeleteList: this.state.packageDeleteList,
    });

    var self = this;
    axios({
      method: "POST",
      url: links.APIURL + "trainer/updateTrainingManagePackage",
      data: {
        packageUpdateList: this.state.list,
        packageDeleteList: this.state.packageDeleteList,
      },
    }).then((response) => {
      if (response.data.status == 1) {
        this.reset();
        notification.success({
          message: "Package Edited",
          description: "",
        });
        this.setState({avoidmulticlick:true})
        this.props.refresh(true);
        this.props.closemodal(false);
      } else {
        notification.error({
          message: response.data.msg,
          description: "Process failed",
        });
      }
    });
  };

  deletetag=(tagindex)=>{
    var deletetag = this.state.features.filter((data, index) => {
      return index !== tagindex
    })

    this.setState({
      features: deletetag
    })
  }

  deletetagedit = (e,tagindex) => {
    console.log(e, "uyguy");
  
    var deletetag = this.state.features.filter((data, index) => {
      return index !== tagindex
    })

    this.setState({
      features:deletetag
    })


    //update delete list
    if (this.props.edithide && e.featuresId && this.state.editActive >= 0) {

      console.log("deletetagloaded");
      var obj = {};
      obj.featuresId = e.featuresId;
      var deleteFeaturesList = this.state;
    

  
      this.setState({ deleteFeaturesList: [...this.state.deleteFeaturesList,obj] }
       
      );
    }
  };

  render() {
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
   
    return (
      <div className="trainer_manage_popup_details">
        {/* <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          {...other}
          className="addpackage_modal"
        > */}
        {/* <Card className="manage_card_align">
          <div className="title_flex_manage">
            <div className="first_div_manage">
              <h2 className="manage_tittle">ADD/EDIT PACKAGE</h2>
            </div>
          </div>
          <div className="add_training_div">
            <h3 className="add_training_manage">
              {this.props.edithide ? "EDIT" : "ADD"} TRAINING
            </h3>
          </div>
        </Card> */}
        {/* BODY OF THE CARD  */}

        <div className="full_container">
          <div className="flex_first_second">
            <div className="first_column">
              <div className="first_divider">
                <div style={{display:'flex'}}>
              <div style={{ padding: "10px" }}>
                    <div className="common_text">Training Category</div>
                    <div className="static_text">
                      {this.state.userdata.trainingCategory}
                    </div>
                  </div>
                  <div style={{ padding: "10px" }}>
                    <div className="common_text"> Training</div>
                    <div className="static_text">
                      {this.state.userdata.trainingName}
                    </div>
                  </div>
                  </div>
               
                {/* <div className="width_training">
                  <p className="card_training">Training Category</p>

                  <Select
                    className=" "
                    defaultValue={this.state.userdata.trainingCategory}
                    className="width_training1"
                   
                    style={{ width: 200, zIndex: "9999999999 !important" }}
                    onChange={(value) => this.handleChange(value, 0)}
                    
                  >
                    

                    {this.state.category.map((e, key) => {
                      return (
                        <Option key={key + 1} value={e.trainerCatId}>
                          {e.trainerCatName}
                        </Option>
                      );
                    })}
                  </Select>
                </div> */}
                <div className="session_flex">
                  <div className="width_session mt-4">
                    <Labelbox
                      className="training_adjust "
                      labelname="Total Cost (KWD)"
                      type="text"
                      placeholder="1400"
                      changeData={(data) => this.changeDynamic(data, "cost")}
                      value={this.state.labmanage_test.cost.value}
                      error={this.state.labmanage_test.cost.error}
                      errmsg={this.state.labmanage_test.cost.errmsg}
                    />
                  </div>
                  <div className="width_session mt-4">
                    <Labelbox
                      className="training_adjust "
                      labelname="Total Session"
                      type="number"
                      placeholder="24"
                      changeData={(data) => this.changeDynamic(data, "session")}
                      value={this.state.labmanage_test.session.value}
                      error={this.state.labmanage_test.session.error}
                      errmsg={this.state.labmanage_test.session.errmsg}
                    />
                  </div>
                </div>
               
              </div>
              <div className="first_divider">
                <div className="session_flex">
                <div className="width_training">
                  <Labelbox
                    className="training_adjust "
                    labelname="Package"
                    type="text"
                    changeData={(data) =>
                      this.changeDynamic(data, "packageName")
                    }
                    value={this.state.labmanage_test.packageName.value}
                    error={this.state.labmanage_test.packageName.error}
                    errmsg={this.state.labmanage_test.packageName.errmsg}
                  />
                </div>
                  
                </div>
                <div className="session_flex">
                  <div className="width_session mt-4">
                    <Labelbox
                      className="training_adjust "
                      labelname="Max Booking"
                      type="text"
                      placeholder="10"
                      changeData={(data) =>
                        this.changeDynamic(data, "maxBooking")
                      }
                      value={this.state.labmanage_test.maxBooking.value}
                      error={this.state.labmanage_test.maxBooking.error}
                      errmsg={this.state.labmanage_test.maxBooking.errmsg}
                    />
                  </div>
                  <div style={{ padding: " 22px 0px" }}>
                    <div className="common_text">Active</div>
                    <div>
                      <Checkbox
                        checked={this.state.active}
                        className="checkbox_height"
                        onChange={(e) => {
                          this.setState({ active: e.target.checked?1:0 });
                        }}
                        value={1}
                      />
                    </div>
                    
                  </div>
                  
                </div>
                
                {/* <div className="width_training">
                  <p className="card_training">Training</p>

                  <Select
                    className=" "
                    defaultValue={this.state.userdata.trainingName}
                    style={{ width: 200 }}
                    onChange={(value) => this.handleChange(value, 1)}
                    
                    
                  >
                    {this.state.training.map((e, key) => {
                      return (
                        <Option key={key} value={e.trainingId}>
                          {e.trainingName}
                        </Option>
                      );
                    })}
                  </Select>
                </div> */}
                {/* <div className="width_maxbooking mt-4">
                  <Labelbox
                    className="training_adjust "
                    labelname="Max Booking"
                    type="text"
                    placeholder="10"
                    changeData={(data) =>
                      this.changeDynamic(data, "maxBooking")
                    }
                    value={this.state.labmanage_test.maxBooking.value}
                    error={this.state.labmanage_test.maxBooking.error}
                    errmsg={this.state.labmanage_test.maxBooking.errmsg}
                  />
                </div> */}
              </div>
              
            </div>
            <div className="second_column">
              {/* <div className="width_training">
                <Labelbox
                  className="training_adjust "
                  labelname="Package"
                  type="text"
                  changeData={(data) => this.changeDynamic(data, "packageName")}
                  value={this.state.labmanage_test.packageName.value}
                  error={this.state.labmanage_test.packageName.error}
                  errmsg={this.state.labmanage_test.packageName.errmsg}
                />
              </div> */}
              <div className="plus_flex">
                <div className="width_features ">
                  <div style={{ width: "80%" }}>
                    {" "}
                    <Labelbox
                      className="training_adjust "
                      labelname="Keywords"
                      type="text"
                      changeData={(data) =>
                        this.changeDynamic(data, "features")
                      }
                      value={this.state.labmanage_test.features.value}
                      error={this.state.labmanage_test.features.error}
                      errmsg={this.state.labmanage_test.features.errmsg}
                    />
                  </div>
                  <div className="sq-plusicon_div">
                    {" "}
                    <AddBoxIcon
                      className="square_plus_align"
                      onClick={() => this.addToFeatures()}
                    />
                  </div>
                </div>
              </div>
              <div className="tagas_adjust mt-4">
                {!this.props.edithide &&
                  this.state.features.map((e, index) => {
                    
                    return (
                      <div className="circleicon_closemaster">
                        <div className="circleicon_closecontent">
                        {e.featureName} 
                        </div>
                        <HighlightOffIcon className="circleicon_close" onClick={()=>this.deletetag(index)} />
                      </div>
                    );
                  })}

                {this.props.edithide &&
                  this.state.features.map((e, index) => {
                    return (
                      <div className="circleicon_closemaster">
                        <div className="circleicon_closecontent">
                        {e.featureName} 
                        </div>
                        <HighlightOffIcon className="circleicon_close" onClick={()=>this.deletetagedit(e,index)} />
                      </div>
                    );
                  })}
              </div>
            </div>
            
          </div>
          <div className="package_detail_box" style={{ marginTop: 20 }}>
                  <Labelbox
                    className="training_adjust mt-4 "
                    labelname="Package Details"
                    value=""
                    type="textarea"
                    changeData={(data) =>
                      this.changeDynamic(data, "packageDetails")
                    }
                    value={this.state.labmanage_test.packageDetails.value}
                    error={this.state.labmanage_test.packageDetails.error}
                    errmsg={this.state.labmanage_test.packageDetails.errmsg}
                  />
                </div>
          <div className="mt-3 manage_icons_size" style={{ display: "flex" }}>
            
            <label 
              className="training_category_label "
              style={{ marginTop: 10 }}
            >
              TRAINING MODE
            </label>
            {this.state.trainingMode.includes("1") &&
            <>
            <Checkbox
              checked={this.state.home}
              className="checkbox_height"
              onChange={this.handleHomeChange}
              value={1}
            />

            <div className="icon_name">
              <HomeIcon className="home_icon_clr" />
              <p>Home</p>
            </div>
            </>
                  }
                              
             {this.state.trainingMode.includes("2") &&
             <>
            <Checkbox
              checked={this.state.lang}
              className="checkbox_height"
              onChange={this.handleLangChange}
              value={2}
            />
            <div className="icon_name">
              <LanguageIcon className="lang_icon_clr" />
              <p>Online</p>
            </div>
            </>
                }
            {this.state.trainingMode.includes("3") &&
             <>
            <Checkbox
              checked={this.state.loc}
              className="checkbox_height"
              onChange={this.handleLocChange}
              value={3}
            />
            <div className="icon_name">
              <LocationOnIcon className="location_icon_clr" />
              <p>Centre</p>
            </div>
            </>
              }
          </div>
          <div style={{ display: "flex",alignItems:'center' }}>
            <Checkbox
              checked={this.state.reschedule}
              className="checkbox_height"
              onChange={(e) => {
                this.setState({ reschedule: e.target.checked?1:0});
              }}
              value={1}
            />
            <div style={{ fontSize: "12px", marginBottom: "1px" }}>Reschedulable</div>
          </div>
          <div className="w-100 add_adjust">
            {/* {this.state.editActive != null && this.state.editActive >= 0 ? (
              <Button
                className="manage_add_button"
                onClick={() => this.saveEdit()}
              >
                Update
              </Button>
            ) : (
              <Button
                className="manage_add_button"
                onClick={() => this.multiAdd()}
              >
                Add
              </Button>
            )} */}
          </div>
          <div className="second_div_manage">
            <div className="mr-3">
              <Button
                className="manageCancel"
                onClick={() => this.props.closemodal(false)}
              >
                Cancel
              </Button>
              {this.props.edithide?<Button className="manageSubmit" onClick={this.state.avoidmulticlick ? () => this.multiAdd() : null}>
                update
              </Button>:
              <Button className="manageSubmit" onClick={this.state.avoidmulticlick ? () => this.multiAdd() : null}>
                Add
              </Button>}
            </div>
          </div>
          {/* <div className="dotted_line_middle mt-4" /> */}
           {/* <div className="card_sizecontent mt-5">
            {this.state.list.map((list, key) => {
              console.log("fsdfsd", list);

              return (
                <div>
                <div className="package_nameoncard">{list.packageName}</div>

                <Card className="mt-3 manage_card active" variant="outlined">

                  <div>

                    <CloseIcon
                      className="iconclose_adjust"
                      onClick={() => this.closeList(key)}
                    />
                  </div>
                  <div onClick={() => this.editView(list, key)}>
                    <div className=" mt-3">
                      <Grid container>
                        <Grid item md={7} sm={7}>
                          <div className=" mt-3">
                            <p className="card_training">Training Category</p>
                            <span className="card_outdoor">
                              {this.state.userdata.trainingCategory}
                            </span>
                          </div>
                        </Grid>
                        <Grid md={1} />
                        
                        <Grid item md={4} sm={4}>
                          <div className=" mt-3">
                            <p className="card_training">Training</p>
                            <span className="card_outdoor">
                              {this.state.userdata.trainingName}
                            </span>
                          </div>
                        </Grid>
                    
                        <Grid item md={7} sm={7}>
                          <div className=" mt-3">
                            <p className="card_training">Cost(KWD)</p>
                            <span className="card_outdoor">
                            {list.cost}
                            </span>
                          </div>
                        </Grid>
                        <Grid md={1} />


                        <Grid item md={4} sm={4}>
                          <div className=" mt-3">
                            <p className="card_training">Session</p>
                            <span className="card_outdoor">{list.session}</span>
                          </div>
                        </Grid>
                        
                      </Grid>
                      <div className="dotted_line mt-2" />
                     <div className="keywords_preview">{`Keyword`}</div>
                    </div>
                  </div>
                </Card>
                </div>
              );
            })}
          </div> */}
        </div>
      </div> 
    );
  }
}
const Trainer_viewWrapped = withStyles(styles)(ManageServiceModal);
