import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
// import Report from '../../Images/report.jpg'
import './AdvertiseList.css'
import { Progress } from 'antd';
import Workflow from '../../Images/workflow.svg'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Full from '../../Images/half.svg'
import Half from '../../Images/Full.svg'
import DeleteMedia from './DeleteMedia'
import Modalcomp from '../../helpers/ModalComp/Modalcomp'
import { Chart, Axis, Legend, Tooltip, Geom } from 'bizcharts';
const data = [
  { month: 'Jan.', count: 69, city: 'tokyo' }
];
const scale = {
  month: {alias: 'Month',},
  count: {alias: 'Sales',},
};
export default class DealList extends React.Component{
constructor(props)
{
super(props)
 this.state={open:false}
}
handleOpen=()=>
{
    this.setState({open:true})
}
handleClose=()=>
{
    this.setState({open:false})
}
render()
{
    return(
       <div className="location_add_container">
           <div className="Ad_location_container">
           <div className="advertise_addlist_items">
               <div >
                    <div><p className="list_head">Ad Location</p>
                    <p className="list_subhead">App Home</p></div>
                    <div><p className="list_head">Days</p>
                    <p className="list_subhead">5</p></div>
               </div>
               <div>
                    <div><p className="list_head">Start Date</p>
                    <p className="list_subhead">11 Nov 2020</p></div>
                    <div><p className="list_head">Fee / Day (KWD)</p>
                    <p className="list_subhead">500</p></div>
               </div>
               <div>
                    <div><p className="list_head">End Date</p>
                    <p className="list_subhead">15 Nov 2020</p></div>
                    <div><p className="list_head">Total Cost (KWD)</p>
                    <p className="list_subhead">1000</p></div>
               </div>
               
               <div>
                  <div> <img src={Full}/> </div>
                  <span className="full_half_div">Full</span>
                   <div>
                       <img src={Workflow} className="listdelete_icon"/>
                       <EditIcon className="list_edit"/>
                       <DeleteIcon className="listdelete_icon"/>
                   </div>
                   {/* <img src={Full}/> */}
             
             </div>
             </div>
            
          
           
           <div className="advertise_addlist_items">
               <div >
                    <div><p className="list_head">Ad Location</p>
                    <p className="list_subhead">App Home</p></div>
                    <div><p className="list_head">Days</p>
                    <p className="list_subhead">5</p></div>
               </div>
               <div>
                    <div><p className="list_head">Start Date</p>
                    <p className="list_subhead">11 Nov 2020</p></div>
                    <div><p className="list_head">Fee / Day (KWD)</p>
                    <p className="list_subhead">500</p></div>
               </div>
               <div>
                    <div><p className="list_head">End Date</p>
                    <p className="list_subhead">15 Nov 2020</p></div>
                    <div><p className="list_head">Total Cost (KWD)</p>
                    <p className="list_subhead">1000</p></div>
               </div>
               
               <div>
                  <div> <img src={Half}/> </div>
                  <span className="full_half_div">Half</span>
                   <div>
                       <img src={Workflow} className="listdelete_icon"/>
                       <EditIcon className="list_edit"/>
                       <DeleteIcon className="listdelete_icon"/>
                   </div>
                   {/* <img src={Full}/> */}
             
             </div>
             </div>
             </div>
               <Modalcomp xswidth={"xs"} clrchange="textclr" title="Delete Media" visible={this.state.open} closemodal={this.handleClose}>
            <DeleteMedia/>
        </Modalcomp>
       </div>
    )
}
}