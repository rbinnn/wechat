import React, { Component } from "react";
import "../sources/sass/userBar.scss";
import "../sources/css/iconfont.css";
import Modal from "./Modal.jsx";
import UserInfoModal from "./UserInfoModal.jsx";
import { Menu } from "../constants"
const assign = Object.assign;

export default class UserBar extends Component{
	constructor(){
		super();
		this.showSaveFn = this.showSaveFn.bind(this);
		this.updateInfo = this.updateInfo.bind(this);
		this.toggleMenu = this.toggleMenu.bind(this);
		this.toggleMenuGlobal = this.toggleMenuGlobal.bind(this);
		// 目的同好友模态框
		this.state = {
			showSave: false
		}
	}
	
	showSaveFn(){
		this.setState({
			showSave: true
		});
	}

	/*
		* 更新个人信息
		+ updateInfo(data) 个人信息修改了
		+ updateInfo(null) 个人信息没修改
	*/
	updateInfo(data){
		const { hidePersonInfoModalAction, updatePersonInfoAction } = this.props;
		// 不管数据有没有修改过，都要取消showSave状态
		this.setState({
			showSave: false
		});
		// 关闭模态窗
		hidePersonInfoModalAction();
		// 有数据的话就调用接口提交新的个人信息
		if( data !== null ){
			updatePersonInfoAction(data);
		}
	}

	componentDidMount(){
		// 绑定全局点击事件
		document.addEventListener("click", this.toggleMenuGlobal, false)
	}

	// 点击回调函数
	toggleMenuGlobal(e){
		if( e.target === this.refs.menuBtn ){
			// 点击目标是该按钮
			this.toggleMenu(false);
		}else{
			// 在其他地方点击
			this.toggleMenu(true);
		}
	}

	// 切换菜单显示或者隐藏
	toggleMenu(isGlobal){
		const { menuState, showMenu, hideMenu } = this.props;
		if( menuState ){
			hideMenu();
			return;
		}
		if( !isGlobal ){
			showMenu();
		}		
	}

	render(){
		const { 
			personInfo, 
			menuState, 
			hidePersonInfoModalAction, 
			showPersonInfoModalAction 
		} = this.props;
		const { showSave } = this.state;
		return (
			<div className = "row" id = "user-bar">
				<img src = "/images/avatar.jpg" />
				<span id = "name-txt">{ personInfo.nickName }</span>
				<div className="iconfont icon-xiala btn" ref= "menuBtn">
					<ul className = {`list ${ menuState ? "show" : "hide" }`}>
						<li onClick = { showPersonInfoModalAction }>个人信息</li>
						<li>退出</li>
					</ul>
				</div>
				<Modal 
					visible = { personInfo.modalVisible }
					title = "个人信息"
					close = { hidePersonInfoModalAction }
					showSaveFn = { this.showSaveFn }
				>
					<UserInfoModal 
						personInfo = { personInfo }
						showSave = { showSave }
						updateInfo = { this.updateInfo }
					/>
				</Modal>
			</div>
		);
	}
}