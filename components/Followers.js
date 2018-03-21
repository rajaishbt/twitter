const React = require('react');
const axios = require('axios');

const utils = require('./utils/config');
const withRouter = require('react-router-dom').withRouter;
const Link = require('react-router-dom').Link;
const { connect } = require('react-redux');
const { getFollowers } = require('../actions');

class Followers extends React.Component {
	constructor(props) {
	  	super(props);
	  	this.followers = [];
	  	if(props.location.search) {
	  		const params = new URLSearchParams(props.location.search);
	  		this.url = utils.config.baseUrl + 'followers/list?screen_name=' + params.get('screen_name');
	  	} else {
	  		this.url = utils.config.baseUrl + 'followers/list?screen_name=' + localStorage.getItem('screen_name');
	  	}
    	axios.get(this.url)
	    .then(response => {
	    	props.getFollowers(response.data.users);
	    }).catch(err => {
	    	console.error(err);
	    });
  	}

  	shouldComponentUpdate(nextProps) {
  		if(nextProps.followers.length > 0)  {
  			return true;
  		}
  		return false;
  	}

  	componentWillUpdate(newProps) {
  		this.followers = newProps.followers;
  	}

  	render () {
		return (
			<div>
			<div>Followers</div>
			<div className="card followers">
				<ul>
					{this.followers.map((value, i) => {
				      	return (
							<li className="followerBlock" key={i}>
								<Link to={"/?screen_name=" + value.screen_name}><img className="followerImage" src={value.profile_image_url} alt=""></img></Link>
							</li>
			            );
					})}
				</ul>
			</div>
		</div>
	  	);
	}
}

const mapStateToProps = (state) => ({
  followers: state.followers
})

const mapDispatchToProps = {
  getFollowers
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Followers))
