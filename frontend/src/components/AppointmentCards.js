import React, {Component} from 'react';
import '../styles/AppointmentCards.css'

class AppointmentCards extends Component {

    render() {
        const {date,  purpose, startTime, endTime, zoom_username, join_url, 
            start_url, meeting_id, onStart, onDelete, onEmailShare, onKakaoTalk} = this.props;
        return (
            <div className="appointment-card">
                <div className='meeting-info-container'>
                    <h3 className="agenda">{purpose}: {date}</h3>
                    <h3 className="duration">{startTime} - {endTime}</h3>
                    <h3 className="zoom-username">{zoom_username}</h3>
                    <h3 className="join-url">Invite Link: {join_url}</h3>
                </div>
                <div className="button-container">
                    <button
                    className="start-button"
                    onClick = {() => onStart(start_url)}
                    >
                        Start
                    </button>
                    <button
                    className="email-button"
                    onClick = {() => onEmailShare(join_url, startTime, endTime, date, purpose)}
                    >
                        Share
                    </button>
                    <button
                    className="delete-button"
                    onClick = {() => onDelete(meeting_id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}
export default AppointmentCards;