import React from "react";
import "./ProfileSearch.css";
import { MdSearch } from "react-icons/md";
import Broadcast from '../../Images/broadcast.svg';
import { NavLink} from "react-router-dom";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import Broadcastwindow from "../../Components/BroadcastChat/Broadcastwindow";

class ProfileSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      conversation: [],
      open:false,
      openview:false
    };

   
    // handleClose=()=>
    // {
    //     this.setState({open:false})
    // }
  }
  handleOpen=()=>
  {
   this.setState({openview:true})

  }

  modelopen=(data)=>{
    if(data==="view"){
        this.setState({openview:true})
    }
    else if(data==="edit"){
        this.setState({editopen:true})
    }
}

closemodal=()=>{
  this.setState({openview:false,editopen:false})
}

  handleChange = e => {
    var searchString = e.target.value.trim().toLowerCase();
    if (searchString.length > 0) {
    }

    console.log("searchString", searchString);
  };
  render() { 
    return (
      <div className ="seachbox_side">
        <div className = "customer_div">
          
          <span className="customer_text">CUSTOMER</span>
          <img src = {Broadcast} className="img_cursor" onClick ={this.handleOpen} 
          Component ={NavLink} to ="/broad" 
           />
        </div>
        <div className="web_conversation-search">
          <div className="web_profile-search-icon">
            <MdSearch className="web_search-icon" />
          </div>
          <input
            type="search"
            className="web_conversation-search-input"
            placeholder="Search"
            onChange={this.handleChange}
          />
        </div>

         
        <Modalcomp clrchange="text_color" visible={this.state.openview} title={"BROADCAST"} closemodal={(e)=>this.closemodal(e)}
        
        >
          <Broadcastwindow/>
          
        </Modalcomp>
      
      </div>
    );
  }
}
export default ProfileSearch;
