import React, { Component } from "react";
import UserBar from "./UserBar.jsx";
import FriendCard from "./FriendCard.jsx";
import Menu from "./Menu.jsx";
import "../sources/sass/friendsBox.scss";
import Modal from "./Modal.jsx";
import FriendInfoModal from "./FriendInfoModal.jsx";

var uid = 0;
function createKey(){
	return `wechat_${uid++}`;
}

export default class FriendsBox extends Component{
	constructor(){
		super();
		this.showFriendInfoModal = this.showFriendInfoModal.bind(this);
		this.hideFriendInfoModal = this.hideFriendInfoModal.bind(this);
		this.showSaveFn = this.showSaveFn.bind(this);
		this.state = {
			modalVisible: false
		}
	}

	showFriendInfoModal(){
		this.setState({
			modalVisible: true
		});
	}

	hideFriendInfoModal(){
		this.setState({
			modalVisible: false
		});
	}

	showSaveFn(){

	}

	render(){
		const { modalVisible } = this.state;
		return(
			<div className = "friendsBox">
				<UserBar 
					personInfo = { this.props.personInfo }
					updateInfoAction = { this.props.updateInfoAction }
				/>
				<Menu />
				<ul id = "friends-bar">
					{ 
						this.props.friendsList.map( item => {
							return <FriendCard 
								remark = { item.remark } 
								userid = { item.userid } 
								key = { createKey() } 
								onDoubleClick = { this.showFriendInfoModal }
							/>
						})
					}
				</ul>
				<Modal
					visible = { modalVisible }
					title = "好友资料"
					close = { this.hideFriendInfoModal }
					showSaveFn = { this.showSaveFn }
				>
					<FriendInfoModal 

					/>
				</Modal>
			</div>
		);
	}
}