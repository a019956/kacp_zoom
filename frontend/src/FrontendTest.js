import React, { Component } from 'react';
import {observer} from 'mobx-react';
import LogIn from './pages/LogIn'
import Navbar from './components/Navbar'
import TimePicker from './pages/TimePicker'
import UserStore from './stores/UserStore'
import './styles/LogIn.css'

class App extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            username: 'username',
        }
    };


    async componentDidMount() {
        try{
            let res = await fetch ('/isLoggedIn', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application.json'
                }
            });

            let result = await res.json();

            if (result && result.success) {
                UserStore.loading = false;
                UserStore.isLoggedIn = true;
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

            return (
                <div className="testing-page">
                    <div className="time-picker-page">
                        <Navbar />
                        <TimePicker/>
                    </div>
                
                    <div className="log-in-page">
                        <LogIn />
                    </div>
                </div>
            )
        };
    }

export default observer(App);