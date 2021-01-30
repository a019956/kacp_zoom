import {extendObservable} from 'mobx';

class UserStore{
    constructor() {
        extendObservable(this, {
            loading: true,
            isLoggedIn: true,
            username: ''
        })
    }
}

export default new UserStore();