import React, { Component } from 'react';
import '../styles/EmailShare.css';

class EmailShare extends Component {
    constructor(props) {
        super(props);
    }
    
    render () {
        const {onCancel, from_name, join_url, start_time, end_time, date, purpose} = this.props;

        return (
            <div className="email-share">
                <button onCancel={onCancel}>X</button>
                <div className="share-info-container">
                    <h3 className="share-meeting">
                        회의 공유/Share Meeting
                    </h3>
                    <text className="share-meeting-info">Invitation for Zoom Meeting for {purpose} {'\n'} on {date} from {start_time} - {end_time} {'\n'}Join with: {join_url}</text>
                </div>
                <form className="contact-form" onSubmit={this.props.sendEmail}>
                    <input type="hidden" name="from_name" value={from_name}/>
                    <input type="hidden" name="join_url" value={join_url}/>
                    <input type="hidden" name="start_time" value={start_time}/>
                    <input type="hidden" name="end_time" value={end_time}/>
                    <input type="hidden" name="date" value={date}/>
                    <input type="hidden" name="purpose" value={purpose}/>
                    <label>발신자/From</label>
                    <input type="text" name="from_name"/>
                    <label>수신자/Recipient</label>
                    <input type="text" name="recipient"/>
                    <label>더할 내용/Additional Message</label>
                    <textarea name="message" />
                    <button type="submit" value="Send">Share</button>
                </form>
            </div>
        );
    }
}

export default EmailShare
