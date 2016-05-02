import React, { Component, PropTypes } from "react";
import Dialog from "rc-dialog";
import 'rc-dialog/assets/index.css';
import "../sources/sass/modal.scss";

/**
<Modal title = "好友资料" visible = { true }>
	<FriendInfoModal />
</Modal>
*/

const width = 380;

const footer = [
	<button key = "cancel" className = "cancel-btn">cancel</button>,
	<button key = "save" className = "save-btn">save</button>
];

export default class Modal extends Component{
	render(){
		return (
			<Dialog 
				visible = { this.props.visible } 
				footer = { footer } 
				width = { width } 
				title = { this.props.title }
			>
				{ this.props.children }
			</Dialog>
		);
	}
}