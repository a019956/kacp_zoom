import {extendObservable} from 'mobx';

class UserStore{
    constructor() {
        extendObservable(this, {
            loading: true,
            isLoggedIn: false,
            user: ''
        })
    }
}

export default new UserStore();