import React, { Component, PropTypes } from "react";
import _ from "lodash";

export default class UserInfoModal extends Component{
	
	componentWillReceiveProps(nextProps) {
		/* 
			判断来自上级组件的props的showSave，
			当showSave为true的时候，表示在同级组件点击了保存按钮，
			通知本组件提交表单中内容（同级组件的通信）
	 	*/
	 	if( nextProps.showSave === true ){
	 		let newPersonInfo = {
	 			nickName: this.refs.nickName.value,
	 			email: this.refs.email.value,
	 			age: Number(this.refs.age.value), // age应该为数字，保持一致
	 			sex: this.refs.sex.value,
	 			introduction: this.refs.intro.value
	 		}
	 		let oldPersonInfo = this.props.personInfo;
	 		// 判断有没有修改过，没有修改就不通知父级提交数据了
	 		let dataChanged = _.some(newPersonInfo, function(val, key){
	 			console.log(key, val)
	 			if( key in oldPersonInfo && oldPersonInfo[key] === val){
	 				return false;
	 			}
	 			return true;
	 		});
	 		
	 		/* 
	 			如果表单的内容修改过了，则传递新的数据
	 			调用父组件保存数据的接口函数，
	 			否则传递一个null
	 		*/
	 		this.props.updateInfo( dataChanged ? newPersonInfo : null );	 		
	 	}     
	}
	render(){
		const { personInfo } = this.props;
		return (
			<form id = "userInfo-bar">
				<div className="item">
					<label htmlFor="u-nickname">昵称</label>
					<input type="text" 
						id="u-nickname" 
						ref= "nickName" 
						defaultValue = { personInfo.nickName } 
						placeholder = "your nickname ..."/>
				</div>
				
				<div className="item">
					<label htmlFor="u-email">Email</label>
					<input type="email" 
						id="u-email" 
						ref= "email" 
						defaultValue = { personInfo.email } 
						placeholder = "your email ..."/>
				</div>
				<div className="item">
					<div>
						<label htmlFor="u-age">年龄</label>
						<input type="number" 
							id="u-age" 
							ref = "age" 
							defaultValue = { personInfo.age } />
					</div>
					<div>
						<label htmlFor="u-sex">性别</label>
						<select id="u-sex"  defaultValue={ personInfo.sex } ref = "sex">
							<option value="男">男</option>
							<option value="女">女</option>
						</select>
					</div>
				</div>
				<div className="item">
					<label htmlFor="u-intro">介绍</label>
					<textarea id="u-intro" 
						placeholder = "your introduction ..." 
						ref = "intro" 
						defaultValue = { personInfo.introduction }></textarea>
				</div>
			</form>
		);
	}
}