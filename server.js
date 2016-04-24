var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var config = require('./webpack.config');
var app = new (require("express"))();
var bodyParser = require('body-parser');
var port = 3000;
var compiler = webpack(config);


app.use(webpackDevMiddleware(compiler, { noInfo: true }));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.post("/proxy.do", function(req, res){
	console.log("234",req.body);
	console.log(req.realUrl)
	res.end();
});

app.listen(port, function(err){
	if( err ){
		console.log(err);
	}
});