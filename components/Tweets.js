const React = require('react');
const axios = require('axios');

const utils = require('./utils/config');
const withRouter = require('react-router-dom').withRouter;
const { connect } = require('react-redux');
const { getTweets } = require('../actions');

class Tweets extends React.Component {
	constructor(props) {
	  	super(props);
	  	this.tweets = [];
	  	this.status = '';
	  	this.nonLoggedUser = '';
	  	this.getTweets(props);
	  	this.handleChange = this.handleChange.bind(this);
	  	this.postTweet = this.postTweet.bind(this);
  	}

  	getTweets(props) {
  		if(props.location.search) {
	  		const params = new URLSearchParams(props.location.search);
	  		this.nonLoggedUser = params.get('screen_name');
	  		this.url = utils.config.baseUrl + 'get/tweets?screen_name=' + this.nonLoggedUser;
	  	} else {
	  		this.url = utils.config.baseUrl + 'get/tweets?screen_name=' + localStorage.getItem('screen_name');
	  	}
  		axios.get(this.url)
	    .then(response => {
	    	props.getTweets(response.data);
	    }).catch(err => {
	    	console.error(err);
	    });
  	}

  	postTweet() {
  		axios.post(utils.config.baseUrl + 'post/tweets', {
			status : this.status
		})
	    .then(response => {
	    	this.status = '';
	    	this.getTweets(this.props);
	    }).catch(err => {
	    	console.error(err);
	    });
  	}

  	handleChange(e) {
		this.status = e.target.value.replace(/(<([^>]+)>)/ig,"");
  	}

  	shouldComponentUpdate(nextProps) {
  		if(nextProps.tweets.length > 0)  {
  			return true;
  		}
  		return false;
  	}

  	componentWillUpdate(newProps) {
  		this.tweets = newProps.tweets;
  	}

  	render () {
		return (
			<div>
			{!this.nonLoggedUser &&
				<div className="card">
					<div className="postTweet">
						<textarea onChange={this.handleChange} placeholder="What's Happening?"></textarea>
						<button onClick={this.postTweet}>Tweet</button>
					</div>
				</div>
			}
			<div className="card">
			{this.tweets.map((value, i) => {
		      	return (
					<div className="tweet" key={i}>
						<div className="tweetTime">{value.created_at}</div>
						<div className="content">{value.text}</div>
						<ul className="tweet-actions">
							<li className="reply">Reply</li>
							<li className="retweet">Retweet</li>
							<li className="like">Like</li>
						</ul>
					</div>
	            );
	          })}
			</div>
		</div>
	  	);
	}
}

const mapStateToProps = (state) => ({
  tweets : state.tweets
})

const mapDispatchToProps = {
  getTweets
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tweets))
