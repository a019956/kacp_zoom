import React, { Component } from 'react';
import '../styles/Navbar.css';

class Navbar extends Component {
	render() {
		const {username, today} = this.props;
		return (
			<header>
				<h1>Welcome, {username}</h1>
				<nav>
					<ul className='navItems'>
					</ul>
				</nav>
				<h2>Today is {today}</h2>
			</header>
		);
	}
}
export default Navbar;