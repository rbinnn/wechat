const baseUrl = "http://cheewp.duapp.com/WeChat/";

/** 后台访问的接口API
*/

const Api = {
	login: `${baseUrl}?action=User&method=login`,
	checkIsLogin: `${baseUrl}?action=User&method=checkIsLogin`,
	logout: `${baseUrl}?action=User&method=logout`,
	updateInfo: `${baseUrl}?action=User&method=update`,
	getInfo: `${baseUrl}?action=User&method=getUserById`,
	getFriends: `${baseUrl}?action=Friend&method=getFriendsList`,
	setRemark: `${baseUrl}?action=Friend&method=setRemark`,
	sendMessage: `${baseUrl}?action=Message&method=sendTo`,
	getHasUnread: `${baseUrl}?action=Message&method=getUnreadUserId`,
	getUnreadMessage: `${baseUrl}?action=Message&method=getUnreadByUserId`,
	getRecentMessage: `${baseUrl}?action=Message&method=getRecentByUserId` 
};

export default Api;