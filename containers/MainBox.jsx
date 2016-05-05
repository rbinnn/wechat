import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginAction, commonAction, friendAction, personInfoAction, logoutAction } from "../actions";
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
		actions.getPersonInfo(personInfo.userid);
		actions.getFriendsList();
	}

	render(){
		const { friends, personInfo, actions } = this.props;
		const { updatePersonInfo } = actions;
		return (
			<div className = "mainBox">
				<FriendsBox 
					friends = { friends }
					personInfo = { personInfo }
					updateInfoAction = { updatePersonInfo }
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
				assign({}, loginAction, personInfoAction, friendAction, logoutAction), 
				dispatch
			)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainBox);