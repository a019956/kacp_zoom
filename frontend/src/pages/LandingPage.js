import React, { Component } from 'react';


class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    };

    render() {
        return (
            <div className="container">
                THIS IS LANDING PAGE
            </div>
        )};
    }
export default LandingPage