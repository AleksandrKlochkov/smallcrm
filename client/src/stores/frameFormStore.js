import {observable, computed, action, toJS} from 'mobx'
import authStore from './authStore'

class FrameFormStore{
    @observable loading = false
    @observable form = {}

    @computed get Form() {
        return this.form
    }

    @action setForm(form) {
        this.form = form
    }

    @computed get Loading() {
        return this.loading
    }

    @action setLoading(flag) {
        this.loading = flag
    }


    @action uploadsFiles = (event) => {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
           const imagesData = reader.result
        }
        reader.readAsDataURL(file)
    }

    @action async submitSaveForm(event) {
        event.preventDefault()
        const elemForm = event.target
        const formData = new FormData(elemForm)
        const data = await this.httpRequest(`/api/contact/`, 'POST', formData, {'Authorization': `${authStore.isToken}`}, false)
        if(data.message){
            window.M.toast({ html:`${data.message}`})
        }else{
            console.log('DATA')
            elemForm.reset();
        }
    }

    @action async fetchForm(id) {
        const data = await this.httpRequest(`/api/contact/${id}`, 'GET', null, {'Content-type':'application/json','Authorization': `${authStore.isToken}`})
        if(data.message){
            window.M.toast({ html:`${data.message}`})
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
           throw new Error(data.message || 'Что-то пошло не так')
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

const frameFormStore = new FrameFormStore()

export default frameFormStore

export {FrameFormStore}
