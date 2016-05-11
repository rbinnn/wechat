import React, { Component } from "react";
import { default as friendPic } from "../sources/images/webwxgeticon_0.jpg";

export default class MessageCard extends Component{
	render(){
		const { direction, content, time } = this.props;
		const name =  direction === 'left' ? 'm-left' : 'm-right';
		return (
			<div className = {`item ${name}`}>
				<img src = { friendPic } />
				<p>{ content }</p>
			</div>
		);
	}
}