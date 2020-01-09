import {observable} from 'mobx'

class AuthStore{
    @observable isAuthenticated;

    constructor() {
        this.isAuthenticated = false
    }

    get isAuth() {
        return this.isAuthenticated
    }
}

const authStore = new AuthStore()

export default authStore

export {AuthStore}

