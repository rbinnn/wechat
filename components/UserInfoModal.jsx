import React, { Component, PropTypes } from "react";

export default class UserInfoModal extends Component{
	render(){
		return (
			<form id = "userInfo-bar">
				<div className="item">
					<label htmlFor="u-nickname">昵称</label>
					<input type="text" id="u-nickname" value = { this.props.nickname } placeholder = "your nickname ..."/>
				</div>
				
				<div className="item">
					<label htmlFor="u-email">Email</label>
					<input type="email" id="u-email" value = { this.props.email } placeholder = "your email ..."/>
				</div>
				<div className="item">
					<div>
						<label htmlFor="u-age">年龄</label>
						<input type="number" id="u-age" value = { this.props.age } />
					</div>
					<div>
						<label htmlFor="u-sex">性别</label>
						<select id="u-sex"  defaultValue={"1"}>
							<option value="0">男</option>
							<option value="1">女</option>
						</select>
					</div>
				</div>
				<div className="item">
					<label htmlFor="u-intro">介绍</label>
					<textarea id="u-intro" placeholder = "your introduction ..."></textarea>
				</div>
			</form>
		);
	}
}