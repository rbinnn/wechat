/*
* 日志记录
*/
var log4js = require("log4js"),
	fs = require("fs"),
	path = require("path"),
	isInit = false,
	maxSize,
	backups,
	level,
	appenders,
	networkLog,
	networkLogFile = "private/log/network.log";
	// typeList = ["debug", "info", "warn", "error"];

function init(){

	// doFile();

	level = "INFO";

	appenders = [
		{
			type: "file",
			categeory: "network",
			filename: networkLogFile,
			backups: backups || 10,
			maxLogSize: maxSize || 1024000000
		}
	];

	// 配置 log4js
    log4js.configure({
        appenders: appenders,
        replaceConsole: false
    });

    // 配置单个日志
    networkLog = log4js.getLogger('network');
    networkLog.setLevel(level);
    isInit = true;

    log("log init network log ---------- ");

}

function doFile(){
	try{
		// 尝试删除日志文件
		var p = path.resolve(__dirname, "../", networkLogFile);
		var stats = fs.statSync(p);
		if( stats.isFile() ){
			fs.unlinkSync(p);
		}		
	}catch(e){
		// 错误就不管了
	}
}


function log(){
	var args = [].slice.apply(arguments);

	if( !isInit ){
		init();
	}

	networkLog.info.apply(networkLog, args);
}

exports.log = log;

// for(let i = 0, len = typeList.length; i < len; i++ ){
// 	let key = typeList[i];
// 	exports[key] = function(){

// 		var args = [].slice.apply(arguments);

// 		if( !isInit ){
// 			init();
// 		}

// 		networkLog[key].apply(networkLog, args);
// 	}
// }