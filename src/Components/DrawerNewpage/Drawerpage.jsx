import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { NavLink } from "react-router-dom";
import "./Drawerpage.css";
import { Dropdown } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import avatar from "../../Images/prf.png";
import Badge from "@material-ui/core/Badge";
import Chaticon from "../../Images/chaticon.svg";
import bell from "../../Images/bell.png";
import Logo from "../../Images/Logo.png";
import home_svg from "../../Images/home_svg.svg";
import Cancel from "../../Images/cancel.svg";
import trainig_svg from "../../Images/trainig_svg.svg";
import advertise_svg from "../../Images/Advertisebook.svg";
import clients from "../../Images/customer.svg";

import Deals from "../../Images/deals.svg";
import Revenue from "../../Images/revenue_svg.svg";
import Manage from "../../Images/manageicon.svg";
import report_svg from "../../Images/report.svg";
import profile_svg from "../../Images/profile.svg";
import upload_svg from "../../Images/upload_svg.svg";
import {
  Menulist,
  MenuItem,
  ListItemText,
  ListItemIcon,
  MenuList,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import calendar_svg from "../../Images/calendar_svg.svg";
import ReactSVG from "react-svg";
import moment from "moment";
import ProfileLogout from "../../Components/ProfileLogout/ProfileLogout";
import ProfileComp from "../../Components/LabProfile/ProfileModal";
import Profilepage from "../../Components/LabProfile/Profilepage";
import ChartDashboard from "../../Components/TrainerChat/ChatDashboard";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import AppointmentsDashboard from "../../Components/AppointmentList/AppointmentsDashboard";
import Clientsmaster from "../../Components/Clients/Clientsmaster";
import CancelledDashboard from "../../Components/CancelledHistory/CancelledDashboard";
import Availabilitymaster from "../../Components/TrainingAvailability/AppointmentMaster";
// import RevenueMaster from '../../Components/TrainerAdvertisementBooking/AdvertisementMaster';
import RevenueMaster from "../../Components/AdvertisementBooking/AdvertisementMaster";
import Trainer_DashboardMaster from "../../Components/TrainerDashboard/DashboardMaster";
import RevenueDashboard from "../../Components/TrainerRevenue/RevenueDashboard";
import DealsMaster from "../../Components/Deals/DealsMaster";
import ManageServiceMaster from "../../Components/TrainerManage/ManageServiceMaster";
import MediaUploadsMaster from "../../Components/MediaUploads/MediaUploadsMaster";
import MyVenue from "../../Components/Webchat/MyVenue/MyVenue";
import OtherVenue from "../../Components/Webchat/OtherVenue/OtherVenue";
import WebchatMaster from "../../Components/Webchat/WebchatMaster";
import MessageMaster from "../../Components/Webchat/MessageMaster";
import UserDp from "../../Components/Webchat/UserDp";
import ChatDashboard from "../../Components/TrainerChat/ChatDashboard";
import CancelPayment from "../../Components/CancelPayment/CancelPayment";
import PaymentReceived from "../../Components/PaymentReceived/PaymentReceived";
import BroadcastWindow from "../../Components/BroadcastChat/Broadcastwindow";
import chart from "../../Components/ClientWatch/chart";
import WatchMaster from "../../Components/ClientWatch/WatchMaster";
import DealList from "../Deals/DealsMaster";
import {notification} from "antd";
import links from "../../helpers/Constant";
import Axios from "axios";

const drawerWidth = 260;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 100,
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});



class MiniDrawer extends React.Component {
  state = {
    open: false,
    logout: false,
    open: false,
    trainerId: localStorage.getItem("trainerId"),
    userName:null,
    profilePic:null,
    email:null,
    openview: false,
    chat: false,
    time: moment().format("DD-MM-YYYY h:mm:ss a")
  };

  active=()=>
  {
    this.setState({current_location:window.location.pathname})
  }

  handleOpen = () => {
    this.setState({ openview: true });
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  getTime =()=>{

    
  }
  viewmodalOpen = () => {
    // this.props.history.push('/Home/profile')
    // this.logoutClose()
    this.setState({ viewmodal: true });
  };
  ChartOpen = () => {
    this.props.history.push("/Home/chatpage");
  };
  ChartClose = () => {
    this.setState({ chat: false });
  };
  viewmodalClose = () => {
    this.setState({ viewmodal: false, chat: false });
  };
  logoutOpen = () => {
    // alert(this.state.logout)
    this.setState({ logout: !this.state.logout });
  };
  logoutClose = () => {
    this.setState({ logout: false });
  };
  profileDetails = () => {
    
    Axios({
      method:'POST',
      url:links.APIURL + "trainer/getTrainerDetails",
      data:{"trainerId":this.state.trainerId}

    }).then((response) => {
          console.log("getprof_data",response.data.data[0])
         this.setState({
          //  doctorInfo:response.data.data
          profilePic:response.data.data[0].vendor_profile_path,
          email:response.data.data[0].vendor_email,
          userName:response.data.data[0].trainerName,
          profiledetails:response.data.data[0],
         })
    }).catch((err) => {
      // 
    })
  }


  generateAlert = (description) => {
    notification.success({
      message: "Success",
      description,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  


  componentDidMount = () => {
    
      this.profileDetails()
    
    setInterval(() => {
      this.setState({
        time: moment().format("DD-MM-YYYY h:mm:ss a")
      })
    }, 1000);
  };
  

  render() {
    const { classes, theme, children } = this.props;
    const location=window.location.href


    return (
      <div className="drawerpage_container">
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.state.open,
            })}
          >
            <Toolbar disableGutters={!this.state.open}>
              <div className="drawer-logo-container">
                <img className="logo" src={Logo} alt="logo" />
              </div>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: this.state.open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <div
                className={`${
                  this.state.open
                    ? "dropdown-container"
                    : "dropdown-container_close"
                }`}
              >
                <Dropdown>
                  <div className="icons_setup">
                    <div className="chat-icon">
                      {" "}
                      <img
                        className="notification"
                        src={Chaticon}
                        component={Link}
                        to="/chat"
                        onClick={this.ChartOpen}
                      />
                    </div>

                    <Badge
                      color="secondary"
                      variant="dot"
                      className={classes.margin}
                    >
                      <div className="notification-icon">
                        {" "}
                        <img className="notification" src={bell} />
                      </div>
                    </Badge>
                  </div>
                  <Dropdown.Toggle
                    variant="my_style"
                    id="dropdown-basic"
                    // onClick={this.logoutOpen}
                  >
                    
                    {this.state.userName && this.state.userName}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu">
                    <div className="dropdown-img">
                      <img
                        className="Avatar"
                        alt="avatar-missing"
                        src={this.state.profiledetails && this.state.profiledetails.vendor_profile_path}
                      />
             
                    </div>
                    <div className="name_email">
                      <NavLink activeClassName="active" to="/Home/profilepage">
                   <div className="username" style={{color:'black',textDecoration:'none'}}>{this.state.profiledetails && this.state.profiledetails.trainerName}</div>
                   </NavLink>
                   <NavLink  className="email_butt" activeClassName="active" to="/Home/profile">

                   <div className="useremail " style={{color:'grey',textDecoration:'none'}}>{this.state.profiledetails && this.state.profiledetails.vendor_email}</div>
                   </NavLink>
                   </div>
                    <Divider />
                    <div className="profile_logout_butt">
                    <NavLink className="logout_butt" activeClassName="active" to="/Home/profile">
                      <p>Profile</p>
                      </NavLink>
                      <NavLink
                     
                        // component={NavLink}
                        to="/login"
                        // href="/Home/profilepage"
                        className="logout_butt"
                        // onClick={this.handleClose}
                        onClose={this.props.onClose}
                      >
                        Logout
                    
                      </NavLink>
                    </div>
                    <Divider />
                    <div className="profile_logout_privacy ">
                      <p>Privacy Policy Terms of Service</p>
                    </div>
                  </Dropdown.Menu>
                  </Dropdown>

                  {/* <Dropdown.Menu className="dropdown-menu"> */}
                  {/* {this.state.logout === true && 
                    <div>
                      <ProfileLogout
                        open={this.state.logout}
                        onClose={this.logoutClose}
                        userName={this.state.userName}
                        userEmail={this.state.email}
                        profilePic={this.state.profilePic}
                        history={this.props.history}
                        // logout={() => this.props.history.push("/login")}
                        // goToProfile={() => {
                        //   this.props.history.push("/Home/profile");
                        //   this.logoutClose()
                        // }
                        // }

                        />
                    </div>
                  } */}
                  {/* </Dropdown.Menu> */}


                  

                <div className="date-wrapper1">
                  <div className="date-wrapper2">
                    <large className="date">{
                       this.state.time
                    }</large>
                  </div>
                </div>
              </div>
              <Avatar
                className="Avatar-image"
                alt="avatar-missing"
                src={this.state.profilePic != null ? this.state.profilePic : avatar}
                // onClick={this.viewmodalOpen}
                className={classes.avatar}
              />
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              }),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />

            <MenuList className="appbar_sideicons">
              <MenuItem className={`${location.endsWith("dashboard") && "activecolor"}`} component={Link} to="/Home/dashboard">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={home_svg} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Home" />
              </MenuItem>
              <MenuItem className={`${location.endsWith("appointments") && "activecolor"}`} component={Link} to="/Home/appointments">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={calendar_svg} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Today's Appointments" />
              </MenuItem>
              <MenuItem className={`${location.endsWith("cancelhistory") && "activecolor"}`} component={Link} to="/Home/cancelhistory">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={Cancel} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Manage Appointments" />
              </MenuItem>
              <MenuItem className={`${location.endsWith("trainingavailability") && "activecolor"}`} component={Link} to="/Home/trainingavailability">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={trainig_svg} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Training Availability" />
              </MenuItem>
              <MenuItem className={`${location.endsWith("advertise") && "activecolor"}`} component={Link} to="/Home/advertise">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={advertise_svg} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Advertisement Booking" />
              </MenuItem>
              <MenuItem className={`${location.endsWith("delas") && "activecolor"}`} component={Link} to="/Home/deals">
                <ListItemIcon>
                  <div className="icon-container">
                    <div>
                      <ReactSVG src={Deals} />
                    </div>
                  </div>
                </ListItemIcon>
                <ListItemText primary="Deals" />
              </MenuItem>

              <MenuItem className={`${location.endsWith("clients") && "activecolor"}`} component={Link} to="/Home/clients">
                <ListItemIcon>
                  <div className="icon-container">
                    <div>
                      <ReactSVG src={clients} />
                    </div>
                  </div>
                </ListItemIcon>
                <ListItemText primary="Clients" />
              </MenuItem>

              <MenuItem className={`${location.endsWith("revenue") && "activecolor"}`} component={Link} to="/Home/revenue">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={Revenue} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Revenue" />
              </MenuItem>
              <MenuItem className={`${location.endsWith("manage") && "activecolor"}`} component={Link} to="/Home/manage">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={Manage} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Manage Package" />
              </MenuItem>
              <MenuItem className={`${location.endsWith("uploads") && "activecolor"}`} component={Link} to="/Home/uploads">
                <ListItemIcon>
                  <div className="icon-container">
                    <div>
                      <ReactSVG src={upload_svg} />
                    </div>
                  </div>
                </ListItemIcon>
                <ListItemText primary="Media Uploads" />
              </MenuItem>
              <MenuItem className={`${location.endsWith("profile") && "activecolor"}`} component={Link} to="/Home/profile">
                <ListItemIcon>
                  <div className="icon-container">
                    <div>
                      <ReactSVG
                        src={profile_svg}
                        onClick={this.viewmodalOpen}
                      />
                    </div>
                  </div>
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MenuItem>
              <MenuItem className={`${location.endsWith("report") && "activecolor"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <div>
                      <ReactSVG src={report_svg} />
                    </div>
                  </div>
                </ListItemIcon>
                <ListItemText primary="Report" />
              </MenuItem>
            </MenuList>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Route
              path={`${this.props.match.path}`}
              component={Trainer_DashboardMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/dashboard`}
              component={Trainer_DashboardMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/appointments`}
              component={AppointmentsDashboard}
              exact
            />
            <Route
              path={`${this.props.match.path}/clients`}
              component={Clientsmaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/cancelhistory`}
              component={CancelledDashboard}
            />
            <Route
              path={`${this.props.match.path}/trainingavailability`}
              component={Availabilitymaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/advertise`}
             
              render={(props) => <RevenueMaster {...this.props} generateAlert={this.generateAlert} />}
              exact
            />
            <Route
              path={`${this.props.match.path}/revenue`}
              component={RevenueDashboard}
              exact
            />
            <Route
              path={`${this.props.match.path}/deals`}
             
              render={(props) => <DealsMaster {...this.props} generateAlert={this.generateAlert} />}
              exact
            />
            <Route
              path={`${this.props.match.path}/manage`}
              component={ManageServiceMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/uploads`}
              component={MediaUploadsMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/myvenue`}
              component={MyVenue}
              exact
            />
            <Route
              path={`${this.props.match.path}/othervenue`}
              component={OtherVenue}
              exact
            />
            <Route
              path={`${this.props.match.path}/webchatmaster`}
              component={WebchatMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/messagemaster`}
              component={MessageMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/userdp`}
              component={UserDp}
              exact
            />
            <Route
              path={`${this.props.match.path}/chat`}
              component={ChatDashboard}
              exact
            />
            <Route
              path={`${this.props.match.path}/cancelpayment`}
              component={CancelPayment}
              exact
            />
            <Route
              path={`${this.props.match.path}/paymentReceive`}
              component={PaymentReceived}
              exact
            />
            <Route
              path={`${this.props.match.path}/broad`}
              component={BroadcastWindow}
              exact
            />
            <Route
              path={`${this.props.match.path}/profile`}
              // component={Profilepage}
              render={(props) => <Profilepage {...props} profileDetails={this.profileDetails} />}
              exact

            />{" "}
            <Route
              path={`${this.props.match.path}/back`}
              component={Profilepage}
              exact
            />
            <Route path={`${this.props.match.path}/chart`} component={chart} />
            <Route
              path={`${this.props.match.path}/WatchMaster`}
              component={WatchMaster}
            />
            <Route
              path={`${this.props.match.path}/dealslist`}
              component={DealList}
            />
            <Route
              path={`${this.props.match.path}/chatpage`}
              component={ChartDashboard}
            />
            <div>
              {children}

              {this.state.chat && <ChartDashboard />}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
