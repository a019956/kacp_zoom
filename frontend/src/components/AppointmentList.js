import React, {Component} from 'react';
import AppointmentCards from './AppointmentCards';

class AppointmentList extends Component {

    render() {
        const appointmentCards = this.props.appointmentCards.map((r, index) => (
            <AppointmentCards key = {r.id} {...r} />
        ));
        return (
            <div>
                {appointmentCards}
            </div>
        )
    }
}

export default AppointmentList;