import React from "react";
import Tablecomponent from '../../helpers/TableComponent/TableComp';
import Modalcomp from '../../helpers/ModalComp/Modalcomp';
import ViewMedia from './ViewMedia';
import MediaUploadsModal from "./MediaUploadsModal"
import "./MediaUploadsTable.css";
import Ordericon from '../../Images/ordericon.png'

class MediaUploadsTable extends React.Component{

    state={
        openview:false
    }

    createData=(parameter) =>{
        var keys=Object.keys(parameter)
        var values=Object.values(parameter)
  
        var returnobj={}
        
        for(var i=0;i<keys.length;i++){
        returnobj[keys[i]]=values[i]
        }
        return(returnobj)
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


    render(){
         
        return(
            <div>
                <DragdropTable
                   heading={[
                    { id: "order", label: "Order" },
                    { id: "", label: "S.No" },
                    { id: "medialtitle", label: "Media Title" },
                    { id: "mediatype", label: "Media Type" },
                    { id: "uploadon", label: "Uploaded On" },
                    { id: "status", label: "Status" },
                    { id: "", label: "Action" }
                ]}
                rowdata={[
                    this.createData({order:<img src={Ordericon} className="upload_ordericon"/>,medialtitle: "test", mediatype: "1", uploadon: "35", status:"11 Dec 2019"}),
                    this.createData({order:<img src={Ordericon} className="upload_ordericon"/>, medialtitle: "ashwin", mediatype: "2", uploadon: "35", status:"11 Dec 2019"}),
                    this.createData({order:<img src={Ordericon} className="upload_ordericon"/>, medialtitle: "syed", mediatype: "3", uploadon: "35", status:"11 Dec 2019"}),
                    this.createData({order:<img src={Ordericon} className="upload_ordericon"/>, medialtitle: "edwin", mediatype: "4", uploadon: "35", status:"11 Dec 2019"}),
                    this.createData({order:<img src={Ordericon} className="upload_ordericon"/>, medialtitle: "arjun", mediatype: "5", uploadon: "35", status:"11 Dec 2019"}),
                    this.createData({order:<img src={Ordericon} className="upload_ordericon"/>, medialtitle: "raja", mediatype: "6", uploadon: "32", status:"11 Dec 2019"}),
                    this.createData({order:<img src={Ordericon} className="upload_ordericon"/>, medialtitle: "rani", mediatype: "7", uploadon: "35", status:"11 Dec 2019"}),
                ]}

                tableicon_align={"cell_eye"}
                modelopen={(e)=>this.modelopen(e)}
                 />
                <Modalcomp  visible={this.state.openview} title={"VIEW MEDIA"} closemodal={(e)=>this.closemodal(e)} >
                   <ViewMedia />
                </Modalcomp>

                 <Modalcomp  visible={this.state.editopen} title={"EDIT MEDIA UPLOADS"} closemodal={(e)=>this.closemodal(e)}>
                   <MediaUploadsModal/>
                 </Modalcomp>
                    
            </div>
        )
    }
}

export default MediaUploadsTable;