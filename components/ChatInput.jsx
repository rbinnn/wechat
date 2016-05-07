import React, { Component } from "react";

export default class ChatInput extends Component{
	constructor(){
		super();
		this.clickHandler = this.clickHandler.bind(this);
	}
	clickHandler(){
		const content = this.refs.messageInput.value;
		const { sendTo } = this.props;
		if( !!content ){
			sendTo(content);
		}
		this.refs.messageInput.value = null;
	}
	render(){
		return (
			<div id = "chat-input">
				<textarea ref = "messageInput"></textarea>
				<button onClick = { this.clickHandler }>发送</button>
			</div>
		);
	}
}