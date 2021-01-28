import React, { Component } from 'react';
import TimeChecker from '../components/TimeChecker'
import SelectMenu from '../components/SelectMenu'
import InputField from '../components/InputField'
import SubmitButton from '../components/SubmitButton'
import AppointmentList from '../components/AppointmentList'
import EmailShare from '../components/EmailShare'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import emailjs from 'emailjs-com';
import { addDays , format } from 'date-fns';
import UserStore from '../stores/UserStore'
import '../styles/ZoomPicker.css';
import { Paper } from '@material-ui/core';

class ZoomPicker extends Component {
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
            reucurringMeetings: [],
            //Select menus for recurring meetings
            recurrence: false,
            recurrenceOptions: [
                {name: 'One-time', value: '2'},
                {name: 'Repeating', value: '8'}
            ],
            recurrenceOption: '',
            recurrenceTypes: [
                {name: 'Weekly', value: '2',},
                {name: 'Monthly', value: '3',}
            ],
            recurrenceType: 2,
            recurrenceWeeks: [
                {name: 'First', value: '1'},
                {name: 'Second', value: '2'},
                {name: 'Third', value: '3'},
                {name: 'Fourth', value: '4'},
                {name: 'Last', value: '-1'},
            ],
            recurrenceWeek: 1,
            recurrenceDays: [
                {name: 'Sunday', value: '7',},
                {name: 'Monday', value: '1',},
                {name: 'Tuesday',value: '2',},
                {name: 'Wednesday', value: '3',},
                {name: 'Thursday', value: '4',},
                {name: 'Friday', value: '5',},
                {name: 'Saturday', value: '6',},
            ],
            recurrenceDay: 1,
            recurrenceIntervals: [
                {name: '1', value: '1',},
                {name: '2', value: '2',},
                {name: '3', value: '3',},
            ],
            recurrenceInterval: 1,
            recurrenceTimes: [
                {name: '1', value: '1',},
                {name: '2', value: '2',},
                {name: '3', value: '3',},
                {name: '4', value: '4',},
                {name: '5', value: '5',},
                {name: '6', value: '6',},
                {name: '7', value: '7',},
                {name: '8', value: '8',},
                {name: '9', value: '9',},
                {name: '10', value: '10',},
                {name: '11', value: '11',},
                {name: '12', value: '12',},
                {name: '13', value: '13',},
                {name: '14', value: '14',},
                {name: '15', value: '15',},
                {name: '16', value: '16',}
            ],
            recurrenceTime: 2,

            //state for email sharing
            share_join_url: '',
            share_start_time: '',
            share_end_time: '',
            share_date: '',
            share_purpose: '', 
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.doAppointment = this.doAppointment.bind(this);
        this.deleteAppointment = this.deleteAppointment.bind(this);
        this.onEmailShare = this.onEmailShare.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
        this.timeToInt = this.timeToInt.bind(this);
        this.timesToDuration = this.timesToDuration.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    };

    //  Upon loading of the page, load all appointments 
    componentDidMount() {
        const username = UserStore.username
        this.setState({username});
        this.getAppointment();
    }

    //  Updates states upon change of values.
    handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
    }
    handleDateChange(date, name) {
        this.setState({[name]: date});
    }
    handleTimeChange(value, name) {
        this.setState({[name]: value});
    }


    //  Function to change time string to 6 digit integer value for calculations and JSON formatting
    timeToInt(time) {
        let timeString = ''
        time.split(":").forEach((element) => {
            timeString += element;
        });
        var timeInt = parseInt(timeString)
        return timeInt;
    }

    //  Changes starting time and ending time to duration array.
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
    
    //  Submitting meetings to be checked for validity.
    handleSubmit(e) {
        e.preventDefault();
        //  If some field is emtpy, return error.
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

    //  Create appointment based on infromation given by the user
    async doAppointment() {
        const today = format(new Date(), 'yyyy-MM-dd')
        const username = this.state.username;
        const date = this.state.date.toLocaleDateString("fr-CA");
        const startTime = this.state.startTime.toLocaleTimeString("en-GB", {hour: '2-digit', minute: '2-digit', second: '2-digit'});
        const endTime = this.state.endTime.toLocaleTimeString("en-GB", {hour: '2-digit', minute: '2-digit', second: '2-digit'});
        const purpose = this.state.purpose;
        const recurrenceType = this.state.recurrenceType;
        const recurrenceOption = this.state.recurrenceOption;
        const recurrenceInterval = this.state.recurrenceInterval;
        const recurrenceWeek = this.state.recurrenceWeek;
        const recurrenceDay = this.state.recurrenceDay;
        const recurrenceTime = this.state.recurrenceTime;

        var startTimeInt = this.timeToInt(startTime);
        var endTimeInt = this.timeToInt(endTime);

        //  If the date given by the user is before today or startime is after endtime, return error.
        if (this.state.date < today || startTimeInt > endTimeInt){
            alert('Invalid time.')
            return;
        }

        this.setState({
            buttonDisabled: true
        })

        //  Make duration into duration array with 30 minute increments to be saved in the database.
        var durationArray = this.timesToDuration(startTimeInt, endTimeInt)
        //  Duration in minutes
        var duration = (durationArray.length - 1) * 30
        try { 
            let res = await fetch('/doAppointment', {
                method: 'post',
                headers: {
                    'Accept': 'application/JSON',
                    'Content-Type': 'application/json'
                },
                //  Send JSON to router to be inserted into database.
                body: JSON.stringify({
                    username: username,
                    date: date,
                    duration: duration,
                    durationArray: durationArray,
                    purpose: purpose,
                    startTime: startTime,
                    endTime: endTime,
                    recurrenceType: recurrenceType,
                    recurrenceOption: recurrenceOption,
                    recurrenceInterval: recurrenceInterval,
                    recurrenceWeek: recurrenceWeek,
                    recurrenceDay: recurrenceDay,
                    recurrenceTime: recurrenceTime,
                    
                })
            });
            //  Meeting is successfully made.
            let result = await res.json();
            if (result && result.success) {
                alert(result.msg);
            }
            //  If time collides with other meetings, return fail.
            else if (result && result.success === false) {
                alert(result.msg);
            }
        }
        //  Handle errors
        catch(e) {
            console.log(e);
        }
        this.getAppointment()
    }

    //  Loads appointments for front-end display that are under the current username
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
            //  Get appointments made by the user from the database, and set react state with retrieved data.
            const appointments = result.appointments;
            this.setState({appointments})
        }
        //  Handle errors
        catch(e) {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
        }

    };

    //  When start button is pressed, open Zoom meeting start url retrieved from Zoom API.
    startMeeting(start_url) {
        window.open(start_url)
    }

    //  Delete meeting from the database and make DELETE request to Zoom API.
    async deleteAppointment(meeting_id) {
        const id = meeting_id
        
        //  Send meeting ID retrieved from Zoom API to router.
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
            //  If successful, alert with success message.
            if (result && result.success) {
                alert(result.msg);
            }
            //  If there is an error, alert with error message.
            else if (result && result.success === false) {
                alert(result.msg);
            }
        }
        //  Handle errors.
        catch(e) {
            console.log(e);
        }
        this.getAppointment()
    }



    //  SENDING EMAILS
    //  When share button is pressed, set shared meeting information as state to be displayed on front end & to be sent as e-mail.
    onEmailShare(join_url, startTime, endTime, date, purpose){
        const share_join_url = join_url;
        const share_start_time = startTime;
        const share_end_time = endTime;
        const share_date = date;
        const share_purpose = purpose;
        this.setState({share_join_url, share_start_time, share_end_time, share_date, share_purpose})
    }

    //  When cancel button is pressed, clear shared meeting information from state. 
    onCancel(){
        this.setState({share_join_url: '', share_start_time: '', share_end_time: '', share_date: '', share_purpose: ''})
    }

    //  On submission,
    sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_b2o90jd', 'template_95z7xck', e.target, 'user_vZliYk1PdzThlzI9zIDpR')
            .then((result) => {
                console.log(result.text);
                alert('email was sent.')
                
            }, (error) => {
                console.log(error.text);
                alert('Error has occurred, please try again. Error:' + error)
            });
    }

    //RENDER METHOD
    render() {
        const { date, startTime, endTime, purpose, recurrenceTypes, recurrenceType, 
            recurrenceOptions, recurrenceOption, recurrenceWeeks, recurrenceWeek,  recurrenceDays, recurrenceDay, recurrenceIntervals, recurrenceInterval,
        recurrenceTimes, recurrenceTime, share_join_url, share_start_time, share_end_time,
        share_date, share_purpose} = this.state;
        return (
            <div>
                <div className = "AppointmentContainer">
                    <div className="AppointmentPicker">
                        
                        <form className="AppointmentForm"
                        onSubmit={this.handleSubmit}>

                            <h3 className = 'welcome'>Hello, {UserStore.username}</h3>
                            {/* <DateChecker/> */}
                            <h4 className = 'today'>Today is: {this.state.today}</h4>
                            <div className='recurrence-options'>
                                <li className='tab-container' value={recurrenceOption} onChange={this.handleChange}>
                                    <ul>
                                        <input name="recurrenceOption" type="radio" id="tab01" value='2'/>
                                        <label for="tab01">One-time</label>
                                    </ul>
                                    <ul>
                                        <input name="recurrenceOption" type="radio" id="tab02" value='8'/>
                                        <label for="tab02">Repeating</label>
                                    </ul>
                                </li>
                                    {(recurrenceOption==8) && <div className='RecurrenceMenu'>
                                    <SelectMenu
                                        options={recurrenceTypes}
                                        onChange={this.handleChange}
                                        endLabel='meeting'
                                        name='recurrenceType'
                                        value={recurrenceType}
                                    />


                                    <SelectMenu
                                        label='Every'
                                        endLabel={(recurrenceType==2)?'Week(s)':'Month(s)'}
                                        options={recurrenceIntervals}
                                        onChange={this.handleChange}
                                        name='recurrenceInterval'
                                        value={recurrenceInterval}
                                    />
                                    {(recurrenceType==3) && <SelectMenu
                                        label='On'
                                        endLabel='week'
                                        options={recurrenceWeeks}
                                        onChange={this.handleChange}
                                        name='recurrenceWeek'
                                        value={recurrenceWeek}
                                    />}

                                    <SelectMenu
                                        label='On'
                                        options={recurrenceDays}
                                        onChange={this.handleChange}
                                        name='recurrenceDay'
                                        value={recurrenceDay}
                                    />

                                    <SelectMenu
                                        label='Ends after'
                                        endLabel='meetings'
                                        options={recurrenceTimes}
                                        onChange={this.handleChange}
                                        name='recurrenceTime'
                                        value={recurrenceTime}
                                    />
                                </div>}
                            </div>

                            <label>Starting Date</label>
                            <DatePicker
                                className = "time-picker"
                                name="date"
                                selected={date}
                                onChange={(date) => this.handleDateChange(date, "date")}
                                onSelect={this.handleClick}
                                placeholderText="Starting Date"
                                dateFormat="yyyy-MM-dd"
                                minDate= {new Date()}
                                maxDate={addDays(new Date(), 8)}
                                autoComplete="off"
                            />

                            <label>Starting Time</label>
                            <DatePicker
                                label='Start Time'
                                className = "time-picker"
                                name="startTime"
                                selected={startTime}
                                onChange={(startTime) => this.handleDateChange(startTime, "startTime")}
                                onSelect={this.handleClick}
                                placeholderText="Starting Time"
                                showTimeSelect
                                showTimeSelectOnly
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                dateFormat="h:mm aa"
                                autoComplete="off"
                            />

                            <label>Ending Time</label>
                            <DatePicker
                                className = "time-picker"
                                name="endTime"
                                selected={endTime}
                                onChange={(endTime) => this.handleDateChange(endTime, "endTime")}
                                onSelect={this.handleClick}
                                placeholderText="Ending Time"
                                showTimeSelect
                                showTimeSelectOnly
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                dateFormat="h:mm aa"
                                autoComplete="off"
                            />

                            <InputField 
                                label="Purpose"
                                className="PurposePicker"
                                type="text"
                                name="purpose"
                                placeholder="Purpose"
                                value = {purpose}
                                onChange={this.handleChange}
                                autoComplete="off"
                            />
                            <SubmitButton
                                text='Confirm'
                            />
                        </form>
                    </div>

                    <div className = "AppointmentChecker" >
                        <div
                        className="explanation"
                        type="text"></div>
                        <Paper style={{padding: '10px',height: '100%', width: '100%', overflow: 'auto'}}>
                            <AppointmentList
                                appointmentCards = {this.state.appointments}
                                onStart={this.startMeeting}
                                onDelete={this.deleteAppointment}
                                onEmailShare={this.onEmailShare}
                            />
                        </Paper>
                    </div>
                    <div className = "EmailShare">
                        {share_join_url!=''&&
                        <EmailShare
                            onCancel = {this.onCancel}
                            sendEmail = {this.sendEmail}
                            from_name={this.state.username}
                            join_url={share_join_url}
                            start_time={share_start_time}
                            end_time={share_end_time}
                            date={share_date}
                            purpose={share_purpose}

                            style={{height: '100%'}}
                        />}
                    </div>

                </div>
            </div>
        );
    }
}

export default ZoomPicker;