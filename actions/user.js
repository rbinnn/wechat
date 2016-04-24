import fetch from '../util/fetch';
import Statue from "../constants/User";
import Api from "../constants/Api";

function logining(){
	return {
		type: Statue.LOGINING
	}
}

function logined(data){
	return {
		type: LOGINED,
		data: json
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
	      	console.log(json);
	    })
	}
}


const UserAction = {
	loginPost: loginPost
}

export default UserAction;