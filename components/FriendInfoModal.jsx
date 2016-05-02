import React, { Component, PropTypes } from "react";

export default class FriendInfoModal extends Component{
	render(){
		return (			
			<form id = "friendInfo-bar">
				<div className="item">
					<label htmlFor="u-remark">备注</label>
					<input type="text" id="u-remark" value = { this.props.nickname } placeholder = "请输入备注 ..."/>
				</div>
				
				<div className="item">
					<span className="tag">Email</span>
					<span className="txt">542568096@qq.com</span>						
				</div>
				<div className="item">
					<div>
						<span className="tag">年龄</span>
						<span className="txt">24</span>
					</div>
					<div>
						<span className="tag">性别</span>
						<span className="txt">男</span>
					</div>
				</div>
				<div className="item">
					<span className="tag">介绍</span>
					<p className="txt">我是王尼玛我是王尼玛我是王尼玛我是王尼玛我是王尼玛</p>
				</div>
			</form>
		);
	}
}