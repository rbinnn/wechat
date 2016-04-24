import fetch from 'isomorphic-fetch';
import { Api } from "../constants";

export default function loginPost(username, password){
	return state => next => action => {
		fetch(Api.login, {
			body: `username=$(username)&password=$(password)`
		});
	}
}