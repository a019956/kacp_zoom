import React, { Component } from 'react';
import '../styles/AppointmentCards.css'

class AppointmentCards extends Component {

    render() {
        const {date, time, purpose, meetingID} = this.props;
        return (
                <div className="appointmentCards">
                    <label>{date}</label>
                    <h2 className="time">{time}</h2>
                    <h3 className="purpose">{purpose}</h3>
                    {/* <h2 className="meetingID">{meetingID}</h2> */}
                </div>
        );
    }
}
export default AppointmentCards