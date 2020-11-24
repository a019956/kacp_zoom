import React, { Component } from 'react';
import '../styles/Navbar.css';

class Navbar extends Component {
	render() {
		return (
			<header>
				<h1>KACP Zoom Scheduler</h1>
				<nav>
					<ul className='navItems'>
					</ul>
				</nav>
			</header>
		);
	}
}
export default Navbar;