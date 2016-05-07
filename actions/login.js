import fetch from '../utils/fetch';
import { Statue } from "../constants";
import Api from "../constants/Api";

// 登录中
function logining(){
	return {
		type: Statue.LOGINING
	}
}

// 登录失败
function loginFail(error){
	return {
		type: Statue.LOGINERROR,
		error
	}
}

// 登录失败
function loginSuccess(userid){
	return {
		type: Statue.LOGINED,
		userid
	}
}

// 异步action
function loginPost(user, pass){
	return (dispatch, getState) => {
		dispatch(logining());
		return fetch(Api.login, {
			username: user,
			password: pass
		},{
			method: "POST"
		})
  		.then(json => {
  			if( json.statue && json.statue === "success" ){
	      		dispatch(loginSuccess(json.userid));
  			}else{
  				dispatch(loginFail(json.error));
  			}
	    })
	    .catch(err => {
	    	dispatch(loginFail(err));
	    });
	}
}

// 检查登录状态成功
function checkIsLoginSuccess(){
	return {
		type: Statue.LOGINED
	}
}
// 检查登录状态失败
function checkIsLoginFail(error){
	return {
		type: Statue.LOGINERROR,
		error 
	}
}
// 发一个请求检查登录状态
function checkIsLogin(){
	return (dispatch, getState) => {
		return fetch(Api.checkIsLogin)
  		.then(json => {
  			if( json.statue && json.statue === "success" ){  				
	      		dispatch(checkIsLoginSuccess());
  			}else{
  				dispatch(checkIsLoginFail(json.error));
  			}
	    })
	    .catch(err => {
	    	dispatch(checkIsLoginFail(err))
	    });
	}	
}

const login = {
	loginPost,
	checkIsLogin
}

export default login;