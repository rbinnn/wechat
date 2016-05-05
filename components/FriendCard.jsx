import React, { Component } from "react";
import "../sources/sass/friendCard.scss";

export default class FriendCard extends Component{
	constructor(){
		super();
		this.showFriendInfoModal = this.showFriendInfoModal.bind(this)
	}
	showFriendInfoModal(id){
		console.log(this.props.userid)
	}
	render(){
		return (
			<li 
				onDoubleClick = { this.showFriendInfoModal }
			>
				<img src="/images/webwxgeticon_0.jpg" alt=""/>
				<span>{ this.props.remark }</span>
			</li>
		);
	}
}