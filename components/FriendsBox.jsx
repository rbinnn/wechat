import React, { Component } from "react";
import UserBar from "./UserBar.jsx";
import FriendCard from "./FriendCard.jsx";
import Menu from "./Menu.jsx";
import "../sources/sass/friendsBox.scss";

var uid = 0;
function createKey(){
	return `wechat_${uid++}`;
}

export default class FriendsBox extends Component{
	render(){
		return(
			<div className = "friendsBox">
				<UserBar personInfo = { this.props.personInfo }/>
				<Menu />
				<ul id = "friends-bar">
					{ 
						this.props.friendsList.map( item => {
							return <FriendCard remark = { item.remark } userid = { item.userid } key = { createKey() } />
						})
					}
				</ul>
			</div>
		);
	}
}