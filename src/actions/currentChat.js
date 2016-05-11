import { CurrentChat } from "../constants";

function setCurrentChat(id){
	return {
		type: CurrentChat.SETCURRENTCHAT,
		id
	}
}

const currentChat = {
	setCurrentChat
}

export default currentChat;