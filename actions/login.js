import fetch from '../utils/fetch';
import { Statue } from "../constants";
import Api from "../constants/Api";

// 登录中
function _logining(){
	return {
		type: Statue.LOGINING
	}
}

// 登录失败
function _loginFail(error){
	return {
		type: Statue.LOGINERROR,
		error
	}
}

// 登录失败
function _loginSuccess(userid){
	return {
		type: Statue.LOGINED,
		userid
	}
}

// 异步action
function loginPost(user, pass){
	return (dispatch, getState) => {
		dispatch(_logining());
		return fetch(Api.login, {
			username: user,
			password: pass
		},{
			method: "POST"
		})
  		.then(json => {
  			if( json.statue && json.statue === "success" ){
	      		dispatch(_loginSuccess(json.userid));
  			}else{
  				dispatch(_loginFail(json.error));
  			}
	    })
	    .catch(err => {
	    	dispatch(_loginFail(err));
	    });
	}
}

const login = {
	loginPost
}

export default login;