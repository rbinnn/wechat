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
  			if( json.statue === "success" ){
	      		dispatch(loginSuccess(json.userid));
  			}else{
  				dispatch(loginFail(json.error));
  			}
	    })
	    .catch(err => {
	    	dispatch(loginFail(err))
	    });
	}
}

const login = {
	loginPost
}

export default login;