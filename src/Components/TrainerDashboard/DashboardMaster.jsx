import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "./DashboardMaster.css";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import DashboardTable from "./DashboardTable";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Input, Select, Icon } from 'antd';
import dateFormat from 'dateformat';
import Labelbox from '../../helpers/labelbox/labelbox'
import Paper from '@material-ui/core/Paper';
const current_date=(dateFormat(new Date(),"dd mmm yyyy"))

export default class Trainer_DashboardMaster extends Component {
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
    const { Search } = Input;
    console.log(dateFormat(new Date(),"dd mmm yyyy"))
    return (
      <div className="tainer_dashboard">
        <Paper>
        
            <div className="hms_trainer_header">
                  <div className="titleuser">TRAINER DASHBOARD</div>        
            </div>      
        <DashboardTable />
        </Paper> 
      </div>
    );
  }
}
