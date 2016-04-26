import React, { Component } from "react";
import "../sources/sass/userBar.scss";
import "../sources/css/iconfont.css";

export default class UserBar extends Component{
	render(){
		return (
			<div className = "row" id = "user-bar">
				<img src = "/images/avatar.jpg" />
				<span id = "name-txt">吴荣滨</span>
				<div className="iconfont icon-xiala btn">
					<ul className = "list hide">
						<li>个人信息</li>
						<li>退出</li>
					</ul>
				</div>
			</div>
		);
	}
}