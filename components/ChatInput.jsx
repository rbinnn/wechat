import React, { Component } from "react";

export default class ChatInput extends Component{
	render(){
		return (
			<div id = "chat-input">
				<textarea></textarea>
				<button>发送</button>
			</div>
		);
	}
}