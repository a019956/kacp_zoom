import React, { Component } from 'react';
import InputField from '../components/InputField'
import SubmitButton from '../components/SubmitButton'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';
import UserStore from '../stores/UserStore'

import '../styles/TimePicker.css';

class TimePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',// new Date(),
            time: '',
            duration: '',
            purpose: '',
            disabledDays: '',
            buttonDisabled: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.doAppointment = this.doAppointment.bind(this);
    };

    handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

    handleDateChange(date, name) {
        this.setState({[name]: date});
    }

    handleTimeChange(value, name) {
        this.setState({[name]: value});
    }

    async doAppointment() {
        const date = this.state.date.toLocaleDateString('en-GB');
        console.log(date)
        const time = this.state.time.toLocaleTimeString('en-GB');
        const duration = this.state.duration;
        const purpose = this.state.duration;

        if (date === '' || time === '' || duration === '' || purpose === ''){
            alert('Please fill out all fields.')
            return;
        }
        //FUNCTION TO UPDATE CURRENT TIME & PASS ERROR IF SOMEONE TRIES TO MAKE AN APPOINTMENT BEFORE
        
        const currentTime = (new Date()).toLocaleTimeString('en-GB');

        if (currentTime > time){
            alert('Invalid time.')
            return;
        }
        this.setState({
            buttonDisabled: true
        })
        
        try { 
            let res = await fetch('/appointment', {
                method: 'post',
                headers: {
                    'Accept': 'application/JSON',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date: date,
                    time: time,
                    duration: duration,
                    purpose: purpose,
                })
            });
            
            let result = await res.json();
            if (result && result.success) {
                UserStore.madeAppointment = true;
                UserStore.username = result.username;
            }

            else if (result && result.success === false) {
                alert(result.msg);
            }
        }
        catch(e) {
            console.log(e);
        }
    }


    render() {
        const { date, time } = this.state;
        return (
                <div className="AppointmentPicker">
                    <DatePicker
                        name="date"
                        selected={date}
                        onChange={(date) => this.handleDateChange(date, "date")}
                        onSelect={this.handleClick}
                        placeholderText="Select Date"
                        dateFormat="MM/dd/yyyy"
                        minDate={new Date()}
                        maxDate={addDays(new Date(), 7)}
                    />
                    <DatePicker
                        name="time"
                        selected={time}
                        onChange={(time) => this.handleDateChange(time, "time")}
                        onSelect={this.handleClick}
                        placeholderText="Select Time"
                        showTimeSelect
                        showTimeSelectOnly
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="h:mm aa"
                    />
                    <InputField 
                    className = "DurationPicker"
                        type = "number"
                        name = "duration"
                        value = {this.state.duration}
                        onChange = {this.handleChange}
                    />
                    <InputField 
                    className="PurposePicker"
                        type="text"
                        name="purpose"
                        value = {this.state.purpose}
                        onChange={this.handleChange}
                    />
                    <SubmitButton
                        onSubmit = {() => {this.doAppointment()}}
                        text='Confirm'
                    />
                </div>
        );
    }
}
export default TimePicker;