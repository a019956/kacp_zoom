import React, { Component } from 'react';
import '../styles/SubmitButton.css'

class SubmitButton extends Component {
    render() {
        return (
            <button 
            type = 'submit'
            className='log-in-button'
            >
                {this.props.text}
            </button>
        )};
}
export default SubmitButton