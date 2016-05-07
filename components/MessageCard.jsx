import React, { Component } from "react";

export default class MessageCard extends Component{
	render(){
		const { direction, content, time } = this.props;
		const name =  direction === 'left' ? 'm-left' : 'm-right';
		return (
			<div className = {`item ${name}`}>
				<img src = "/images/webwxgeticon_0.jpg" />
				<p>{ content }</p>
			</div>
		);
	}
}