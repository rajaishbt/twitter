export const CREATE_USER_INFO = 'CREATE_USER_INFO'
export const USERS_INFO = 'USERS_INFO'
export const TWEETS_INFO = 'TWEETS_INFO'
export const FOLLOWERS_INFO = 'FOLLOWERS_INFO'
export const FOLLOWING_INFO = 'FOLLOWING_INFO'

export const createUsersInfo = (history, param) => {
  return dispatch => {
    dispatch({
      type: CREATE_USER_INFO,
      payload: param
    });
    history.push("/");
  };
}

export const getUsers = (users) => {
  return dispatch => {
    dispatch({
      type: USERS_INFO,
      users: users
    });
  };
}

export const getTweets = (tweets) => {
  return dispatch => {
    dispatch({
      type: TWEETS_INFO,
      tweets: tweets
    });
  };
}

export const getFollowers = (followers) => {
  return dispatch => {
    dispatch({
      type: FOLLOWERS_INFO,
      followers: followers
    });
  };
}

export const getFollowing = (following) => {
  return dispatch => {
    dispatch({
      type: FOLLOWING_INFO,
      following: following
    });
  };
}

