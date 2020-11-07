import React, {Component} from 'react';
import AppointmentCards from './AppointmentCards';

class AppointmentList extends Component {

    render() {
        const appointmentCards = this.props.appointmentCards.map((r, index) => (
            <AppointmentCards key = {r.id} {...r} />
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