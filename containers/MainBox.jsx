import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginAction, commonAction, friendAction } from "../actions";
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
		actions.checkIsLogin();
		actions.getInfo(personInfo.userid);
		actions.getFriendsList();
	}

	render(){
		const { friendsList, personInfo, actions } = this.props;
		const { updateInfo } = actions;
		return (
			<div className = "mainBox">
				<FriendsBox 
					friendsList = { friendsList }
					personInfo = { personInfo }
					updateInfoAction = { updateInfo }
				/>
				<MessageBox />
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
				assign({}, loginAction, commonAction, friendAction), 
				dispatch
			)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainBox);