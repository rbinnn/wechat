import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { 	
		loginAction, 
		commonAction, 
		friendAction, 
		personInfoAction, 
		logoutAction,
		menuAction,
		messageAction,
		currentChatAction
	} from "../actions";
import { Statue } from "../constants";
import FriendsBox from "../components/FriendsBox.jsx";
import MessageBox from "../components/MessageBox.jsx";
const assign = Object.assign;

class MainBox extends Component{
	constructor(...props){
		super(...props);
		this.getInfo.call(this);
	}

	getInfo(){
		const { actions, personInfo } = this.props; 
		// actions.checkIsLogin();
		// 获取个人信息
		actions.getPersonInfo(personInfo.userid);
		// 获取好友列表
		actions.getFriendsList();
		// 获取未读消息
		actions.getUnreadPost();
		// 每隔2秒做一次短轮询获取未读消息
		// setInterval(actions.getUnreadPost.bind(actions), 2000);
	}	

	render(){
		const { 
				friends, 
				personInfo, 
				actions, 
				menu, 
				message,
				currentChat
			} = this.props;
		return (
			<div className = "mainBox">
				<FriendsBox 
					friends = { friends }
					personInfo = { personInfo }
					menu = { menu }
					unread = { message.unread }
					currentChat = { currentChat }
					actions = { actions }
				/>
				{
					currentChat ? 
						<MessageBox 
							actions = { actions }
							message = { message }
							currentChat = { currentChat }
							friends = { friends }
						/> : "" 
				}

			</div>
		)
	}

}



function mapStateToProps(state){
	return state;
}

function mapDispatchToProps(dispatch){
	return {		
		actions: 
			bindActionCreators(
				assign(
					{}, 
					loginAction, 
					personInfoAction, 
					friendAction, 
					logoutAction, 
					menuAction,
					messageAction,
					currentChatAction
				), 
				dispatch
			)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainBox);