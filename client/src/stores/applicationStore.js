import {observable, computed, action, toJS} from 'mobx'
import authStore from './authStore'

class ApplicationStore{
    @observable loading = false
    @observable applications = []

    @computed get Applications() {
        return this.applications
    }

    @action setApplications(applications) {
        this.applications = applications
    }

    @computed get Loading() {
        return this.loading
    }

    @action setLoading(flag) {
        this.loading = flag
    }

    @action async submitSendForm(event) {
        event.preventDefault()
        // const elemForm = event.target
        // const formData = new FormData(elemForm)
        // const fields = event.target.querySelectorAll('[name]')
        // const formFields = []
        // fields.forEach(item => {
        //     const field = this.Form.formFields.find(i=>i._id === item.name) 
        //     formFields.push({ name: field.fieldLabel, value: item.value || ''})
        // })
        // formData.set('formName', this.Form.formName)
        // formData.set('formId', this.Form._id)
        // formData.set('formFields', JSON.stringify(formFields))
        // formData.set('formTypeApplication', this.Form.formTypeApplication)
        // const data = await this.httpRequest(`/api/application`, 'POST', formData,{}, true)
        // if(data.message){
        //     window.M.toast({ html:`${data.message}`})
        // }
        // elemForm.reset();
    }

    @action async fetchApplications() {
        const data = await this.httpRequest(`/api/application`, 'GET', null, {'Authorization': `${authStore.isToken}`}, false)
        if(data.message){
            window.M.toast({ html:`${data.message}`})
        }else{
            this.setApplications(data)
        }
    }

    @action async fetchApplicationById(id) {
        const data = await this.httpRequest(`/api/contact/${id}`, 'GET', null, {'Content-type':'application/json'})
        if(data.message){
            window.M.toast({ html:`${data.message}`})
            window.location.href="/NotFound"
        }else{
                this.setForm(data)
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
