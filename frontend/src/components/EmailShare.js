import React, { Component } from 'react';
import InputFieldField from './InputFieldfield'
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
                    <InputField type="hidden" name="from_name" value={from_name}/>
                    <InputField type="hidden" name="join_url" value={join_url}/>
                    <InputField type="hidden" name="start_time" value={start_time}/>
                    <InputField type="hidden" name="end_time" value={end_time}/>
                    <InputField type="hidden" name="date" value={date}/>
                    <InputField type="hidden" name="purpose" value={purpose}/>
                    <label>발신자/From</label>
                    <InputField type="text" name="from_name"/>
                    <label>수신자/Recipient</label>
                    <InputField type="text" name="recipient"/>
                    <label>더할 내용/Additional Message</label>
                    <textarea name="message" />
                    <button type="submit" value="Send">Share</button>
                </form>
            </div>
        );
    }
}

export default EmailShare
