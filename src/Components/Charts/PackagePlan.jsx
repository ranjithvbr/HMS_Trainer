import React from 'react';
import ReactDOM from 'react-dom';

import ReactFC from 'react-fusioncharts';

import FusionCharts from 'fusioncharts';

import Column2D from 'fusioncharts/fusioncharts.charts';

import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const chartConfigs = {
    type: 'column2d',
    width: '275',
    height: '450',
    dataFormat: 'json', 
    dataSource: {
        "chart": {
            "caption": "",
            "subCaption": "",
            "xAxisName": "Package",
            "yAxisName": "KD",
			"numberSuffix": "",
			"theme": "fusion",
			"palettecolors": "#EEA91E",
			"yAxisMaxValue": "5000",
        "yAxisMinValue": "0",
        "labelDisplay": "rotate"

        },
        // Chart Data
        "data": [{
            "label": "Mega Pack",
            "value": "2000"
        }, {
            "label": "One Month",
            "value": "1000"
        }, {
            "label": "Fit Month",
            "value": "4000"
        }, {
            "label": "Fit India",
            "value": "3500"
        }, {
            "label": "Fit Health",
            "value": "4200"
        }, {
            "label": "Super Pack",
            "value": "2500"
        }, {
            "label": "Big Day",
            "value": "3000"
        },   ]
    }
};

// Step 9 - Creating the DOM element to pass the react-fusioncharts component
class PackagePlan extends React.Component {
  render() {
     return (
		
     <ReactFC
        {...chartConfigs}/>
		
     );
  }
}

export default PackagePlan