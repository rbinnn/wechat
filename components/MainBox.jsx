import React, { Component } from "react";

export default class MainBox extends Component{
	componentWillReceiveProps(props) {
		console.log("abc1", props)
	}

	componentWillUpdate(){
		console.log("1231")
	}

	render(){
		return (
			<div></div>
		)
	}
}