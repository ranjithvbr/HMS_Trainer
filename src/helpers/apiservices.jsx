import apiCrud from './apicrud';
const apiurl="https://apirul/api/v1/";
const apiservice={
	getstudentDetails:async function(userid){
		var response=await apiCrud.getData(apiurl+"getstudent");
		return response;
	},
	poststudentInfromation:async function(obj){
		var response=await apiCrud.postData(apiurl+"poststudent",obj)
		return response;
	},
	getDoctorDetails:async function(doct_id){
		var response=await apiCrud.getData(apiurl+"getdoctordetails/"+doct_id);
		return response;
	}
}
export default apiservice;