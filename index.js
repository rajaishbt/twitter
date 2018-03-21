import React from 'react'
import { render } from 'react-dom'

// router
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
// redux
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import tweets from './reducers'

let store = createStore(tweets, applyMiddleware(thunk));

/* Import Components */
import Login from './components/Login'
import Profile from './components/Profile'
import Logout from './components/Logout'
import Header from './components/Header'
import Followers from './components/Followers'
import Following from './components/Following'
import "./style.css";

const PrivateRoute = ({ component: Component , ...rest}) => (
  <Route 
    {...rest}
    render={props =>
      localStorage.getItem('screen_name') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

render((
  <Provider store={store}>
    <BrowserRouter>
      <div>
    		<Header />	
        <Switch>
        <Route path="/login" component={Login}/>
        <PrivateRoute exact path="/" component={Profile}/>
        <PrivateRoute path="/followers" component={Followers}/>
        <PrivateRoute path="/friends" component={Following}/>
        <PrivateRoute path="/logout" component={Logout}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>), document.getElementById('root'));