import React, { Component } from 'react';
import InputField from '../components/InputField'
import SubmitButton from '../components/SubmitButton'
import AppointmentList from '../components/AppointmentList'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addDays , format } from 'date-fns';
import UserStore from '../stores/UserStore'
import '../styles/TimePicker.css';
import Navbar from '../components/Navbar';
import { Paper } from '@material-ui/core';

class TimePicker extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            today: format(new Date(), 'yyyy-MM-dd'),
            username: '',
            date: '',
            startTime: '',
            endTime: '',
            purpose: '',
            buttonDisabled: false,
            appointments: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.doAppointment = this.doAppointment.bind(this);
        this.deleteAppointment = this.deleteAppointment.bind(this);
        this.timeToInt = this.timeToInt.bind(this);
        this.timesToDuration = this.timesToDuration.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        const username = UserStore.username
        this.setState({username});
        console.log(username);
        this.getAppointment();
    }

    handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

    handleDateChange(date, name) {
        this.setState({[name]: date});
    }

    handleTimeChange(value, name) {
        this.setState({[name]: value});
    }

    //function to change time string to 4 digit integer value for calculations
    timeToInt(time) {
        let timeString = ''
        time.split(":").forEach((element) => {
            timeString += element;
        });
        var timeInt = parseInt(timeString)
        return timeInt;
    }

    timesToDuration(startTimeInt, endTimeInt) {
        var durationArray = [];
        while(startTimeInt <= endTimeInt) {
            durationArray.push(startTimeInt);
            if (startTimeInt%10000 === 0) {
                startTimeInt += 3000
            }
            else {
                startTimeInt += 7000
            }
        }
        return durationArray;
    }
    
    //when page loads, check appointments that are under the current username
    async getAppointment() {
        const username = UserStore.username;
        const today = format(new Date(), 'yyyy-MM-dd')

        try{
    
            let res = await fetch ('/getAppointment', {
                method: 'post',
                headers: {
                    'Accept': 'application/JSON',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    today: today,
                })
            });

            let result = await res.json();

            const appointments = result.appointments;
            this.setState({appointments})
        }

        catch(e) {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
        }

    };

    //create appointment based on infromation given by the user
    async doAppointment() {
        const today = format(new Date(), 'yyyy-MM-dd')
        const username = this.state.username;
        const date = this.state.date.toLocaleDateString("fr-CA");
        const startTime = this.state.startTime.toLocaleTimeString("en-GB", {hour: '2-digit', minute: '2-digit', second: '2-digit'});
        const endTime = this.state.endTime.toLocaleTimeString("en-GB", {hour: '2-digit', minute: '2-digit', second: '2-digit'});
        const purpose = this.state.purpose;

        var startTimeInt = this.timeToInt(startTime);
        var endTimeInt = this.timeToInt(endTime);

        //if the date passes 12:00 don't allow appointment.
        if (this.state.date < today || startTimeInt > endTimeInt){
            alert('Invalid time.')
            return;
        }

        this.setState({
            buttonDisabled: true
        })

        //make duration into duration array with 30 minute increments.
        var durationArray = this.timesToDuration(startTimeInt, endTimeInt)
        //duration in minutes

        var duration = (durationArray.length - 1) * 30
        try { 
            let res = await fetch('/doAppointment', {
                method: 'post',
                headers: {
                    'Accept': 'application/JSON',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    date: date,
                    duration: duration,
                    durationArray: durationArray,
                    purpose: purpose,
                    startTime: startTime,
                    endTime: endTime,

                })
            });
            
            let result = await res.json();
            if (result && result.success) {
                alert(result.msg);
            }

            else if (result && result.success === false) {
                alert(result.msg);
            }
        }
        catch(e) {
            console.log(e);
        }
        this.getAppointment()
    }

    handleSubmit(e) {
        e.preventDefault();
        if (
            this.state.date === '' || 
            this.state.startTime === '' || 
            this.state.endTime === '' || 
            this.state.purpose === ''){
            alert('Please fill out all fields.')
            return;
        }
        this.doAppointment()
    }

    startMeeting(start_url) {
        window.open(start_url)
    }

    async deleteAppointment(meeting_id) {
        const id = meeting_id

        try { 
            let res = await fetch('/deleteAppointment', {
                method: 'post',
                headers: {
                    'Accept': 'application/JSON',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            });
            
            let result = await res.json();
            if (result && result.success) {
                alert(result.msg);
            }

            else if (result && result.success === false) {
                alert(result.msg);
            }
        }
        catch(e) {
            console.log(e);
        }
        this.getAppointment()
    }

    //when page loads, get appointments under the username.
    render() {
        const { date, startTime, endTime} = this.state;
        return (
            <div>
                <Navbar
                    username = {this.state.username}
                    today = {this.state.today}
                />
            <div className = "AppointmentContainer">
                <form className="AppointmentPicker"
                onSubmit={this.handleSubmit}>
                    <h3 className = 'welcome'>Hello, {UserStore.username}</h3>
                    <h4 classNAme = 'today'>Today is: {this.state.today}</h4>
                    <DatePicker
                        className = "date-picker"
                        name="date"
                        selected={date}
                        onChange={(date) => this.handleDateChange(date, "date")}
                        onSelect={this.handleClick}
                        placeholderText="Select Date"
                        dateFormat="yyyy-MM-dd"
                        minDate= {new Date()}
                        maxDate={addDays(new Date(), 8)}
                        autoComplete="off"
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
                        autoComplete="off"
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
                        autoComplete="off"
                    />

                    <InputField 
                    className="PurposePicker"
                        type="text"
                        name="purpose"
                        placeholder="Purpose"
                        value = {this.state.purpose}
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    <SubmitButton
                        text='Confirm'
                    />
                </form>

                <div className = "AppointmentChecker" >
                    <div
                    className="explanation"
                    type="text"></div>
                    <Paper style={{padding: '10px',height: '100%', width: '100%', overflow: 'auto'}}>
                        <AppointmentList
                            appointmentCards = {this.state.appointments}
                            onStart={this.startMeeting}
                            onDelete={this.deleteAppointment}
                        />
                    </Paper>
                </div>
            </div>
            </div>
        );
    }
}

export default TimePicker;