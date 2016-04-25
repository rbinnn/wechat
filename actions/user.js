import fetch from '../util/fetch';
import { Statue } from "../constants";
import Api from "../constants/Api";

function logining(){
	return {
		type: Statue.LOGINING
	}
}

function loginFail(error){
	return {
		type: Statue.LOGINERROR,
		error
	}
}

function loginSuccess(userid){
	return {
		type: Statue.LOGINED,
		userid
	}
}

function logoutSuccess(){
	return {
		type: Statue.LOGOUTED
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


const UserActions = {
	loginPost
}

export default UserActions;