import { default as Fetch } from 'isomorphic-fetch'
import { isEmpty, map } from "lodash";
import parseJSON from "./parseJSON";
const assign = Object.assign;
const proxyUrl = "/proxy.do";

const defaultOpts = {
	method: "POST",
	headers: {
		"content-type": "application/json;charset=utf-8"
	},
	credentials: 'same-origin' // fetch默认不支持响应set-cookie到浏览器，所以要配置一下
}
/*
@url{String}     the fetch url
@data{Object}    the post data
@option{Object}  the fetch options
@return {Promise Object} 
*/
export default function fetch(url, data = {}, options = {}){
	/*
		封装代理请求数据格式
		post表示要post过去的数据
		url表示请求的地址
		options 配置
	*/ 
	const body = {
		post: data,
		url: url,
		options: options
	};
	/*
		返回一个promise对象	
	*/
	return Fetch(
		proxyUrl,
		assign({}, 
			defaultOpts, 
			{
				body: JSON.stringify(body)
			}
		)
	)
	.then( res => res.json() )
	.then( data => parseJSON(data) )  // json化处理返回的内容
}