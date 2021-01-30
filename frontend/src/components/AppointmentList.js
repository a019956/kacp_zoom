import React, {Component} from 'react';
import AppointmentCards from './AppointmentCards';
import '../styles/AppointmentList.css'

class AppointmentList extends Component {

    render() {
        const {onStart, onDelete, onEmailShare} = this.props;
        const appointmentCards = this.props.appointmentCards.map((r, index) => (
            <AppointmentCards key = {r.id} {...r} onStart={onStart} onDelete={onDelete} onEmailShare={onEmailShare}/>
        ));

        return (
                <div className = 'appointment-list'>
                    {appointmentCards}
                </div>
        )
    }
}

export default AppointmentList;