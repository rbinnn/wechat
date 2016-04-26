import React, { Component } from "react";

export default class Menu extends Component{
	render(){
		return (
			<ul class = "row">
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