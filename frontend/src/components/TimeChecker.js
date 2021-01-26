import React, { Component } from 'react';
import TimeCard from './TimeCard';

class TimeDisplay extends Component{
    constructor(props) {
        super(props)
    }
    render () {
        const {date, timeCards, onClick} = this.props;
        const timeCards = this.props.timeCards.map((r) => (
            <TimeCard {...r} onClick={onClick}/>
        ))
        return (
            <div className="email-share">
                <text> Availability on {date} </text>
                <div className="time-card-container">
                    {timeCards}
                </div>
            </div>
        );
    }
}

export default TimeDisplay