import React, { Component } from 'react';
import NavbarItem from './NavbarItem'
import '../styles/Navbar.css';

class Navbar extends Component {
	render() {
		const {username, today, onPage} = this.props;
		const navItems = this.props.navItems.map((r) => (
			<NavbarItem {...r} onPage={onPage} />
		));
		
		return (
			<header>
				<h1>Zoom Appointment Organizer</h1>
				<nav>
				{/* <ul className = 'navItems'>
					{navItems}
				</ul> */}
				</nav>
				<button className = "settings-button">

				</button>
			</header>
		);
	}
}
export default Navbar;