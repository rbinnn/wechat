import React, { Component } from "react";
import "../sources/sass/messageBox.scss";
import ChatWindow from "./ChatWindow.jsx";
import ChatInput from "./ChatInput.jsx";

export default class messageBox extends Component{
	render(){
		return (
			<div id = "message-bar">	
				<div className="title">胖胖胖胖</div>			
				<ChatWindow />
				<ChatInput />
			</div>
		);
	}
}