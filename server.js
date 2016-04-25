var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var express = require("express")
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = 5000;
var compiler = webpack(config);
var request = require("request");
var logger = require("./middlewares/server_log");

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
	.resolve(req.body)
	.then(hasUrl)
	.then(proxy)
	.then(function(data){
		res.json(data);
	})
	// .then(res.json.bind(this))
	.catch(function(err){
		// 出错的话封装一个错误json对象返回
		var errObj = {
			error: err
		}
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
function proxy(data){
	return new Promise(function(resolve, reject){
		// wechat后台只支持Content-Type: application/x-www-form-urlencoded
		request(
			data.url,
			{
				form: data.post,
				method: data.options && data.options.method || "GET"
			}, 
			function(err, res){
				// 日志记录，debug的时候可以分析请求与响应
				logger.log(res);
				if(err){
					reject(err);
				}else{
					resolve(res.body);
				}
			}
		);
	});
}

function hasUrl(data){
	// 判断有无url
	return new Promise(function(resolve, reject){
		if( !data.url ){
			reject("there are no url");
		}else{
			resolve(data);
		}
	});
}