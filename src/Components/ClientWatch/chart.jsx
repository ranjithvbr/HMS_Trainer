import React, { Component } from "react";
import './Chart.css'
import { Chart, Axis, Tooltip, Geom } from 'bizcharts';
        const data = [
          { year: '1',sales:1},
          { year: '2', sales: 2 },
          { year: '3', sales: 3 },
          { year: '4', sales: 4 },
          { year: '5', sales: 5 },
         
        ];
        const cols = {
          'sales': {tickInterval: 5},
        };
       export default  class chart extends React.Component{
      render()
      {
          return(
          <Chart  style={{width:"350px",height:"75px"}} data={data} scale={cols} forceFit className="dfhdfhj">
            <Axis name="year" />
            <Axis name="sales" />
            <Tooltip crosshairs={{type : "y"}}/>
            <Geom type="interval" position="year*sales" />
          </Chart>
          )
        }
    }