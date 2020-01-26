import {observable, computed, action, toJS} from 'mobx'
import modalStore from './modalStore';
import authStore from './authStore'

class ContactFormStore{
    @observable loading = false
    @observable forms = []
    @observable itemForm = {}
    @observable fieldsForm = []
    @observable fieldForm = {}
    @observable titleForm = 'Оставьте отзыв'
    @observable sendingMessage = 'Спасибо, Ваше сообщение успешно отправлено'
    @observable imagesData = null
    @observable elementForm = null
    @observable fieldTypeKey = null
    @observable fieldsType = {
                                text: 'text',
                                select: 'select',
                                textarea: 'textarea',
                                number: 'number',
                                checkbox: 'checkbox',
                                file: 'file',
                                hidden: 'hidden',
                                password: 'password'
                            }
    

    
    @computed get Loading() {
        return this.loading
    }
    @computed get Forms() {
        return this.forms
    }

    @computed get ItemForm() {
        return this.itemForm
    }

    @computed get FieldsForm() {
        return this.fieldsForm 
    }

    @computed get FieldForm() {
        return this.fieldForm
    }

    @computed get TitleForm() {
        return this.titleForm
    }

    @computed get SendingMessage() {
        return this.sendingMessage
    }

    @computed get ImagesData() {
        return this.imagesData 
    }

    @computed get FieldTypeKey() {
        return this.fieldTypeKey
    }

    @action setItemForm(form) {
        this.itemForm = form
    }

    @action setLoading(flag) {
        this.loading = flag
    }

    @action setForms(forms) {
        this.forms = forms
    }

    @action setTitleForm(titleForm) {
        this.titleForm = titleForm
    }

    @action setImagesData(imagesData) {
        this.imagesData = imagesData
    }

    @action setSendingMessage(message) {
        this.sendingMessage = message
    }

    @action setFieldTypeKey(key) {
        this.fieldTypeKey = key
    }

    @action addForms(form) {
        this.forms.push(form)
        window.M.toast({html: `Форма ${toJS(form.formTitle)} создана`})
    }

    @action setFieldsForm(fields) {
        this.fieldsForm = fields
    }

    @action async addFieldForm(field) {
        const formIdx = this.forms.findIndex(f=>f._id === this.ItemForm._id)
        this.forms[formIdx].formFields.push(field)

        const data = await this.httpRequest(`/api/contact/${this.ItemForm._id}`,'PATH',toJS(this.ItemForm),{'Authorization': `${authStore.isToken}`}, false)
        if(data.message) {
            window.M.toast({html: data.message})
        }else {
            console.log(data)
        }
        this.itemForm.formFields.push(field)
        window.M.toast({html: `Добавлено новое поле ${toJS(field.fieldTitle)}`})
    }

    @action removeFieldForm(id) {
        const field = this.fieldsForm.filter(item => item._id === id)
        this.fieldsForm = this.fieldsForm.filter(item => item._id !== id)
        window.M.toast({html: `Удалено поле ${toJS(field[0].fieldTitle)}`})
    }

    @action editingFormField(field){
        const index = this.fieldsForm.findIndex(i => i._id === field._id)
        this.fieldsForm[index] = field
        window.M.toast({html: `Отредактированно поле  ${toJS(field.fieldTitle)}`})
    }

    @action setFieldForm(id) {
        this.fieldForm = contactFormStore.fieldsForm.find(item => item._id === id)
        modalStore.modalOpen()
    }

    @action clearFieldForm() {
        this.fieldForm = {}
    }

    @action clearFieldsForm() {
        this.fieldsForm = []
    }

    @action uploadsFiles = (event) => {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
           const imagesData = reader.result
           contactFormStore.setImagesData(imagesData)
        }
        reader.readAsDataURL(file)
    }

    @action submitSaveFields(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        if(this.FieldForm && Object.keys(this.FieldForm).length !== 0) {
            let fieldSelectValues = null
            if(formData.get('fieldSelectValues')){
                fieldSelectValues = formData.get('fieldSelectValues').split(',')
            }
            const field = {
                fieldLabel: formData.get('fieldTitle'),
                fieldPlaceholder: formData.get('fieldPlaceholder'),
                fieldType: formData.get('fieldType'),
                fieldValue: formData.get('fieldValue'),
                fieldTitle: formData.get('fieldTitle'),
                fieldSelectValues: fieldSelectValues ? fieldSelectValues : [],
                fieldHidden: formData.get('fieldType') === 'hidden' ? true : false
            }
            this.editingFormField(field)
            modalStore.modalClose()
        }else{
            // const fieldKey = `${formData.get('fieldType')}${Math.random().toString().replace(/[.]/g, "")}`
            let fieldSelectValues = null
            if(formData.get('fieldSelectValues')){
                fieldSelectValues = formData.get('fieldSelectValues').split(',')
                formData.set('fieldSelectValues', fieldSelectValues)
            }else{
                formData.set('fieldSelectValues', [])
            }
            formData.set('fieldHidden', formData.get('fieldType') === 'hidden' ? true : false)
           
            const field = {
                fieldLabel: formData.get('fieldTitle'),
                fieldPlaceholder: formData.get('fieldPlaceholder'),
                fieldType: formData.get('fieldType'),
                fieldValue: formData.get('fieldValue'),
                fieldTitle: formData.get('fieldTitle'),
                fieldSelectValues:  fieldSelectValues ? fieldSelectValues : [],
                fieldHidden: formData.get('fieldType') === 'hidden' ? true : false
            }
            this.addFieldForm(field)
        }
    
        event.target.reset();
        window.M.updateTextFields()
    }

    
    @action async submitSaveForm(event, save = true) {
        event.preventDefault()
        const elemForm = event.target
        const formData = new FormData(elemForm)
        this.elementForm = elemForm

        if(save){
            formData.append('formFields', JSON.stringify(toJS(this.FieldsForm)))
        }else{
            if(formData.get('autoGenerationFields') && formData.get('autoGenerationFields') === 'on'){
                const fieldsForm = [
                    {     
                        fieldPosition: 1,                                                                                               
                        fieldLabel: 'Имя',
                        fieldType: 'text',
                        fieldPlaceholder: 'Введите имя',
                        fieldValue: '',
                        fieldTitle: 'Имя отправителя',
                        fieldSelectValues: JSON.stringify([]),
                        fieldHidden: false
                    },
                    {                     
                        fieldPosition: 2,                                                                                      
                        fieldLabel: 'Email',
                        fieldType: 'email',
                        fieldPlaceholder: 'Введите email',
                        fieldValue: '',
                        fieldTitle: 'Email отправителя',
                        fieldSelectValues: [],
                        fieldHidden: false
                    },
                    {           
                        fieldPosition: 3,                                                                                                    
                        fieldLabel: 'Тип заявки',
                        fieldType: 'select',
                        fieldPlaceholder: 'Выберите тип заявки',
                        fieldValue: '',
                        fieldTitle: 'Тип заявки',
                        fieldSelectValues: ['Пожелание','Ошибка'],
                        fieldHidden: false
                    },
                    {
                        fieldPosition: 4,   
                        fieldLabel: 'Сообщение',
                        fieldType: 'textarea',
                        fieldPlaceholder: 'Введите сообщение',
                        fieldValue: '',
                        fieldTitle: 'Сообщение отправителя',
                        fieldSelectValues: [],
                        fieldHidden: false
                    }
                ]
                formData.append('formFields', JSON.stringify(fieldsForm))
            } else {
                formData.append('formFields', JSON.stringify([]))
            }
            modalStore.modalClose()
        }

        const data = await this.httpRequest(`/api/contact`,'POST',formData,{'Authorization': `${authStore.isToken}`})
        if(data.message){
            window.M.toast({ html:`${data.message}`})
        }else{
            this.addForms(data)
            this.clearFormElement()
        }
    }

    @action async fetchForms() {
        const data = await this.httpRequest(`/api/contact`,'GET',null,{'Authorization': `${authStore.isToken}`})
        if(data.message){
            window.M.toast({ html:`${data.message}`})
        }else{
            this.setForms(data)
        }
    }

    @action async fetchItemForms(id) {
        const data = await this.httpRequest(`/api/contact/${id}`,'GET',null,{'Authorization': `${authStore.isToken}`})
        if(data.message){
            window.M.toast({ html:`${data.message}`})
        }else{
            this.setItemForm(data)
            if(data.formFields){
                this.setFieldsForm(data.formFields)
            }
            if(data.imageSrc){
                this.setImagesData('/'+data.imageSrc)
            }
        }
    }

    @action httpRequest = async (url, method = 'GET', body = null, headers = {}, loading=true) => {
        console.log(body)
        if(loading) {this.setLoading(true)} 
        try {
          if (body) {
            body = JSON.stringify(body)
            headers['Content-Type'] = 'application/json'
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

    @action clearFormElement(){
        this.setImagesData(null)
        this.clearFieldsForm()
        this.clearFieldForm()
        this.elementForm.reset()
        this.setFieldTypeKey(null)
        window.M.updateTextFields()
    }
}

const contactFormStore = new ContactFormStore()

export default contactFormStore

export {ContactFormStore}
