import React, { Component } from 'react';
import {observer} from 'mobx-react';
import Navbar from './components/Navbar'

import LogIn from './pages/LogIn'
import LandingPage from './pages/LandingPage'
import ZoomPicker from './pages/ZoomPicker'
import RoomPicker from './pages/RoomPicker'
import UserStore from './stores/UserStore'
import './styles/LogIn.css'

class App extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            currentPage: '0',
            navItems: [
            {
                page: '0',
                name: 'Home'
            },
            {
                page: '1',
                name: 'Zoom'
            },
            {
                page: '2',
                name: 'Room'
            }
            ]
        } 
        this.changePage = this.changePage.bind(this)
        this.testLogIn = this.testLogIn.bind(this)
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
                const username = UserStore.username
                this.setState({username});
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

    changePage(page){
        const currentPage = page
        this.setState({currentPage})
    }
    //FOR TEST PURPOSES ONLY
    testLogIn(){
        UserStore.isLoggedIn = true
        UserStore.username = 'kacp'
    }

    render() {
        //{(recurrenceType==2)?'Week(s)':'Month(s)'}
        const {navItems, currentPage} = this.state;
        if (UserStore.isLoggedIn) {
            return (
                <div className="application">
                    <Navbar 
                        navItems={navItems}
                        onPage={this.changePage}
                    />
                        {currentPage==0&&
                        <LandingPage/>
                        }
                        {currentPage==1&&
                        <ZoomPicker/>
                        }
                        {currentPage==2&&
                        <RoomPicker/>
                        }
                </div>
                )}
        else {
            return (
                <div className="log-in-page">
                    <LogIn />
                    <button onClick={this.testLogIn}>Test Login</button>
                </div>
        )};
    }
}
export default observer(App);