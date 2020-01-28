import {observable, computed, action, toJS} from 'mobx'
import authStore from './authStore'

class ApplicationStore{
    @observable loading = false
    @observable applications = []
    @observable application = {}

    @computed get Applications() {
        return this.applications
    }

    @action setApplications(applications) {
        this.applications = applications
    }


    @action editApplications(application, id) {
        const idx = this.applications.findIndex(i=>i._id === id)
        this.application[idx] = application
    }

    @computed get Application() {
        return this.application
    }

    @action setApplication(application) {
        this.application = application
    }

    

    @computed get Loading() {
        return this.loading
    }

    @action setLoading(flag) {
        this.loading = flag
    }

    @action async submitSaveForm(event) {
        event.preventDefault()
        const elemForm = event.target
        const formData = new FormData(elemForm)
        formData.set('formStatus', this.Application.formStatus)
        console.log(formData.get('formStatus'))
        const data = await this.httpRequest(`/api/application/${this.Application._id}`, 'PATCH', formData,{'Authorization': `${authStore.isToken}`}, false)
        if(data.message){
            window.M.toast({ html:`${data.message}`})
        }else{
            console.log(data)

            this.setApplication(data)
            this.editApplications(data, this.Application._id)
        }
    }

    @action async fetchApplications() {
        const data = await this.httpRequest(`/api/application`, 'GET', null, {'Authorization': `${authStore.isToken}`}, true)
        if(data.message){
            window.M.toast({ html:`${data.message}`})
        }else{
            this.setApplications(data)
        }
    }

    @action async fetchApplicationById(id) {
        const data = await this.httpRequest(`/api/application/${id}`, 'GET', null, {'Authorization': `${authStore.isToken}`}, false)
        if(data.message){
            window.M.toast({ html:`${data.message}`})
        }else{
            this.setApplication(data)
        }
    }

    @action httpRequest = async (url, method = 'GET', body = null, headers = {}, loading=true) => {
        if(loading) {this.setLoading(true)} 
        try {
          if (body) {
             headers['Accept'] = 'application/json'
          }
          const response = await fetch(url, {method, body, headers})
          const data = await response.json()
          if (!response.ok) {
          // throw new Error(data.message || 'Что-то пошло не так')
          }
          if(loading) {this.setLoading(false)}
          return data
        } catch (e) {
          if(loading) {this.setLoading(false)}
          window.M.toast({ html:`Что то пошло не так`})
          throw e
        }
      }
}

const applicationStore = new ApplicationStore()

export default applicationStore

export {ApplicationStore}
