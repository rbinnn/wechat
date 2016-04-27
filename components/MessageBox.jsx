import React, { Component } from "react";
import "../sources/sass/messageBox.scss";
import MessageCard from "./MessageCard.jsx";
import ChatInput from "./ChatInput.jsx";

export default class MessageBox extends Component{
	render(){
		return (
			<div id = "message-bar">	
				<div className="title">胖胖胖胖</div>			
				<div id="chat-window">
					<MessageCard direction = "left"/>
					<MessageCard direction = "left"/>
					<MessageCard direction = "right" />
					<MessageCard direction = "left"/>
					<MessageCard direction = "right" />
					<MessageCard direction = "right" />
				</div>
				<ChatInput />
			</div>
		);
	}
}