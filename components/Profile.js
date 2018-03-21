const React = require('react');
const axios = require('axios');

const utils = require('./utils/config');
const withRouter = require('react-router-dom').withRouter;
const Link = require('react-router-dom').Link;
const { connect } = require('react-redux');
const { getUsers } = require('../actions');
import Tweet from './Tweets'

class Tweets extends React.Component {
	constructor(props) {
	  	super(props);
	  	this.users = {};
	  	this.nonLoggedUser = '';
	  	if(props.location.search) {
	  		const params = new URLSearchParams(props.location.search);
	  		this.nonLoggedUser = params.get('screen_name');
	  		this.url = utils.config.baseUrl + 'users/show?screen_name=' + this.nonLoggedUser;
	  	} else {
	  		this.url = utils.config.baseUrl + 'users/show?screen_name=' + localStorage.getItem('screen_name');
	  	}
    	axios.get(this.url)
	    .then(response => {
	    	props.getUsers(response.data);
	    }).catch(err => {
	    	console.error(err);
	    });
  	}

  	shouldComponentUpdate(nextProps) {
  		if(Object.keys(nextProps.users).length > 0)  {
  			return true;
  		}
  		return false;
  	}

  	componentWillUpdate(newProps) {
  		this.users = newProps.users;
  	}

  	render () {
		const friends = "/friends" + (this.nonLoggedUser ? "/?screen_name=" + this.nonLoggedUser : "");
		const followers = "/followers" + (this.nonLoggedUser ? "/?screen_name=" + this.nonLoggedUser : "");
		return (
			<div>
			{Object.keys(this.users).length > 0 &&
		    <div className="card">
				<div className="profileCard">
					<div className="profileBg"></div>
					<div className="avatarBlock">
						<img className="avatarImage" src={this.users.profile_image_url} alt=""></img>
					</div>
					<div className="ProfileCardDetail">
						<span className="profileName">{this.users.name}</span>
						<span className="screenName">@{this.users.screen_name}</span>
					</div>
				</div>
				<div className="ProfileCardStats">
					<ul className="ProfileCardStats-statList">
						<li className="ProfileCardStats-stat">
							<div className="ProfileCardStats-statLink">
								<span className="ProfileCardStats-statLabel">Tweets</span>
								<span className="ProfileCardStats-statValue">{this.users.statuses_count}</span>
					        </div>
						</li>
						<li className="ProfileCardStats-stat">
							<Link className="ProfileCardStats-statLink" to={friends}>
								<span className="ProfileCardStats-statLabel">Following</span>
								<span className="ProfileCardStats-statValue">{this.users.friends_count}</span>
				          </Link>
				        </li>
						<li className="ProfileCardStats-stat">
							<Link className="ProfileCardStats-statLink" to={followers}>
								<span className="ProfileCardStats-statLabel">Followers</span>
								<span className="ProfileCardStats-statValue">{this.users.followers_count}</span>
							</Link>
				        </li>
					</ul>
				</div>
			</div>}
			<Tweet />
		</div>
	  	);
	}
}

const mapStateToProps = (state) => ({
  users: state.users
})

const mapDispatchToProps = {
  getUsers
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tweets))
