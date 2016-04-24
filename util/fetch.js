// import { default as Fetch } from './ajax';
import { default as Fetch } from 'isomorphic-fetch'
import { isEmpty, map } from "lodash";
const assign = Object.assign;
const proxyUrl = "/proxy.do";

const defaultOpts = {
	method: "POST",
	headers: {
		"Content-Type": "application/json;charset=utf-8"
	}
}
/*
@url{String}     the fetch url
@data{Object}    the post data
@option{Object}  the fetch options
@return {Promise Object} 
*/
export default function fetch(url, data = {}, options = {}){
	const body = {
			data: data,
			url: url,
			options: options
		};
	return Fetch(
		proxyUrl,
		assign({}, 
			defaultOpts, 
			{
				body: JSON.stringify(body)
			}
		)
	);
}