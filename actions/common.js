import fetch from '../utils/fetch';
import { Info } from "../constants";
import Api from "../constants/Api";

function getInfo(userid){
	return (dispatch, getState) => {
		return fetch(
			Api.getInfo, {
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
		    	dispatch(getInfoError(err));
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

function updateInfo(data){
	return (dispatch, getState) => {
		return fetch(
			Api.updateInfo, 
			{
				nickname: data.nickName, 
				// 后台接收的字段跟之前的不一致，要手动改正
				age: data.age,
				sex: data.sex,
				email: data.email,
				introduction: data.introduction
			}, {
				method: "POST"
			})
			.then(json => {
				if( json.statue && json.statue === "success" ){
					dispatch(updateInfoSuccess(data));
				}else{
					dispatch(updateInfoFail(json.error));
				}
			})
			.catch(err => {
				dispatch(updateInfoFail(err));
			});
	}
}

function updateInfoSuccess(data){
	return {
		type: Info.UPDATEINFO,
		data
	}
}

function updateInfoFail(error){
	return {
		type: Info.UPDATEINFOERROR,
		error
	}
}

const common = {
	getInfo,
	checkIsLogin,
	updateInfo
}

export default common;