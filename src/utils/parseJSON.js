/*
	转换JSON对象
    @data { String } JSON字符串
    @return { Object } 转换后的JSON对象
*/
export default function parseJSON(data){
	if ( !data ) {
        return {};
    }
    var jsonData = {};
    if (typeof data === "object") {
        return data;
    }
    try {
        jsonData = JSON.parse(data);
    } catch (e) {
        console.log("hello,", e, data);
    }
    if (typeof jsonData === "string") {
        return {}
    }
    return jsonData;
}