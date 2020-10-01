import React, { Component } from 'react';
import '../styles/LogIn.css'
import InputField from '../components/InputField'
import SubmitButton from '../components/SubmitButton'

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            pw: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
    };
    handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
    handleLogIn() {
        console.log(this.state.id)
        console.log(this.state.pw)

    };
    render() {
        return (
            <div className="container">
                <image/>
                <InputField
                id={this.state.id}
                pw={this.state.pw}
                onChange = {this.handleChange}
                />
                <SubmitButton
                onSubmit = {() => {this.handleLogIn()}}
                text = {'Log In'}
                />
            </div>
        )};
}
export default LogIn