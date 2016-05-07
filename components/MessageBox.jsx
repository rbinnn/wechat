import React, { Component } from "react";
import "../sources/sass/messageBox.scss";
import MessageCard from "./MessageCard.jsx";
import ChatInput from "./ChatInput.jsx";
import _ from "lodash";

var index =0;

export default class MessageBox extends Component{
	constructor(){
		super();
		this.sendTo = this.sendTo.bind(this);
	}
	sendTo(content){
		const { actions, currentChat } = this.props;
		actions.sendToPost(currentChat, content);
	}
	componentWillReceiveProps(nextProps){
		const { currentChat, actions } = this.props;
		if( !currentChat || currentChat !== nextProps.currentChat ){
			actions.getRecentPost(nextProps.currentChat);
		}
	}
	render(){
		const { actions, currentChat, message, friends } = this.props;
		// 获得该好友的备注名
		const friend = _.find(friends.list, item => item.userid === currentChat);
		// 获得该好友的最近消息列表
		const list = message.recent[currentChat];
		return (
			<div id = "message-bar">	
				<div className="title">{ friend ? friend.remark : currentChat }</div>			
				<div id="chat-window">
					{
						_.map(list, message => {
							return <MessageCard
									key = { index++ } 
									direction = { message.toUserId === currentChat ? "right" : "left" }
									content = { message.content }
									time = { message.time }
								/>;							
						})
					}
				</div>
				<ChatInput 
					sendTo = { this.sendTo }
				/>
			</div>
		);
	}
}