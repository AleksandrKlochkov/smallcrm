import {observable, action, configure, computed} from 'mobx'

configure({ enforceActions: "observed" })

class AuthStore{
    @observable isAuthenticated = false;
    @observable token = "";
    routerHistory = {};

    get isAuthenticated() {
        return this.isAuthenticated
    }


    @action('auth')
    async auth(formData){
        const authData = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        const url = '/api/auth/login'

        try{
            if(url){
                await fetch(url,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(authData)
                })
                .then(response => {
                    return response.json()
                })
                .then(data=>{
                    if(data.message){
                        window.M.toast({ html: data.message})
                    }else{
                        const experationDate = new Date(data.expiresIn*1000)
                        localStorage.setItem('token', data.token)
                        localStorage.setItem('user', data.user)
                        localStorage.setItem('experationDate', experationDate)
                        this.authSuccess(data.token)
                        this.authLogout(experationDate - new Date())
                        this.routerHistory.push('/overwiew')
                    }
                })
                .catch(e => {
                    window.M.toast({ html: e.message})
                })
            }
        }catch(e){
            console.log('authError', e)
        }
    }

    @action('authSuccess')
    authSuccess(token) {
        this.token = token
        this.isAuthenticated = !!token
    }
    
    @action('authLogout')
    authLogout(time) {
        setTimeout(()=> {
            this.logout()   
        }, time)
    }

    @action('logout')
    logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('experationDate')
        console.log(this.routerHistory)
        if(this.routerHistory && Object(this.routerHistory).length > 0){
             this.routerHistory.push('/')
        }
    }

    @action('autoLogout')
    autoLogin() {
        const token = localStorage.getItem('token')
        if(!token) {
            this.logout()
        }else{
            const experationDate = new Date(localStorage.getItem('experationDate'))

            if(experationDate<=new Date()){
                this.logout()
            }else{
                this.authSuccess(token)
                this.authLogout(experationDate.getTime() - new Date().getTime())
            }
        }
    }    
}

const authStore = new AuthStore()

export default authStore

export {AuthStore}


