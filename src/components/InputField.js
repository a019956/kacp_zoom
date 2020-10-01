import React, { Component } from 'react';
import '../styles/InputField.css'

class Inputfield extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}
    render() {
        const {id, pw, onChange} = this.props;
        return (
            <div className="inputField">
                <form>
                    <label>
                        Username:
                    </label>
                    <input
                    type="text" 
					id='username-input'
              		key='id'
             		name='id'
            		value={id}
            		size={15}
                    autoComplete="off"
                    placeholder='User Name'
					onChange={onChange} />
                </form>
                <form>
                    <label>
                        Password:
                    </label>
                    <input
                    type="password" 
					id='password-input'
              		key='pw'
             		name='pw'
            		value={pw}
            		size={15}
            		autoComplete="off"
					onChange={onChange} />
                </form>
            </div>
        );
    }
}
export default Inputfield