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
            username: 'username',
            date: '',// new Date(),
            startTime: '',
            endTime: '',
            purpose: '',
            buttonDisabled: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.doAppointment = this.doAppointment.bind(this);
        this.timeToInt = this.timeToInt.bind(this);
        this.timesToDuration = this.timesToDuration.bind(this);
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

    timeToInt(time) {
        let timeString = ''
        time.split(":").forEach((element) => {
            timeString += element;
        });
        var timeInt = parseInt(timeString)
        return timeInt;
    }

    timesToDuration(startTimeInt, endTimeInt) {
        var duration = [];
        while(startTimeInt <= endTimeInt) {
            duration.push(startTimeInt);
            if (startTimeInt%100 === 0) {
                startTimeInt += 30
            }
            else {
                startTimeInt += 70
            }
        }
        return duration;
    }
    
    async doAppointment() {
        if (
            this.state.date === '' || 
            this.state.startTime === '' || 
            this.state.endTime === '' || 
            this.state.purpose === ''){
            alert('Please fill out all fields.')
            return;
        }
        
        const username = this.state.username;
        const date = this.state.date.toLocaleDateString('en-GB');
        const startTime = this.state.startTime.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
        const endTime = this.state.endTime.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
        const purpose = this.state.purpose;

        var startTimeInt = this.timeToInt(startTime);
        var endTimeInt = this.timeToInt(endTime);
        console.log(endTimeInt)

        //if the date passes 12:00 don't allow appointment.
        if (this.state.date < this.state.startTime || startTimeInt > endTimeInt){
            alert('Invalid time.')
            return;
        }

        this.setState({
            buttonDisabled: true
        })

        //make duration into duration array with 30 minute increments.
        var duration = this.timesToDuration(startTimeInt, endTimeInt)
        console.log(duration)

        try { 
            let res = await fetch('/appointment', {
                method: 'post',
                headers: {
                    'Accept': 'application/JSON',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    date: date,
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
        const { date, startTime, endTime } = this.state;
        return (
                <div className="AppointmentPicker">
                    <DatePicker
                        className = "date-picker"
                        name="date"
                        selected={date}
                        onChange={(date) => this.handleDateChange(date, "date")}
                        onSelect={this.handleClick}
                        placeholderText="Select Date"
                        dateFormat="MM/dd/yyyy"
                        minDate={addDays(new Date(), 1)}
                        maxDate={addDays(new Date(), 8)}
                    />
                    <DatePicker
                        className = "start-time-picker"
                        name="startTime"
                        selected={startTime}
                        onChange={(startTime) => this.handleDateChange(startTime, "startTime")}
                        onSelect={this.handleClick}
                        placeholderText="Select Starting Time"
                        showTimeSelect
                        showTimeSelectOnly
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="h:mm aa"
                    />

                    <DatePicker
                        className = "end-time-picker"
                        name="endTime"
                        selected={endTime}
                        onChange={(endTime) => this.handleDateChange(endTime, "endTime")}
                        onSelect={this.handleClick}
                        placeholderText="Select Ending Time"
                        showTimeSelect
                        showTimeSelectOnly
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="h:mm aa"
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