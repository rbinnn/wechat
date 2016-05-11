import React, { Component } from "react";
import UserBar from "./UserBar.jsx";
import FriendCard from "./FriendCard.jsx";
import "../sources/style/sass/friendsBox.scss";
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
		/* 初始化一个独立的state
			showSave用来控制两个同级的子组件的通信
			在这里，modal的设置是类似于这样子的
			<Modal>
				<Main />
				<Footer />
			</Modal>
			组件Main中有一个表单，组件Footer有一个保存按钮
			它们是属于同级组件
			我们需要在点击Footer组件的保存按钮后去获得组件Main的表单内容发送异步请求
			因此是属于同级组件通信问题
			实现方法，就是在Modal组件设置一个state，组件Footer可以改变这个state，
			而Main组件可以获得这个state的改变，实现通信
		*/
		this.state = {
			showSave: false
		}
	}

	showSaveFn(){	
		// 通知好友信息模态窗内部的表单组件进行表单提交操作
		this.setState({
			showSave: true
		});
	}

	/*
		* 更新备注
		+ updateRemark(userid, remark) 备注改变了
		+ updateRemark(null) 备注跟之前的备注相同没改变
	*/
	updateRemark(userid, remark){
		const { updateRemark, closeFriendInfoModal } = this.props.actions;
		// 设置showSave为false
		this.setState({
			showSave: false
		});
		// 关闭好友信息模态窗
		closeFriendInfoModal();
		if( userid !== null ){
			// 异步请求更新remark
			updateRemark(userid, remark);
		}
	}

	render(){
		const { friends, actions, menu, unread, currentChat } = this.props;
		const { list, modalVisible } = friends;
		// 获得双击中的好友的信息对象
		const friendInfo = 	
			currentChat ? 
				_.find(list, item => item.userid === currentChat ) || {}
				: {};

		return(
			<div className = "friendsBox">
				<UserBar 
					personInfo = { this.props.personInfo }
					menuState = { menu }
					showPersonInfoModalAction = { actions.showPersonInfoModal }
					hidePersonInfoModalAction = { actions.hidePersonInfoModal }					
					showMenu = { actions.showMenu }
					hideMenu = { actions.hideMenu }
					updatePersonInfoAction = { actions.updatePersonInfo }
					logoutAction = { actions.logoutPost }
				/>
				<ul id = "friends-bar">
					{ 
						_.map(list, item => {
							return <FriendCard 
								remark = { item.remark } 
								userid = { item.userid } 
								key = { createKey() } 
								hasUnread = { !_.isEmpty(unread[item.userid]) }
								setCurrentChat = { actions.setCurrentChat }
								readUnread = { actions.readUnread }
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
						currentChat = { currentChat }
						updateRemark = { this.updateRemark }
					/>
				</Modal>
			</div>
		);
	}
}