import fetch from '../util/fetch';
import { Statue, Info } from "../constants";
import Api from "../constants/Api";

function getInfo(userid){
	return (dispatch, getState) => {
		return fetch(Api.getInfo, {
			userid
		},{
			method: "POST"
		})
  		.then(json => {
  			console.log("hello!!!,", json);
  			if( json.statue && json.statue === "error" ){
  				dispatch(getInfoError(json.error));
  			}else{
	      		dispatch(getInfoSuccess(json));
  			}
	    })
	    .catch(err => {
	    	dispatch(getInfoError(err))
	    });
	}
}

function getInfoSuccess(data){
	return {
		type: Info.GETINFO,
		data
	}
}

function getInfoError(error){
	return　{
		type: Info.GETINFOERROR,
		error
	}
}


const CommonActions = {
	getInfo
}

export default CommonActions;