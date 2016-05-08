import { Statue } from "../constants";
import fetch from '../utils/fetch';
import Api from "../constants/Api";

function logoutPost(){
	return (dispatch, getState) => {
		return fetch(Api.logout)
		.then(json => {
			if( json.statue && json.statue === "success" ){
				dispatch(_logoutSuccess());
			}else{
				dispatch(_logoutFail(json.error));
			}
		})
		.catch(err => {
			dispatch(_logoutFail(err))
		});
	}
}

function _logoutSuccess(){
	return {
		type: Statue.LOGOUTED
	}
}

function _logoutFail(error){
	return {
		type: Statue.LOGOUTERROR,
		error
	}
}

const logout = {
	logoutPost
};


export default logout;