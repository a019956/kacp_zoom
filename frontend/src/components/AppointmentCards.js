import React, {Component} from 'react';
import '../styles/AppointmentCards.css'

class AppointmentCards extends Component {

    render() {
        const {date,  purpose, startTime, endTime, zoom_username, join_url, start_url, meeting_id, onStart, onDelete} = this.props;
        return (
            <div className="appointment-card">
                <h3 className="agenda">{purpose}: {date}</h3>
                <h3 className="duration">{startTime} - {endTime}</h3>
                <h3 className="zoom-username">{zoom_username}</h3>
                <h3 className="join-url">Invite Link: {join_url}</h3>
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
        );
    }
}
export default AppointmentCards;