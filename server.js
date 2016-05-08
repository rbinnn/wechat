var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var express = require("express")
var app = express();
var bodyParser = require('body-parser');
var port = 5000;
var logger = require("./utils/server_log");
var compiler = webpack(config);
var request = require("request");
// var cookies; // cookie，代理跨域不会自动发送cookie
app.disable('x-powered-by');
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(__dirname+'/sources'));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

// 使用代理的方式解决跨域问题
app.post("/proxy.do", function(req, res){
	Promise
	.resolve(req)
	.then(hasUrl)
	.then(proxy)
	// .then(function(data){
	// 	res.json(data);
	// })
	// .then(res.json.bind(res))
	.then(function(result){
		// 往浏览器写入cookie
		// ????? why can't set-cookie in !!!!!!!!!!!!!
		res.append("set-cookie", result.cookie);
		res.json(result.data);
	})
	.catch(function(err){
		// 出错的话封装一个错误json对象返回
		var errObj = {
			error: err
		}
		console.log(err)
		res.json(JSON.stringify(errObj));
	});
});

app.listen(port, function(err){
	if( err ){
		console.log(err);
	}
});

/*
  	这里data的数据结构为
	{
		post: data,
		url: url,
		options: options
	};
	post表示要post过去的数据
	url表示请求的地址
	options 配置
*/

function proxy(req){
	return new Promise(function(resolve, reject){
		// wechat后台只支持Content-Type: application/x-www-form-urlencoded
		var data = req.body;
		// 获得浏览器发过来的cookie
		var cookie = req.headers["cookie"];
		var options = {
			form: data.post,
			method: data.options && data.options.method || "GET"
		}
		if( cookie ){
			options["headers"]["Cookie"] = cookie;
		}
		request(
			data.url,
			options, 
			function(err, res){
				// // 记录cookie
				// cookies = res.headers["set-cookie"] || cookies;
				// // 日志记录，debug的时候可以分析请求与响应
				// logger.log("cookie::::: ", cookies);
				// logger.log(res);
				if(err){
					reject(err);
				}else{
					logger.log(`\nres.body: ${ res.body}\nres.headers['set-cookie']: ${res.headers["set-cookie"]}`);
					resolve({
						data: res.body,
						cookie: res.headers["set-cookie"] // 获得wechat后台发过来的cookie
					});
				}
			}
		);
	});
}

function hasUrl(req){
	// 判断有无url
	var data = req.body;
	return new Promise(function(resolve, reject){
		if( !data.url ){
			reject("there are no url");
		}else{
			resolve(req);
		}
	});
}