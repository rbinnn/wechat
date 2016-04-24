const assign = Object.assign;

function base(options, resolve, reject){
	const { method, data, url } = options; 
	var httper = new XMLHttpRequest();
	httper.open(method, url);
	httper.setRequestHeader("Content-Type","application/json;charset=utf-8");  
	httper.send(JSON.stringify(data));
	httper.onreadystatechange = function(){
  		if(httper.readyState === 4 ){
	  		if( httper.status >= 200 && httper.status < 400 ){
	  			resolve(httper.responseText);
	    	}else{
	    		reject(httper.responseText);
	    	}  			
  		}
    }
}


export default function fetch(data){
	return new Promise(( resolve, reject ) => {
		base(data, resolve, reject);
	})
}