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


export default class Modal extends Component{
	constructor(){
		super();
		this.close = this.close.bind(this);
		this.save = this.save.bind(this);
	}

	// 关闭模态框
	close(){
		this.props.close();
	}

	// 保存
	save(){
		// 改变父组件的state，与同级组件通信
		this.props.showSaveFn();
	}
	
	render(){
		const footer = [
			<button key = "cancel" 
				className = "cancel-btn" 
				onClick = { this.close }
			>cancel</button>,
			<button key = "save" 
				className = "save-btn" 
				onClick = { this.save }
			>save</button>
		];
		return (
			<Dialog 
				visible = { this.props.visible } 
				footer = { footer } 
				width = { width } 
				title = { this.props.title }
				onClose = { this.close }
			>
				{ this.props.children }
			</Dialog>
		);
	}
}