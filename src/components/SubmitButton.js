import React, { Component } from 'react';
import '../styles/SubmitButton.css'

class SubmitButton extends Component {

    render() {
        const {text, onSubmit} = this.props
        return (
            <button className='log-in-button'
            onClick = {onSubmit}>
                {text}
            </button>
        )};
}
export default SubmitButton