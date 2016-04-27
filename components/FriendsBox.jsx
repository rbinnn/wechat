import React, { Component } from "react";
import UserBar from "./UserBar.jsx";
import FriendCard from "./FriendCard.jsx";
import Menu from "./Menu.jsx";
import "../sources/sass/friendsBox.scss";

export default class FriendsBox extends Component{
	render(){
		return(
			<div className = "friendsBox">
				<UserBar />
				<Menu />
				<ul id = "friends-bar">
					<FriendCard />
					<FriendCard />
					<FriendCard />
					<FriendCard />
					<FriendCard />
					<FriendCard />
					<FriendCard />
					<FriendCard />
					<FriendCard />
					<FriendCard />
					<FriendCard />
					<FriendCard />
					<FriendCard />
					<FriendCard />
					<FriendCard />
					<FriendCard />
					<FriendCard />
					<FriendCard />
				</ul>
			</div>
		)
	}
}