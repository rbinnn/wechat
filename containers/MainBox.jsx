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
import InfoBox from "../components/InfoBox.jsx";
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
		actions.getPersonInfo(personInfo.userid);
		actions.getFriendsList();
		actions.getUnreadPost();

	}

	

	render(){
		const { friends, 
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
					actions = { actions }
					personInfo = { personInfo }
					menu = { menu }
				/>
				<MessageBox 
					actions = { actions }
					message = { message }
					currentChat = { currentChat }
					friends = { friends }
				/>
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