import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';
import Navbar from './components/Navbar'
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            appointments: [
                {
                    date: '2020. 9. 23.',
                    time: '15:30:00'
                },
            ]
        }
        //comment
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    };

    handleConfirm(date) {
        const newDate = ((this.state.date).toLocaleDateString());
        const newTime = ((this.state.date).toLocaleTimeString('en-GB'));
        alert((this.state.date).toLocaleDateString());
        alert((this.state.date).toLocaleTimeString('en-GB'));
        const newAppointment = {
            date: newDate,
            time: newTime
        }
        const appointments = [...this.state.appointments, newAppointment]
        this.setState({ appointments })
        console.log(this.state.date)
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleDateChange = date => this.setState({ date });

    handleTimeChange = time => this.setState({ time });

    handleClick = () => alert('selected', this.state.date);

    render() {
        const { date, handleChange } = this.state;
        return (
            <div className="App">
                <Navbar />
                <div className="AppointmentPicker">
                    <DatePicker
                        selected={this.state.date}
                        onChange={this.handleChange}
                        onSelect={this.state.handleClick}
                        dateFormat="MM/dd/yyyy HH:mm"
                        minDate={new Date()}
                        maxDate={addDays(new Date(), 7)}
                        timeintervals={30}
                        showTimeSelect
                    />
                    <input className="DurationPicker"
                        type='number'

                    />
                    <button
                        onClick={this.handleConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        );
    }
}
export default App;