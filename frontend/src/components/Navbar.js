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
				<h1>Welcome, {username}</h1>
				<nav>
				<ul className = 'navItems'>
					{navItems}
				</ul>
				</nav>
				<h2>Today is {today}</h2>
			</header>
		);
	}
}
export default Navbar;