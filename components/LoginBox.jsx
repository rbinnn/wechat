import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginAction } from "../actions";
import { Statue } from "../constants";

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
		console.log(this.props.actions)
		this.props.actions.loginPost(user, pass);
	}

	componentWillReceiveProps(props) {
		if( props.statue === Statue.LOGINING ){
			console.log("i am logining!!")
		}
	}

	render(){
		return (
			<form>
				<div>
					<label for = "username">username</label>
					<input type = "text" id = "username" ref = "username"/>
				</div>
				<div>
					<label for = "password">password</label>
					<input type = "password" id = "password" ref = "password"/>
				</div>
				<div>
					<button type = "button" onClick = { this.login }>登录</button>
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
	return {		
		actions: bindActionCreators(loginAction, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox);