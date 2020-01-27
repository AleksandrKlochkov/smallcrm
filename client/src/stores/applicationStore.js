import {observable, computed, action, toJS} from 'mobx'

class ApplicationStore{
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

    // @action uploadsFiles = (event) => {
    //     const file = event.target.files[0]
    //     const reader = new FileReader()
    //     reader.onload = () => {
    //        const imagesData = reader.result
    //     }
    //     reader.readAsDataURL(file)
    // }

    @action async submitSendForm(event) {
        event.preventDefault()
        const elemForm = event.target
        const formData = new FormData(elemForm)
        const fields = event.target.querySelectorAll('[name]')
        // console.log(toJS(this.Form))
        const formFields = []
        // let images = ''
        fields.forEach(item => {
            // if(item.files && item.files.length !== 0 ){
            //     console.log(item)
            //     images =item.files[0]
            // }else{
                const field = this.Form.formFields.find(i=>i._id === item.name) 
                formFields.push({ name: field.fieldLabel, value: item.value || ''})
            // }
            
        })
        // if(images && Object.keys(images).length !==0 ){
        // formData.append('formImages', images)
        // }
        formData.set('formName', this.Form.formName)
        formData.set('formId', this.Form._id)
        formData.set('formFields', JSON.stringify(formFields))
        const data = await this.httpRequest(`/api/application`, 'POST', formData,{}, true)
        if(data.message){
            window.M.toast({ html:`${data.message}`})
        }
        elemForm.reset();
    }

    @action async fetchForm(id) {
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
