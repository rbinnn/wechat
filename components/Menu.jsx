import React, { Component } from "react";
import "../sources/sass/menu.scss";

export default class Menu extends Component{
	render(){
		return (
			<ul class = "row" id = "menu-bar">
				<li>
					<i className="iconfont icon-chat"></i>
				</li>
				<li>
					<i className="iconfont icon-haoyou"></i>
				</li>
			</ul>
		);
	}
}