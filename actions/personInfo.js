import fetch from '../utils/fetch';
import { PersonInfo } from "../constants";
import Api from "../constants/Api";

function getPersonInfo(userid){
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
		type: PersonInfo.GETINFO,
		data
	}
}

function getInfoError(error){
	return　{
		type: PersonInfo.GETINFOERROR,
		error
	}
}

function updatePersonInfo(data){
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
		type: PersonInfo.UPDATEINFO,
		data
	}
}

function updateInfoFail(error){
	return {
		type: PersonInfo.UPDATEINFOERROR,
		error
	}
}

const personInfo = {
	getPersonInfo,
	updatePersonInfo
}

export default personInfo;