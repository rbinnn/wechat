import React, { Component, PropTypes } from "react";

export default class FriendInfoModal extends Component{

	constructor(){
		super();
		this.changeHandler = this.changeHandler.bind(this);
		this.state = {
			value: ""
		}
	}

	componentWillReceiveProps(nextProps) {
		/* 
			判断来自上级组件的props的showSave，
			当showSave为true的时候，表示在同级组件（模态窗底部的组件）点击了保存按钮，
			通知本组件提交表单中内容（同级组件的通信）
	 	*/
	 	if( nextProps.showSave === true ){
	 		const remark = this.state.value;
	 		const userid = this.props.currentChat;
	 		// 没有改变就传递一个null给父组件，然后return掉了
	 		if( this.props.friendInfo.remark === remark ){
	 			this.props.updateRemark(null);
	 			return ;
	 		}
	 		this.props.updateRemark(userid, remark);	 		
	 	}  
 		this.setState({
 			value: this.props.friendInfo.remark
 		});
	}

	changeHandler(event){
		this.setState({
			value: event.target.value
		});
	}

	render(){
		const { friendInfo } = this.props;
		return (			
			<form id = "friendInfo-bar">
				<div className="item">
					<label htmlFor="u-remark">备注</label>
					<input 
						type="text" 
						id="u-remark" 
						value = { this.state.value } 
						onChange = { this.changeHandler } 
						placeholder = "请输入备注 ..."
					/>
				</div>
				
				<div className="item">
					<span className="tag">Email</span>
					<span className="txt">{ friendInfo.email }</span>						
				</div>
				<div className="item">
					<div>
						<span className="tag">年龄</span>
						<span className="txt">{ friendInfo.age }</span>
					</div>
					<div>
						<span className="tag">性别</span>
						<span className="txt">{ friendInfo.sex }</span>
					</div>
				</div>
				<div className="item">
					<span className="tag">介绍</span>
					<p className="txt">{ friendInfo.introduction }</p>
				</div>
			</form>
		);
	}
}