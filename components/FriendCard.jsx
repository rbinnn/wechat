import React, { Component } from "react";
import "../sources/sass/friendCard.scss";

export default class FriendCard extends Component{
	render(){
		return (
			<li userid = { this.props.userid }>
				<img src="/images/webwxgeticon_0.jpg" alt=""/>
				<span>{ this.props.remark }</span>
			</li>
		);
	}
}