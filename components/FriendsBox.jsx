import React, { Component } from "react";
import UserBar from "./UserBar.jsx";
import FriendCard from "./FriendCard.jsx";
import Menu from "./Menu.jsx";
import "../sources/sass/friendsBox.scss";
import Modal from "./Modal.jsx";
import FriendInfoModal from "./FriendInfoModal.jsx";
import _ from "lodash";

var uid = 0;
function createKey(){
	return `wechat_${uid++}`;
}

export default class FriendsBox extends Component{
	constructor(){
		super();
		this.showSaveFn = this.showSaveFn.bind(this);
		this.updateRemark = this.updateRemark.bind(this);
		this.state = {
			showSave: false
		}
	}

	showSaveFn(){	
		const { closeFriendInfoModal } = this.props.actions;
		this.setState({
			showSave: true
		});
		closeFriendInfoModal();
	}

	updateRemark(userid, remark){
		const { updateRemark } = this.props.actions;
		this.setState({
			showSave: false
		});
		updateRemark(userid, remark);
	}

	render(){
		const { friends, actions } = this.props;
		const { list, modalVisible, currentFriendId } = friends;
		const friendInfo = 	
			currentFriendId ? 
				_.find(list, item => item.userid === currentFriendId ) || {}
				: {};

		return(
			<div className = "friendsBox">
				<UserBar 
					personInfo = { this.props.personInfo }
					updateInfoAction = { this.props.updateInfoAction }
				/>
				<Menu />
				<ul id = "friends-bar">
					{ 
						_.map(list, item => {
							return <FriendCard 
								remark = { item.remark } 
								userid = { item.userid } 
								key = { createKey() } 
								getFriendInfo = { actions.getFriendInfo }
								setCurrentFriendId = { actions.setCurrentFriendId }
								hideFriendInfoModal = { actions.closeFriendInfoModal }
								showFriendInfoModal = { actions.openFriendInfoModal }
							/>
						})
					}
				</ul>
				<Modal
					visible = { modalVisible }
					title = "好友资料"
					close = { actions.closeFriendInfoModal }
					showSaveFn = { this.showSaveFn }
				>
					<FriendInfoModal
						friendInfo = { friendInfo }
						showSave = { this.state.showSave }
						currentFriendId = { currentFriendId }
						updateRemark = { this.updateRemark }
					/>
				</Modal>
			</div>
		);
	}
}