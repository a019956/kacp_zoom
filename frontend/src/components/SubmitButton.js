import React, { Component } from 'react';
import '../styles/SubmitButton.css'

class SubmitButton extends Component {
    render() {
        return (
            <button 
            className='log-in-button'
            type = 'submit'
            onClick = {this.props.onSubmit}>
                {this.props.text}
            </button>
        )};
}
export default SubmitButton