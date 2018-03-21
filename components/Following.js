const React = require('react');
const axios = require('axios');

const utils = require('./utils/config');
const withRouter = require('react-router-dom').withRouter;
const Link = require('react-router-dom').Link;
const { connect } = require('react-redux');
const { getFollowing } = require('../actions');

class Following extends React.Component {
	constructor(props) {
	  	super(props);
	  	this.following = [];
	  	if(props.location.search) {
	  		const params = new URLSearchParams(props.location.search);
	  		this.url = utils.config.baseUrl + 'following/list?screen_name=' + params.get('screen_name');
	  	} else {
	  		this.url = utils.config.baseUrl + 'following/list?screen_name=' + localStorage.getItem('screen_name');
	  	}
    	axios.get(this.url)
	    .then(response => {
	    	console.log(response.data.users)
	    	props.getFollowing(response.data.users);
	    }).catch(err => {
	    	console.error(err);
	    });
  	}

  	shouldComponentUpdate(nextProps) {
  		if(nextProps.following.length > 0)  {
  			return true;
  		}
  		return false;
  	}

  	componentWillUpdate(newProps) {
  		this.following = newProps.following;
  	}

  	render () {
		return (
			<div>
			<div>Following</div>
			<div className="card followers">
				<ul>
					{this.following.map((value, i) => {
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
  following: state.following
})

const mapDispatchToProps = {
  getFollowing
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Following))
