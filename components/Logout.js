const React = require('react');
const axios = require('axios');
const utils = require('./utils/config');

class Logout extends React.Component {
	constructor(props) {
	  	super(props);
   		this.isRender = true;
        axios.get(utils.config.baseUrl + 'sessions/logout')
	    .then(response => {
	    	localStorage.removeItem('screen_name');
	    	props.history.push('/login');
	    }).catch(err => {
	    	console.error(err);
	    });
  	}
  	render () {
        return null;
    }
}

export default Logout
