import React, { Component } from "react";

export default class MessageCard extends Component{
	render(){
		const name =  this.props.direction === 'left' ? 'm-left' : 'm-right';
		return (
			<div className = {`item ${name}`}>
				<img src = "/images/webwxgeticon_0.jpg" />
				<p>hello,worldello,worldello,worldello,worldello,worldello,worldello,worldello,worldello,worldello,worldello,worldello,worldello,worldello,worldello,worldello,worldello,worldello,worldello,worldello,worldello,worldello,worldello,world</p>
			</div>
		);
	}
}