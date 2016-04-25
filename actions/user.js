import fetch from '../util/fetch';
import Statue from "../constants/User";
import Api from "../constants/Api";

function logining(){
	return {
		type: Statue.LOGINING
	}
}

function loginFail(err){
	return {
		type: Statue.LOGINERROR,
		error: err
	}
}

function loginSuccess(data){
	return {
		type: Statue.LOGINED,
		data: json
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
	      		dispatch(loginSuccess(json));
  			}else{
  				dispatch(loginFail(json.error));
  			}
	    })
	    .catch(err => dispatch(loginFail(err)));
	}
}

const UserAction = {
	loginPost: loginPost
}

export default UserAction;