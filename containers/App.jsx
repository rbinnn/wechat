import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import LoginBox from "./LoginBox.jsx";
import MainBox from "./MainBox.jsx";
import { Statue } from "../constants";
import "../sources/sass/common.scss";
import 'rc-dialog/assets/index.css';
// import UserInfoModal from "../components/UserInfoModal.jsx";
import FriendInfoModal from "../components/FriendInfoModal.jsx";

class App extends Component{
	render(){
		const { 
			statue
		} = this.props;
		const isLogin = statue !== Statue.LOGINED;
		return (
			// <div className = "main" onClick = { this.onclick }>
			// 	{ isLogin ? 
			// 		<MainBox />: 
			// 		<LoginBox />  
			// 	}
			// </div>
			<FriendInfoModal visible = {true}/>
		);
	}
}

function mapStateToProps(state){
	return {
		statue: state.statue
	};
}


export default connect(mapStateToProps)(App);