import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginAction } from "../actions";
import { Statue } from "../constants";
import "../sources/sass/login.scss";

class LoginBox extends Component{
	constructor(...props){
		super(...props);
		this.login = this.login.bind(this);
	}

	login(e){
		e.preventDefault();
		const user = this.refs.username.value;
		const pass = this.refs.password.value;
		if( !user || !pass ){
			return;
		}
		this.props.actions.loginPost(user, pass);
	}

	componentWillReceiveProps(props) {
		if( props.statue === Statue.LOGINING ){
			// 做一些动画操作...
			console.log("i am logining!!")
		}
	}

	render(){
		return (
			<form className = "row loginBox">
				<div className = "item">
					<input type = "text" 
						id = "username" 
						ref = "username" 
						placeholder = "your name ..."
					/>
				</div>
				<div className = "item">
					<input type = "password" 
						id = "password" 
						ref = "password" 
						placeholder = "your password ..."
					/>
				</div>
				<div className = "item">
					<button type = "button" 
						onClick = { this.login }
					>登录</button>
				</div>
			</form>
		);
	}
}


function mapStateToProps(state){
	// 只暴露statue给LoginBox组件
	return {
		statue: state.statue
	};
}

function mapDispatchToProps(dispatch){
	// 只暴露登录相关的action
	return {		
		actions: bindActionCreators(loginAction, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox);