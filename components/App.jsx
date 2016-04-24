import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UserAction from "../actions/user";
import LoginBox from "./LoginBox.jsx";
import MainBox from "./MainBox.jsx";


class App extends Component{
	render(){
		const { 
			statue, 
			personInfo, 
			friendsList, 
			message, 
			actions 
		} = this.props;
		console.log(statue)
		const isLogin = statue !== "LOGOUTED";

		return (
			<div>
				{ isLogin ? 
					<MainBox />: 
					<LoginBox 
						login = { actions.login }
						post = { actions.loginPost }
					/>  
				}
			</div>
		);
	}
}

function mapStateToProps(state){
	return state;
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(UserAction, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);