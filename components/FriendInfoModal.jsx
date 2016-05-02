import React, { Component, PropTypes } from "react";
import Dialog from "rc-dialog";

export default class FriendInfoModal extends Component{
	render(){
		return (
			<Dialog visible = { this.props.visible} title = "好友资料">
			</Dialog>
		);
	}
}