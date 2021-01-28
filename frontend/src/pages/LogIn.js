import React, { Component } from 'react';
import '../styles/LogIn.css'
import InputField from '../components/InputField'
import SubmitButton from '../components/SubmitButton'
import UserStore from '../stores/UserStore';
import log_in_image from '../components/log-in-image.png'


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
        this.doLogIn = this.doLogIn.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    //  At change of input, change state.
    handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
    }
    

    //  FOR LOG-IN
    //  If there is an error with log-in, reset password to emtpy.
    resetForm() {
        this.setState({
            password: ''
        })
    }

    //  Check if username or password is empty.
    handleSubmit(e) {
        e.preventDefault();
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

        //  If they are not empty, send log-in request to router.
        this.doLogIn()
    }

    //  Send log-in request to router.
    async doLogIn() {
        
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

            //  If there is a matching username and password in the database, let user log-in to the application.
            let result = await res.json();
            if (result && result.success) {
                UserStore.username = result.username;
                UserStore.isLoggedIn = true;
            }

            //  If there is a mismatch, aler user with error message and reset password input.
            else if (result && result.success === false) {
                this.resetForm();
                alert(result.msg);
            }
        }
            //Handle errors
            catch(e) {
                console.log(e);
                this.resetForm();
        }
    }


    render() {
        return (
            <div className="container">

            <img src={log_in_image}/>
                <form 
                className="input-fields"
                onSubmit={this.handleSubmit}>

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
                    text = {'Log In'}
                    />

                </form>

                <div className="account-request">

                </div>

            </div>
        )};
}
export default LogIn