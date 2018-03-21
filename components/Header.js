import React from 'react'

class Header extends React.Component {
	render () {
		if(localStorage.getItem('screen_name')) {
			return (
				<header>
					<ul>
						<li><a href='/'>Home</a></li>
						<li><a href='/logout'>Logout</a></li>
					</ul>
				</header>
	  		);
		} else {
			return null;
		}
	}
}

export default Header
