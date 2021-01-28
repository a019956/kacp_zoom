import React, {Component} from 'react';
import AppointmentCards from './AppointmentCards';

class AppointmentList extends Component {

    render() {
        const {onStart, onDelete, onEmailShare} = this.props;
        const appointmentCards = this.props.appointmentCards.map((r, index) => (
            <AppointmentCards key = {r.id} {...r} onStart={onStart} onDelete={onDelete} onEmailShare={onEmailShare}/>
        ));
        if (appointmentCards === [] ) {
        return (
            <div className = 'empty-appointment-list'>
                currently no appointments are made.
            </div>
        )
        }
        else {
            return (
            <div className = 'appointment-list'>
                {appointmentCards}
            </div>
            )
        }
    }
}

export default AppointmentList;