import React, { Component, PropTypes } from "react";
import Dialog from "rc-dialog";

export default UserInfoModal extends Component{
	render(){
		return (
			<Dialog visible = { this.props.visible} title = "个人信息">
				<form id = "userInfo-bar">
					<div className="item">
						<label htmlFor="u-nickname">昵称 :</label>
						<input type="text" id="u-nickname" value = { this.props.nickname }/>
					</div>
					<div className="item">
						<label htmlFor="u-email">Email :</label>
						<input type="text" id="u-email" value = { this.props.email }/>
					</div>
					<div className="item">
						<label htmlFor="u-intro">个人介绍 :</label>
						<textarea id="u-intro"></textarea>
					</div>
				</form>
			</Dialog>
		);
	}
}