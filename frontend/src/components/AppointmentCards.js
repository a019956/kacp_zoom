import React, { Component } from 'react';
import '../styles/AppointmentCards.css'

class AppointmentCards extends Component {

    render() {
        const {date, time, purpose, startTime, endTime, zoom_username, meetingID} = this.props;
        return (
                <div className="appointment-card">
                    <div className="appointment-content">
                        <h3 calssName="date">date: {date}</h3>
                        <h3 className="startTime">starts: {startTime}</h3>
                        <h3 className="endTime">ends: {endTime}</h3>
                        <h3 className="purpose">{purpose}</h3>
                        <h3 className="zoom-username">{zoom_username}</h3>
                    </div>
                    {/* <h2 className="meetingID">{meetingID}</h2> */}
                </div>
        );
    }
}
export default AppointmentCards