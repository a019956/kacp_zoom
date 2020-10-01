import React, { Component } from 'react';
import {observer} from 'mobx-react';
import LogIn from './pages/LogIn'
import TimePicker from './pages/TimePicker'
import UserStore from './stores/UserStore'
import './styles/LogIn.css'

class App extends Component {
    constructor(props) {
        super(props)
    };


    async componentDidMount() {

        try{

            let res = await fetch ('/isLoggedIn', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application.json'
                }
            });

            let result = await res.json();

            if (result && result.success) {
                UserStore.loading = false;
                UserStore.isLoggedIn = true;
                UserStore.username = result.username;
            }

            else {
                UserStore.loading = false;
                UserStore.isLoggedIn = false;
            }
        }
        catch(e) {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
        }
    };
    render() {
        if (UserStore.isLoggedIn) {
            return (
                <div className="app">
                    <TimePicker />
                </div>
                )}
        else {
            return (
                <div className="log-in-page">
                    <LogIn />
                </div>
        )};
    }
}
export default observer(App);