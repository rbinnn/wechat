import React, { Component } from "react";

export default class ChatInput extends Component{
	constructor(){
		super();
		this.clickHandler = this.clickHandler.bind(this);
		this.keyDownHander = this.keyDownHander.bind(this);
	}

	clickHandler(){
		const content = this.refs.messageInput.value;
		const { sendTo } = this.props;
		if( !!content ){
			sendTo(content);
		}
		this.refs.messageInput.value = "";
	}

	keyDownHander(e){
		// 按下回车键的时候
		if( e.keyCode === 13 ){
			// 按下回车键会自动换一行，我们不希望这个行为发生
			e.preventDefault();
			this.clickHandler();
			return ;
		}
	}
	
	render(){
		return (
			<div id = "chat-input">
				<textarea 
					ref = "messageInput"
					onKeyDown = { this.keyDownHander }
				></textarea>
				<button onClick = { this.clickHandler }>发送</button>
			</div>
		);
	}
}