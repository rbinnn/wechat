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
		this.showUserInfoModal = this.showUserInfoModal.bind(this);
		this.hideUserInfoModal = this.hideUserInfoModal.bind(this);
		this.showSaveFn = this.showSaveFn.bind(this);
		this.updateInfo = this.updateInfo.bind(this);
		this.toggleMenu = this.toggleMenu.bind(this);
		this.toggleMenuGlobal = this.toggleMenuGlobal.bind(this);
		this.state = {
			showSave: false
		}
	}
	
	showSaveFn(){
		this.setState({
			showSave: true
		});
	}

	updateInfo(data){
		// 不管数据有没有修改过，都要取消showSave状态
		this.setState({
			showSave: false
		});
		this.props.hidePersonInfoModalAction();
		// 有数据的话就调用接口提交新的个人信息
		if( data !== null ){
			console.log("update the info : ", data);
			this.props.updatePersonInfoAction(data);
		}
	}

	componentDidMount(){
		// 全局点击
		document.addEventListener("click", this.toggleMenuGlobal, false)
	}

	toggleMenuGlobal(e){
		if( e.target === this.refs.menuBtn ){
			this.toggleMenu(false);
		}else{
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

	// 展示个人信息模态窗
	showUserInfoModal(){
		this.props.showPersonInfoModalAction();		
	}

	// 关闭个人信息模态窗
	hideUserInfoModal(){
		this.props.hidePersonInfoModalAction();
	}

	render(){
		const { personInfo, menuState } = this.props;
		const { showSave } = this.state;
		return (
			<div className = "row" id = "user-bar">
				<img src = "/images/avatar.jpg" />
				<span id = "name-txt">{ personInfo.nickName }</span>
				<div className="iconfont icon-xiala btn" ref= "menuBtn">
					<ul className = {`list ${ menuState ? "show" : "hide" }`}>
						<li onClick = { this.showUserInfoModal }>个人信息</li>
						<li>退出</li>
					</ul>
				</div>
				<Modal 
					visible = { personInfo.modalVisible }
					title = "个人信息"
					close = { this.hideUserInfoModal }
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