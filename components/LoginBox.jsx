import React, { Component, PropTypes } from "react";

export default class LoginBox extends Component{
	constructor(...props){
		super(...props);
		this.loginPost = this.loginPost.bind(this);
	}

	loginPost(e){
		e.preventDefault();
		const user = this.refs.username.value;
		const pass = this.refs.password.value;
		if( !user || !pass ){
			return;
		}
		this.props.post(user, pass);
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
					<button type = "button" onClick = { this.loginPost }>登录</button>
				</div>
			</form>
		);
	}
}