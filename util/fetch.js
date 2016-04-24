import { default as Fetch } from 'isomorphic-fetch';
import { isEmpty, map } from "lodash";
const assign = Object.assign;
const proxyUrl = "http://localhost:3000/proxy.do";

const defaultOptions = {
	method: "POST",
	withCredentials: true,
	crossDomain: true
}

/*
@url{String}     the fetch url
@data{Object}    the post data
@option{Object}  the fetch options
@return {Promise Object} 
*/
export default function fetch(url, data = {}, options = {}){
	if( !isEmpty(data) ){
		const list = map(data, (value, key) => `${key}=${value}`);
		data = {
			body: list.join("&")
		}
	}else{
		data.method = "GET";
	}
	data.realUrl = url;
	return Fetch(proxyUrl, assign({}, defaultOptions, data, options));
}

// export default function fetch(url, data = {}, options = {}){
// 	var post = {};
// 	post.url = url;
// 	post.method = "GET";
// 	if( !isEmpty(data) ){
// 		const list = map(data, (value, key) => `${key}=${value}`);
// 		post.content = list.join("&")
// 		post.method = "POST";
// 	}
// 	return Fetch(proxyUrl, assign({}, defaultOptions, { body: post }, options));
// }