import React, {Component} from 'react'

class TimeCard extends Component{
    render() {
        const {date, time, availability} = this.props;

        return(
            <div className="time-card"
            time={time}
            availability={availability}
            >
                <div>
                    {time}
                </div>
            </div>
        )
    }
}