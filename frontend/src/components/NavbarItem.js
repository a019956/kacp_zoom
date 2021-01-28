import React, { Component } from 'react';
import '../styles/NavbarItem.css';

class NavbarItem extends Component {
	render() {
		const {name, page, onPage} = this.props;
		return (
            <div claasName='navbar-item' onClick={() => onPage(page)}>
                {name}
            </div>
		);
	}
}
export default NavbarItem;