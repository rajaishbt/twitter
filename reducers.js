/* reducers */
import * as types from './actions';

function tweets(state = [], action) {
  switch(action.type) {

    case types.CREATE_USER_INFO:
      return Object.assign({}, state, { timeline: action.payload });

  	case types.USERS_INFO:
      return Object.assign({}, state, { users: action.users });

  	case types.TWEETS_INFO:
      return Object.assign({}, state, { tweets: action.tweets });

  	case types.FOLLOWERS_INFO:
      return Object.assign({}, state, { followers: action.followers });

  	case types.FOLLOWING_INFO:
      return Object.assign({}, state, { following: action.following });

  }
  return state;
}

export default tweets;