import {extendObservable} from 'mobx';

class UserStore{
    constructor() {
        extendObservable(this, {
            loading: true,
            isLoggedIn: false,
            checkAppointment: false,
            user: ''
        })
    }
}

export default new UserStore();