import React, { Component } from "react";
import "antd/dist/antd.css";
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "../src/Components/Login/Login";
import Forgot from "../src/Components/Login/Forgot";
import DoctorLogin from "../src/Components/Login/ResetPassword";
import MiniDrawer from "../src/Components/DrawerNewpage/Drawerpage";

export const apiurl = "http://52.200.251.222:8158/api/v1/";
const PrivateRoute = ({ component, ...options }) => {
  const trainerId = localStorage.getItem("trainerId");
  const finalComponent = trainerId > 0 ? component : Login;

  return <Route {...options} component={finalComponent} />;
};

export default class App extends Component {
  render() {
    var logged_in = localStorage.getItem("trainerId");
    var page = "";

    if (logged_in > 0) {
      page = <PrivateRoute exact path="/" component={MiniDrawer} />;
    } else {
      page = <Redirect to="/login" />;
    }
    return (
      <div>
        <Router basename="trainermodule/?/">
          {page}
          <Route exact path="/login" component={Login} />
          <Route path="/forgot" component={Forgot} exact />
          <Route path="/reset" component={DoctorLogin} exact />
          <Switch>
            <PrivateRoute path="/Home" component={MiniDrawer} />
          </Switch>
        </Router>
      </div>
    );
  }
}
