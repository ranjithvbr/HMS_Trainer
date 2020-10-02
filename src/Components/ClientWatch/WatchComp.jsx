import React, { Component } from "react";
// import Grid from "@material-ui/core/Grid";
// import Labelbox from "../../helpers/labelbox/labelbox";
// import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
// import Report from '../../images/report.jpg'
import './WatchComp.css'
import { Progress } from 'antd';
import Heart from '../../Images/heart.svg'
import Sleep from '../../Images/sleep.svg'
import Steps from '../../Images/steps.svg'
import Running from '../../Images/running.svg' 
// import { ChartCard, MiniBar } from '@/components/Charts';
import {  Icon } from 'antd';
import Chart from './chart'
const data1 = [
  { month: 'Jan.', count: 69, city: 'tokyo' }
];
const scale = {
  month: {alias: 'Month',},
  count: {alias: 'Sales',},
};

const data = [{year:"we"}];

export default class WatchDetails extends React.Component{
constructor(props)
{
super(props)
   this.state={name:""}
}
render()
{
    return(
       <div>
           <div className="paper_maincontainer">
               <Paper className="paper_container">
                  <div className="heart_div"><div className="watch_diff"><img src={Steps}/><p className="watch_item">Steps</p></div>
                      <div className="heart_rate"><p className="heartdate_per">1100</p></div>
                  </div>
                  <div className="chart_container"> 
                      <Chart/>
                  </div>
               </Paper>
             
               <Paper className="paper_container">
                  <div className="heart_div"><div className="watch_diff"><img src={Heart}/><p className="watch_item">Heart Rate</p></div>
                     <div className="heart_rate"><p className="heartdate_per">78</p><p className="heart_date">Bpm</p></div>
                  
                   </div>
                   <div>               
               <div className="progress_container"><Progress percent={100} status="active" className="heart_rate_progress"/></div>

                   </div>
                  
               </Paper>
              
               <Paper className="paper_container">
                  <div className="heart_div"><div className="watch_diff"><img src={Sleep}/><p className="watch_item">Sleep</p></div>
                      <div className="heart_rate"><p className="heartdate_per">0</p><p className="heart_date">H</p>
                      <p className="heartdate_per">0</p><p className="heart_date">M</p></div>   
                  </div>
                    <div className="progress_container"><Progress percent={100} status="active" className="sleep_progress"/></div>
               </Paper>   
            </div>
            <div className="secondpaper_maincontainer">
               <Paper className="paper_container">
                   <div className="heart_div"><div className="watch_diff"><img src={Running}/><p className="watch_item">Running</p></div>
                      <div className="heart_rate"><p className="heartdate_per">0</p><p className="heart_date">H</p>
                      <p className="heartdate_per">0</p><p className="heart_date">M</p></div>    
                   </div>
                   <div className="progress_container"><Progress percent={100} status="active" className="running_progress"/></div>
               </Paper>
           </div>
       </div>
    )
}
}

    