import React, { Component } from "react";
import { default as friendPic } from "../sources/images/webwxgeticon_0.jpg";
import "../sources/style/sass/friendCard.scss";

export default class FriendCard extends Component{
	constructor(){
		super();
		this.clickHandler = this.clickHandler.bind(this);
	}
	clickHandler(e){
		// 设置当前跟哪个好友聊天
		this.props.setCurrentChat(this.props.userid);
		// 清空该好友未读
		this.props.readUnread(this.props.userid);
	}
	render(){
		return (
			<li 
				onClick = { this.clickHandler }
			>
				{
					this.props.hasUnread ? 
					<i className="unread-point"></i> : ""
				}
				<img 
					src= { friendPic }
				/>
				<span>{ this.props.remark || this.props.userid }</span>
			</li>
		);
	}
}