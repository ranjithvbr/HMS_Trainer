import React from 'react';

import ReactFC from 'react-fusioncharts';

import FusionCharts from 'fusioncharts';

import Column2D from 'fusioncharts/fusioncharts.charts';

import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const chartConfigs = {
    type: 'column2d',
    width: '400', 
    height: '400',
    dataFormat: 'json', 
    dataSource: {
        "chart": {
            "caption": "",
            "subCaption": "",
            "xAxisName": "Month",
            "yAxisName": "KD",
			"numberSuffix": "",
			"theme": "fusion",
			"palettecolors": "#1EEE94",
			"yAxisMaxValue": "5000",
		"yAxisMinValue": "0",

        },
        "data": [{
            "label": "Jan",
            "value": "1000"
        }, {
            "label": "Feb",
            "value": "3000"
        }, {
            "label": "Mar",
            "value": "2000"
        }, {
            "label": "Apr",
            "value": "1500"
        }, {
            "label": "May",
            "value": "4000"
        }, {
            "label": "Jun",
            "value": "2500"
        }, {
            "label": "Jul",
            "value": "3000"
        }, {
            "label": "Aug",
            "value": "5000"
        },{
            "label": "Sep",
            "value": "3000"
        },{
            "label": "Oct",
            "value": "4000"
        }, {
            "label": "Nov",
            "value": "4000"
        }, {
            "label": "Dec",
            "value": "3500"
        },  ]
    }
};

class MonthWise extends React.Component {
  render() {
     return (
		<div>
     <ReactFC
        {...chartConfigs}/>
		</div>
     );
  }
}

export default MonthWise