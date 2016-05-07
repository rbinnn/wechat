import { Statue, PersonInfo } from "../constants";
const assign = Object.assign;

const initialState = {
	modalVisible: false,
	age: 0,
	email: "", 
	introduction: "", 
	nickName: "",
	sex: "", 
	userid: ""
}

export default function personInfo(state = initialState, action){
	switch(action.type){
		case Statue.LOGINED:
			return assign({}, state, { userid: action.userid });
		case PersonInfo.GETINFO:
			return assign({}, state, action.data);
		case PersonInfo.UPDATEINFO:
			return assign({}, state, action.data);
		case PersonInfo.UPDATEINFOERROR:
			return assign({}, state, action.data);
		case PersonInfo.OPENPERSONINFOMODAL:
			return assign({}, state, {
				modalVisible: true
			});
		case PersonInfo.CLOSEPERSONINFOMODAL:
			return assign({}, state, {
				modalVisible: false
			});
		default:
			return state;
	}
	return state;
}
