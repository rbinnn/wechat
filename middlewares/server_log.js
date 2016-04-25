/*
* 日志记录
*/
var log4js = require("log4js"),
	isInit = false,
	maxSize,
	backups,
	level,
	appenders,
	networkLog;
	// typeList = ["debug", "info", "warn", "error"];

function init(){

	level = "INFO";

	appenders = [
		{
			type: "file",
			categeory: "network",
			filename: "log/network.log",
			backups: backups || 10,
			maxLogSize: maxSize || 1024000000
		}
	];

	// 配置 log4js
    log4js.configure({
        appenders: appenders,
        replaceConsole: true
    });

    // 配置单个日志
    networkLog = log4js.getLogger('network');
    networkLog.setLevel(level);
    isInit = true;

    log("log init network ---------- ");

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