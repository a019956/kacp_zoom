import React, { Component } from 'react';
import '../styles/SmallButton.css'

class SmallButton extends Component {
    render() {
        return (
            <button 
            className='small-button'
            type = 'delete'
            onClick = {this.props.onSubmit}>
                {this.props.text}
            </button>
        )};
}
export default SmallButton;