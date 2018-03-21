const React = require('react');
const axios = require('axios');
const utils = require('./utils/config');
const withRouter = require('react-router-dom').withRouter;
const { connect } = require('react-redux');
const { createUsersInfo } = require('../actions');

const twitterLogin = () => {
	axios.get(utils.config.baseUrl + 'home')
    .then(response => {
    	const url = utils.config.twitterAuthorizeUrl + response.data
    	window.location.href = url;
    }).catch(err => {
    	console.error(err);
    });
};

class Login extends React.Component {
	constructor(props) {
	  	super(props);
       	this.isRender = false; 
       	if(props.location.search) {
       		this.isRender = true;
	        axios.get(utils.config.baseUrl + 'sessions/callback' + props.location.search)
		    .then(response => {
		    	localStorage.setItem('screen_name', response.data.screen_name);
		    	props.createUsersInfo(props.history, response.data);
		    }).catch(err => {
		    	console.error(err);
		    });
		}
  	}

  	render () {
		if(this.isRender) {
			return null;
		}
		return (
			<div className="card login">
				<h1>Hi, Welcome</h1>
				<button type="submit" onClick={twitterLogin}>Sign in With Twitter</button>
			</div>
	  	);
	}
}

const mapDispatchToProps = {
  createUsersInfo
}

const mapStateToProps = (state) => ({
  tweets : state.timeline,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
