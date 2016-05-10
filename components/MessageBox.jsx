import React, { Component } from "react";
import "../sources/sass/messageBox.scss";
import MessageCard from "./MessageCard.jsx";
import ChatInput from "./ChatInput.jsx";
import _ from "lodash";

var index = 0;

export default class MessageBox extends Component{
	constructor(){
		super();
		this.sendTo = this.sendTo.bind(this);
		this.getFriendInfo = this.getFriendInfo.bind(this);
	}

	// 发送消息
	sendTo(content){
		const { actions, currentChat } = this.props;
		actions.sendToPost(currentChat, content);
	}

	// 获得好友信息
	getFriendInfo(){
		const { currentChat, actions } = this.props;
		// 获得好友的信息
		actions.getFriendInfo(currentChat);
		// 打开好友信息模态窗
		actions.openFriendInfoModal();	
	}

	componentWillMount(){
		// 获得最近消息
		this.props.actions.getRecentPost(this.props.currentChat);		
	}

	componentWillReceiveProps(nextProps){
		const { currentChat, actions } = this.props;
		const { message: nextMessage } = nextProps;
		/* 
			currentChat不为空，接收到一个新的currentChat跟当前的不一致
			去获取最近消息
		*/
		if( currentChat && currentChat !== nextProps.currentChat ){
			actions.getRecentPost(nextProps.currentChat);
		}else{
			// 如果两次currentChat都相同，说明还在跟同一个好友聊天
			if( currentChat in nextMessage["unread"] ){
				// 如果有该好友的未读消息（因为在同个窗口）
				// 把未读消息放到最近消息
				actions.unreadToRecent(currentChat, nextMessage["unread"][currentChat]);
				// 清空未读消息改变为已读
				actions.readUnread(currentChat);
			}			
		}
	}

	// 在组件更新完之后操作dom
	componentDidUpdate(){
		// 这样是无效的
		// const dom = this.refs.messageBox;
		// this.refs.messageBox.scrollTop = this.refs.messageBox.scrollHeight;

		// 使得滚动条始终在滚动区域的底部，优化用户体验
		const chatWindow = document.querySelector("#chat-window");
		chatWindow.scrollTop = chatWindow.scrollHeight;
	}

	render(){
		const { actions, currentChat, message, friends } = this.props;
		// 获得该好友的备注名
		const friend = _.find(friends.list, item => item.userid === currentChat);
		// 获得该好友的最近消息列表
		const list = message.recent[currentChat];
		return (
			<div id = "message-bar" ref = "messageBox">	
				<div className="title" onDoubleClick = { this.getFriendInfo }>
					{ /* 备注 > 昵称 > 用户的id */ }
					{ friend ? friend.remark || friend.nickName || currentChat : currentChat }
				</div>			
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