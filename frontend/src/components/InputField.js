import React, { Component } from 'react';
import '../styles/InputField.css'

class Inputfield extends Component {
    render() {
        return (
                <form className="inputField"
                onSubmit = {this.props.onSubmit}>
                    <label>
                        {this.props.label}
                    </label>
                    <input
                    className='input'
                    type={this.props.type}
                    placeholder={this.props.placeholder}
             		name={this.props.name}
            		value={this.props.value}
            		size={15}
					onChange={this.props.onChange} />
                </form>
        );
    }
}
export default Inputfield