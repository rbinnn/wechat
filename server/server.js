var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config');
var express = require("express")
var app = express();
var bodyParser = require('body-parser');
var port = 1234;
var logger = require("./utils/server_log");
var compiler = webpack(config);
var request = require("request");

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(__dirname + '/webapp'));

app.get("/", function(req, res) {
  res.sendFile('/index.html')
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
			method: data.options && data.options.method || "GET",
			headers: {
				cookie: cookie || ""
			}
		}
		request(
			data.url,
			options, 
			function(err, res){
				if(err){
					reject(err);
				}else{
					/* 
						获得wechat后台发过来的cookie，wechat后台只会在登录成功后发送回来1个cookie，
						其他请求不会，为了防止cookie过期（虽然设的时间也是很长了）
						所以要手动将该cookie再其他请求的响应中set-cookie进去					
					*/
					var wechatCookie = res.headers['set-cookie'] || cookie;  
					var wechatData = res.body;
					logger.log(res)
					logger.log(`\nres.body: ${ wechatData }\nres.headers['set-cookie']: ${ wechatCookie }`);
					resolve({
						data: wechatData,
						cookie: wechatCookie
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