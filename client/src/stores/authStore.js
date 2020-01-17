import {observable, action, configure, computed} from 'mobx'

 configure({ enforceActions: "observed" })


class AuthStore{
    @observable isAuthenticated = false
    @observable token = null
    @observable user = {}
    @observable routerHistory={}

    @computed get isToken() {
        return this.token
    }

    @computed get User() {
        return this.user
    }

    @computed get IsAuthenticated() {
        return this.isAuthenticated
    }

    set setToken(token){
        this.token = token
    }

    set setUser(user){
        this.user = user
    }
    
    set setIsAuthenticated(isAuthenticated) {
        this.isAuthenticated = isAuthenticated
    }
 
    set setHistory(routerHistory) {
        return this.routerHistory = routerHistory 
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
                        this.authSuccess(data.token, data.user)
                        this.authLogout(experationDate - new Date())
                        this.routerHistory.push('/crm')
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
    authSuccess(token, user) {
        this.setToken = token
        this.setIsAuthenticated = !!token
        this.setUser = user
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
        localStorage.removeItem('user')
        localStorage.removeItem('experationDate')
        this.setToken = null
        this.setIsAuthenticated = false
        this.setUser = null
    }

    @action('autoLogin')
    autoLogin() {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')

        if(!token && !user) {
            this.logout()
        }else{
            const experationDate = new Date(localStorage.getItem('experationDate'))

            if(experationDate<=new Date()){
                this.logout()
            }else{
                this.authSuccess(token, user)
                this.authLogout(experationDate.getTime() - new Date().getTime())
            }
        }
    }    
}

const authStore = new AuthStore()

// autorun(() => {
//     console.log(authStore.isAuthenticated);
// });

export default authStore

export {AuthStore}


