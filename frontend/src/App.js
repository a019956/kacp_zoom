import React, { Component } from 'react';
import {observer} from 'mobx-react';
import Navbar from './components/Navbar'
import { addDays , format } from 'date-fns';

import LogIn from './pages/LogIn'
import LandingPage from './pages/LandingPage'
import ZoomPicker from './pages/ZoomPicker'
import RoomPicker from './pages/RoomPicker'
import UserStore from './stores/UserStore'
import FrontEndTest from './pages/frontendtest'
class App extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            today: format(new Date(), 'yyyy-MM-dd'),
            currentPage: '0',
            navItems: [
            
            {
                page: '0',
                name: 'Zoom'
            },
            {
                page: '1',
                name: 'Email'
            },
            //FOR FUTURE USE
            // {
            //     page: '2',
            //     name: 'Room'
            // }
            ]
        } 
        this.changePage = this.changePage.bind(this)
        this.testLogIn = this.testLogIn.bind(this)
    };


    //  When application loads, check for log-in status.
    //  If not logged in, return log-in page.
    //  If logged in, render Zoom application.
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


    //  Change appliaton by clicking on Navbar. (Currently in development)
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
        const {today, navItems, currentPage} = this.state;
        if (UserStore.isLoggedIn) {
            return (
                <div className="application">
                    <Navbar 
                        today={today}
                        navItems={navItems}
                        onPage={this.changePage}
                    />
                        {/* <FrontEndTest/> */}
                        {currentPage==0&&
                        <ZoomPicker/>
                        }
                        {currentPage==1&&
                        <LandingPage/>
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
                </div>
        )};
    }
}
export default observer(App);