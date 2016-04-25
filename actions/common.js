import fetch from '../util/fetch';
import { Info } from "../constants";
import Api from "../constants/Api";

function getInfo(userid){
	return (dispatch, getState) => {
		return fetch(Api.getInfo, {
			userid
		},{
			method: "POST"
		})
  		.then(json => {
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

function checkIsLogin(){
	return (dispatch, getState) => {
		return fetch(Api.checkIsLogin)
  		.then(json => {
  			if( json.statue && json.statue === "success" ){  				
	      		dispatch(getInfoSuccess(json));
  			}else{
  				dispatch(getInfoError(json.error));
  			}
	    })
	    .catch(err => {
	    	dispatch(getInfoError(err))
	    });
	}	
}

const common = {
	getInfo,
	checkIsLogin
}

export default common;