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

class FrontEndTest extends Component {
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
            appointments: [{date:
                "2021-01-29",
                endTime:"00:30:00",
                join_url:"https://zoom.us/j/92192687861",
                meeting_id:"92192687861",
                purpose:"TEST",
                startTime:"00:00:00",
                start_url:"https://zoom.us/s/92192687861?zak=eyJ6bV9za20iOiJ6bV9vMm0iLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjbGllbnQiLCJ1aWQiOiJhRk1QWnpNWVJsU25zclNDeGZOMW93IiwiaXNzIjoid2ViIiwic3R5IjoxLCJ3Y2QiOiJhdzEiLCJjbHQiOjAsInN0ayI6IkVYZkpTWTdxOFQyQ3ZoMHVIdXB6OUVEVjIzenNYd2xSUkx2ZkFrUzJnc28uQUcuNXNTeGd3OHpoR3BNY0JOLUNrVTJmcnZKMEN3dTIyaE5FeWpva2F6bms3eDlBTDJKQmo2VklabDJRZERIdHZ6aUx2cjlpeklVVEowSkdqNC5Qa1gxeDZtWl80N3o3QmdDbDFpS2F3LnRKQlBQbVhkSEtuZUFPdnEiLCJleHAiOjE2MTE3MzI4MDMsImlhdCI6MTYxMTcyNTYwMywiYWlkIjoiY...",
                zoom_username:"zoom10@kacp.org"
                },
            {date:
                "2021-01-29",
                endTime:"00:30:00",
                join_url:"https://zoom.us/j/92192687861",
                meeting_id:"92192687861",
                purpose:"TEST",
                startTime:"00:00:00",
                start_url:"https://zoom.us/s/92192687861?zak=eyJ6bV9za20iOiJ6bV9vMm0iLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjbGllbnQiLCJ1aWQiOiJhRk1QWnpNWVJsU25zclNDeGZOMW93IiwiaXNzIjoid2ViIiwic3R5IjoxLCJ3Y2QiOiJhdzEiLCJjbHQiOjAsInN0ayI6IkVYZkpTWTdxOFQyQ3ZoMHVIdXB6OUVEVjIzenNYd2xSUkx2ZkFrUzJnc28uQUcuNXNTeGd3OHpoR3BNY0JOLUNrVTJmcnZKMEN3dTIyaE5FeWpva2F6bms3eDlBTDJKQmo2VklabDJRZERIdHZ6aUx2cjlpeklVVEowSkdqNC5Qa1gxeDZtWl80N3o3QmdDbDFpS2F3LnRKQlBQbVhkSEtuZUFPdnEiLCJleHAiOjE2MTE3MzI4MDMsImlhdCI6MTYxMTcyNTYwMywiYWlkIjoiY...",
                zoom_username:"zoom10@kacp.org"
                },{date:
                    "2021-01-29",
                    endTime:"00:30:00",
                    join_url:"https://zoom.us/j/92192687861",
                    meeting_id:"92192687861",
                    purpose:"TEST",
                    startTime:"00:00:00",
                    start_url:"https://zoom.us/s/92192687861?zak=eyJ6bV9za20iOiJ6bV9vMm0iLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjbGllbnQiLCJ1aWQiOiJhRk1QWnpNWVJsU25zclNDeGZOMW93IiwiaXNzIjoid2ViIiwic3R5IjoxLCJ3Y2QiOiJhdzEiLCJjbHQiOjAsInN0ayI6IkVYZkpTWTdxOFQyQ3ZoMHVIdXB6OUVEVjIzenNYd2xSUkx2ZkFrUzJnc28uQUcuNXNTeGd3OHpoR3BNY0JOLUNrVTJmcnZKMEN3dTIyaE5FeWpva2F6bms3eDlBTDJKQmo2VklabDJRZERIdHZ6aUx2cjlpeklVVEowSkdqNC5Qa1gxeDZtWl80N3o3QmdDbDFpS2F3LnRKQlBQbVhkSEtuZUFPdnEiLCJleHAiOjE2MTE3MzI4MDMsImlhdCI6MTYxMTcyNTYwMywiYWlkIjoiY...",
                    zoom_username:"zoom10@kacp.org"
                    },
                    {date:
                        "2021-01-29",
                        endTime:"00:30:00",
                        join_url:"https://zoom.us/j/92192687861",
                        meeting_id:"92192687861",
                        purpose:"TEST",
                        startTime:"00:00:00",
                        start_url:"https://zoom.us/s/92192687861?zak=eyJ6bV9za20iOiJ6bV9vMm0iLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjbGllbnQiLCJ1aWQiOiJhRk1QWnpNWVJsU25zclNDeGZOMW93IiwiaXNzIjoid2ViIiwic3R5IjoxLCJ3Y2QiOiJhdzEiLCJjbHQiOjAsInN0ayI6IkVYZkpTWTdxOFQyQ3ZoMHVIdXB6OUVEVjIzenNYd2xSUkx2ZkFrUzJnc28uQUcuNXNTeGd3OHpoR3BNY0JOLUNrVTJmcnZKMEN3dTIyaE5FeWpva2F6bms3eDlBTDJKQmo2VklabDJRZERIdHZ6aUx2cjlpeklVVEowSkdqNC5Qa1gxeDZtWl80N3o3QmdDbDFpS2F3LnRKQlBQbVhkSEtuZUFPdnEiLCJleHAiOjE2MTE3MzI4MDMsImlhdCI6MTYxMTcyNTYwMywiYWlkIjoiY...",
                        zoom_username:"zoom10@kacp.org"
                        },
                        {date:
                            "2021-01-29",
                            endTime:"00:30:00",
                            join_url:"https://zoom.us/j/92192687861",
                            meeting_id:"92192687861",
                            purpose:"TEST",
                            startTime:"00:00:00",
                            start_url:"https://zoom.us/s/92192687861?zak=eyJ6bV9za20iOiJ6bV9vMm0iLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjbGllbnQiLCJ1aWQiOiJhRk1QWnpNWVJsU25zclNDeGZOMW93IiwiaXNzIjoid2ViIiwic3R5IjoxLCJ3Y2QiOiJhdzEiLCJjbHQiOjAsInN0ayI6IkVYZkpTWTdxOFQyQ3ZoMHVIdXB6OUVEVjIzenNYd2xSUkx2ZkFrUzJnc28uQUcuNXNTeGd3OHpoR3BNY0JOLUNrVTJmcnZKMEN3dTIyaE5FeWpva2F6bms3eDlBTDJKQmo2VklabDJRZERIdHZ6aUx2cjlpeklVVEowSkdqNC5Qa1gxeDZtWl80N3o3QmdDbDFpS2F3LnRKQlBQbVhkSEtuZUFPdnEiLCJleHAiOjE2MTE3MzI4MDMsImlhdCI6MTYxMTcyNTYwMywiYWlkIjoiY...",
                            zoom_username:"zoom10@kacp.org"
                            },
                            {date:
                                "2021-01-29",
                                endTime:"00:30:00",
                                join_url:"https://zoom.us/j/92192687861",
                                meeting_id:"92192687861",
                                purpose:"TEST",
                                startTime:"00:00:00",
                                start_url:"https://zoom.us/s/92192687861?zak=eyJ6bV9za20iOiJ6bV9vMm0iLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjbGllbnQiLCJ1aWQiOiJhRk1QWnpNWVJsU25zclNDeGZOMW93IiwiaXNzIjoid2ViIiwic3R5IjoxLCJ3Y2QiOiJhdzEiLCJjbHQiOjAsInN0ayI6IkVYZkpTWTdxOFQyQ3ZoMHVIdXB6OUVEVjIzenNYd2xSUkx2ZkFrUzJnc28uQUcuNXNTeGd3OHpoR3BNY0JOLUNrVTJmcnZKMEN3dTIyaE5FeWpva2F6bms3eDlBTDJKQmo2VklabDJRZERIdHZ6aUx2cjlpeklVVEowSkdqNC5Qa1gxeDZtWl80N3o3QmdDbDFpS2F3LnRKQlBQbVhkSEtuZUFPdnEiLCJleHAiOjE2MTE3MzI4MDMsImlhdCI6MTYxMTcyNTYwMywiYWlkIjoiY...",
                                zoom_username:"zoom10@kacp.org"
                                },
                                {date:
                                    "2021-01-29",
                                    endTime:"00:30:00",
                                    join_url:"https://zoom.us/j/92192687861",
                                    meeting_id:"92192687861",
                                    purpose:"TEST",
                                    startTime:"00:00:00",
                                    start_url:"https://zoom.us/s/92192687861?zak=eyJ6bV9za20iOiJ6bV9vMm0iLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjbGllbnQiLCJ1aWQiOiJhRk1QWnpNWVJsU25zclNDeGZOMW93IiwiaXNzIjoid2ViIiwic3R5IjoxLCJ3Y2QiOiJhdzEiLCJjbHQiOjAsInN0ayI6IkVYZkpTWTdxOFQyQ3ZoMHVIdXB6OUVEVjIzenNYd2xSUkx2ZkFrUzJnc28uQUcuNXNTeGd3OHpoR3BNY0JOLUNrVTJmcnZKMEN3dTIyaE5FeWpva2F6bms3eDlBTDJKQmo2VklabDJRZERIdHZ6aUx2cjlpeklVVEowSkdqNC5Qa1gxeDZtWl80N3o3QmdDbDFpS2F3LnRKQlBQbVhkSEtuZUFPdnEiLCJleHAiOjE2MTE3MzI4MDMsImlhdCI6MTYxMTcyNTYwMywiYWlkIjoiY...",
                                    zoom_username:"zoom10@kacp.org"
                                    },
                                    {date:
                                        "2021-01-29",
                                        endTime:"00:30:00",
                                        join_url:"https://zoom.us/j/92192687861",
                                        meeting_id:"92192687861",
                                        purpose:"TEST",
                                        startTime:"00:00:00",
                                        start_url:"https://zoom.us/s/92192687861?zak=eyJ6bV9za20iOiJ6bV9vMm0iLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjbGllbnQiLCJ1aWQiOiJhRk1QWnpNWVJsU25zclNDeGZOMW93IiwiaXNzIjoid2ViIiwic3R5IjoxLCJ3Y2QiOiJhdzEiLCJjbHQiOjAsInN0ayI6IkVYZkpTWTdxOFQyQ3ZoMHVIdXB6OUVEVjIzenNYd2xSUkx2ZkFrUzJnc28uQUcuNXNTeGd3OHpoR3BNY0JOLUNrVTJmcnZKMEN3dTIyaE5FeWpva2F6bms3eDlBTDJKQmo2VklabDJRZERIdHZ6aUx2cjlpeklVVEowSkdqNC5Qa1gxeDZtWl80N3o3QmdDbDFpS2F3LnRKQlBQbVhkSEtuZUFPdnEiLCJleHAiOjE2MTE3MzI4MDMsImlhdCI6MTYxMTcyNTYwMywiYWlkIjoiY...",
                                        zoom_username:"zoom10@kacp.org"
                                        },
                                        {date:
                                            "2021-01-29",
                                            endTime:"00:30:00",
                                            join_url:"https://zoom.us/j/92192687861",
                                            meeting_id:"92192687861",
                                            purpose:"TEST",
                                            startTime:"00:00:00",
                                            start_url:"https://zoom.us/s/92192687861?zak=eyJ6bV9za20iOiJ6bV9vMm0iLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjbGllbnQiLCJ1aWQiOiJhRk1QWnpNWVJsU25zclNDeGZOMW93IiwiaXNzIjoid2ViIiwic3R5IjoxLCJ3Y2QiOiJhdzEiLCJjbHQiOjAsInN0ayI6IkVYZkpTWTdxOFQyQ3ZoMHVIdXB6OUVEVjIzenNYd2xSUkx2ZkFrUzJnc28uQUcuNXNTeGd3OHpoR3BNY0JOLUNrVTJmcnZKMEN3dTIyaE5FeWpva2F6bms3eDlBTDJKQmo2VklabDJRZERIdHZ6aUx2cjlpeklVVEowSkdqNC5Qa1gxeDZtWl80N3o3QmdDbDFpS2F3LnRKQlBQbVhkSEtuZUFPdnEiLCJleHAiOjE2MTE3MzI4MDMsImlhdCI6MTYxMTcyNTYwMywiYWlkIjoiY...",
                                            zoom_username:"zoom10@kacp.org"
                                            },
                                            {date:
                                                "2021-01-29",
                                                endTime:"00:30:00",
                                                join_url:"https://zoom.us/j/92192687861",
                                                meeting_id:"92192687861",
                                                purpose:"TEST",
                                                startTime:"00:00:00",
                                                start_url:"https://zoom.us/s/92192687861?zak=eyJ6bV9za20iOiJ6bV9vMm0iLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjbGllbnQiLCJ1aWQiOiJhRk1QWnpNWVJsU25zclNDeGZOMW93IiwiaXNzIjoid2ViIiwic3R5IjoxLCJ3Y2QiOiJhdzEiLCJjbHQiOjAsInN0ayI6IkVYZkpTWTdxOFQyQ3ZoMHVIdXB6OUVEVjIzenNYd2xSUkx2ZkFrUzJnc28uQUcuNXNTeGd3OHpoR3BNY0JOLUNrVTJmcnZKMEN3dTIyaE5FeWpva2F6bms3eDlBTDJKQmo2VklabDJRZERIdHZ6aUx2cjlpeklVVEowSkdqNC5Qa1gxeDZtWl80N3o3QmdDbDFpS2F3LnRKQlBQbVhkSEtuZUFPdnEiLCJleHAiOjE2MTE3MzI4MDMsImlhdCI6MTYxMTcyNTYwMywiYWlkIjoiY...",
                                                zoom_username:"zoom10@kacp.org"
                                                },
                                        ],
            reucurringMeetings: [],
            //Select menus for recurring meetings
            recurrence: false,
            recurrenceOptions: [
                {name: 'One-time', value: '2'},
                {name: 'Repeating', value: '8'}
            ],
            recurrenceOption: '8',
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

    };



    //RENDER METHOD
    render() {
        const { today, date, startTime, endTime, purpose, recurrenceTypes, recurrenceType, 
                recurrenceOptions, recurrenceOption, recurrenceWeeks, recurrenceWeek,  recurrenceDays, recurrenceDay, recurrenceIntervals, recurrenceInterval,
                recurrenceTimes, recurrenceTime, share_join_url, share_start_time, share_end_time,
                share_date, share_purpose} = this.state;
        return (
            <div>
                <div className = "app_container">
                    <div className = "left_container" >
                        <div className = "appointment_display">
                            <div className="explanation">
                                <div className = "block_title">Appointments</div> <div className = "block_date">{today}</div>
                            </div>

                            <div className = "appointment_list_container">
                                    <AppointmentList
                                        appointmentCards = {this.state.appointments}
                                    />
                            </div>
                        </div>
                    </div>

                    <div className="right_container">
                        <text className = 'right-title'>Create Appointment</text>
                        <form className="appointment_form"
                        onSubmit={this.handleSubmit}>

                            
                            {/* <DateChecker/> */}
                            <div className = "time-picker">
                                <label>Starting Date</label>
                                <DatePicker
                                    className="start-date-picker"
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
                                    className="start-time-picker"
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
                                    className="end-time-picker"
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
                                <label>Purpose</label>
                                <input
                                    label="Purpose"
                                    className="purpose-picker"
                                    type="text"
                                    name="purpose"
                                    placeholder="Purpose"
                                    value = {purpose}
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                />
                            </div>
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
                                    {(recurrenceOption==8) && 
                                    <div className='recurrence-menu'>
                                        <SelectMenu
                                            label="반복 / Recurrence"
                                            options={recurrenceTypes}
                                            onChange={this.handleChange}
                                            name='recurrenceType'
                                            value={recurrenceType}
                                        />


                                        <SelectMenu
                                            label={(recurrenceType==2)?'간격 (주) / Interval (Weeks)':'간격 (달) / Interval (Months)'}
                                            options={recurrenceIntervals}
                                            onChange={this.handleChange}
                                            name='recurrenceInterval'
                                            value={recurrenceInterval}
                                        />
                                        {(recurrenceType==3) && <SelectMenu
                                            label='매 달 몇째주 / Week of the month'
                                            endLabel='week'
                                            options={recurrenceWeeks}
                                            onChange={this.handleChange}
                                            name='recurrenceWeek'
                                            value={recurrenceWeek}
                                        />}

                                        <SelectMenu
                                            label='요일 / Day of the Week'
                                            options={recurrenceDays}
                                            onChange={this.handleChange}
                                            name='recurrenceDay'
                                            value={recurrenceDay}
                                        />

                                        <SelectMenu
                                            label='모임 횟수 / Recurrence amount'
                                            options={recurrenceTimes}
                                            onChange={this.handleChange}
                                            name='recurrenceTime'
                                            value={recurrenceTime}
                                        />
                                </div>}
                            </div>
                            <button
                                className="submit-button"
                            >
                                Confirm
                            </button>
                        </form>
                    </div>
                    {/* <div className = "EmailShare">
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
                    </div> */}

                </div>
            </div>
        );
    }
}

export default FrontEndTest;