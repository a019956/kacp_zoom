import React, { Component } from 'react';
import '../styles/InputField.css'

class Inputfield extends Component {
    render() {
        return (
                <div>
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
                </div>
        );
    }
}
export default Inputfield