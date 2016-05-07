import React, { Component } from "react";
import "../sources/sass/friendCard.scss";

export default class FriendCard extends Component{
	constructor(){
		super();
		this.getFriendInfo = this.getFriendInfo.bind(this);
		this.setCurrentChat = this.setCurrentChat.bind(this);
	}
	getFriendInfo(){
		const { userid } = this.props;
		this.props.setCurrentFriendId(userid);	
		this.props.getFriendInfo(userid);
		this.props.showFriendInfoModal();	
	}
	setCurrentChat(){
		this.props.setCurrentChat(this.props.userid);
	}
	render(){
		return (
			<li 
				onDoubleClick = { this.getFriendInfo }
				onClick = { this.setCurrentChat }
			>
				<img src="/images/webwxgeticon_0.jpg" alt=""/>
				<span>{ this.props.remark || this.props.userid }</span>
			</li>
		);
	}
}