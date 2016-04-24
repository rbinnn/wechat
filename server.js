var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var app = (require("express"))();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = 3000;
var compiler = webpack(config);
var request = require("request");

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.post("/proxy.do", function(req, res){
	Promise
	.resolve(req.body)
	.then(hasUrl)
	.then(proxy)
	.then(res.end)
	.catch(function(err){
		// 出错的话封装一个错误json对象返回
		var errObj = {
			error: err
		}
		res.end(JSON.stringify(errObj));
	});
});

app.listen(port, function(err){
	if( err ){
		console.log(err);
	}
});


function proxy(data){
	console.log(data)
	return new Promise(function(resolve, reject){
		request(
			data.url,
			{
				form: data.data,
				method: data.options.method || "GET"
			}, 
			function(err, res){
				if(err){
					reject(err)
				}else{
					resolve(res.body)
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