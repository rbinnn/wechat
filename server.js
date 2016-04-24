const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
const app = new (require("express"))();
const bodyParser = require('body-parser');
const port = 3000;
const compiler = webpack(config);


app.use(webpackDevMiddleware(compiler, { noInfo: true }));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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