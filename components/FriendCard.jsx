import React, { Component } from "react";
import "../sources/sass/friendCard.scss";

export default class FriendCard extends Component{
	constructor(){
		super();
		this.getFriendInfo = this.getFriendInfo.bind(this)
	}
	getFriendInfo(){
		const { userid } = this.props;
		this.props.setCurrentFriendId(userid);	
		this.props.getFriendInfo(userid);
		this.props.showFriendInfoModal();	
	}
	render(){
		return (
			<li 
				onDoubleClick = { this.getFriendInfo }
			>
				<img src="/images/webwxgeticon_0.jpg" alt=""/>
				<span>{ this.props.remark || this.props.userid }</span>
			</li>
		);
	}
}