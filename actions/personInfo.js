import fetch from '../utils/fetch';
import { PersonInfo } from "../constants";
import Api from "../constants/Api";

// 获得个人信息，异步action
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
	  				dispatch(_getInfoError(json.error));
	  			}else{
		      		dispatch(_getInfoSuccess(json));
	  			}
		    })
		    .catch(err => {
		    	dispatch(_getInfoError(err));
		    });
	}
}

function _getInfoSuccess(data){
	return {
		type: PersonInfo.GETINFO,
		data
	}
}

function _getInfoError(error){
	return　{
		type: PersonInfo.GETINFOERROR,
		error
	}
}

//  更新个人信息，异步action
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
					dispatch(_updateInfoSuccess(data));
				}else{
					dispatch(_updateInfoFail(json.error));
				}
			})
			.catch(err => {
				dispatch(_updateInfoFail(err));
			});
	}
}

function _updateInfoSuccess(data){
	return {
		type: PersonInfo.UPDATEINFO,
		data
	}
}

function _updateInfoFail(error){
	return {
		type: PersonInfo.UPDATEINFOERROR,
		error
	}
}

// 打开个人信息框，普通action
function showPersonInfoModal(){
	return {
		type: PersonInfo.OPENPERSONINFOMODAL
	}
}

// 关闭个人信息框，普通action
function hidePersonInfoModal(){
	return {
		type: PersonInfo.CLOSEPERSONINFOMODAL
	}
}

const personInfo = {
	getPersonInfo,
	updatePersonInfo,
	showPersonInfoModal,
	hidePersonInfoModal
}

export default personInfo;