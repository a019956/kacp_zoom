import React, { Component } from 'react';
import '../styles/LogIn.css'
import InputField from '../components/InputField'
import SubmitButton from '../components/SubmitButton'
import UserStore from '../stores/UserStore';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            //to prevent logging in twice
            buttonDisabled: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.doLogIn = this.doLogIn.bind(this);
    };
    resetForm() {
        this.setState({
            username: '',
            password: ''
        })
    }
    handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}
    handleLogIn(e) {
        console.log(this.state.username)
        console.log(this.state.password)
        this.resetForm()
    };

    async doLogIn() {

        if (this.state.username == '') {
            alert('username is empty.')
            return;
        }
        if (this.state.password == '') {
            alert('password is empty.')
            return;
        }

        this.setState({
            buttonDisabled: true
        })

        try { 

            let res = await fetch('/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/JSON',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            });

            let result = await res.json();
            console.log(result)
            if (result && result.success) {
                UserStore.isLoggedIn = true;
                UserStore.username = result.username;
            }

            else if (result && result.success === false) {
                this.resetForm();
                alert(result.msg);
            }
        }
            catch(e) {
                console.log(e);
                this.resetForm();
        }
    }

    render() {
        return (
            <div className="container">
                <InputField
                label='Username:'
                type='username'
                placeholder='Username'
                name='username'
                value={this.state.username}
                onChange = {this.handleChange}
                />
                <InputField
                label='Password:'
                type='password'
                placeholder='Password'
                name='password'
                value={this.state.password}
                onChange = {this.handleChange}
                />
                <SubmitButton
                onSubmit = {() => {this.doLogIn()}}
                text = {'Log In'}
                />
            </div>
        )};
}
export default LogIn