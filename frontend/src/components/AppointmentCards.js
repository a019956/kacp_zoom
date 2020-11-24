import React, {Component} from 'react';
import '../styles/AppointmentCards.css'

class AppointmentCards extends Component {

    render() {
        const {date,  purpose, startTime, endTime, zoom_username, join_url, start_url, meeting_id, onStart, onDelete} = this.props;
        return (
                <div className="appointment-card">
                    <div className="appointment-content-left">
                    <h3 calssName="date-purpose">{date} meeting for {purpose}</h3>
                    <h3 className="duration">From {startTime} to {endTime}</h3>
                </div>    
                    <div className="appointment-content-right">
                        <h3 className="zoom-username">{zoom_username}</h3>
                        <h3 className="join-url">{join_url}</h3>
                        <button
                        className="start-button"
                        onClick = {() => onStart(start_url)}
                        >
                            Start Meeting
                        </button>
                        <button
                        className="delete-button"
                        onClick = {() => onDelete(meeting_id)}
                        >
                            Delete Meeting
                        </button>
                    </div>
                </div>
        );
    }
}
export default AppointmentCards;