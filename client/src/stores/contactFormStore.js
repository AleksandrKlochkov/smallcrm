import {observable, computed, action, toJS} from 'mobx'
import modalStore from './modalStore'
import authStore from './authStore'

class ContactFormStore{
    @observable loading = false
    @observable forms = []
    @observable itemForm = {}
    @observable formHtmlCode = ''
    @observable location = {}
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

    @computed get FormHtmlCode() {
        return this.formHtmlCode
    }

    @action setFormHtmlCode(elemForm,formGenerateElem){
        if(this.itemForm.formFields.length !== 0){
            const domen = window.location.origin 
            const url = `${domen}/forms/view/${this.itemForm._id}`
            const code = `<iframe style="width:100%;max-width:600px;min-height:${formGenerateElem.clientHeight}px;overflow:auto;border-radius:5px;border: 1px solid rgb(154, 154, 154);" marginwidth="0" marginheight="0" frameborder="0" src="${url}">Ваш браузер не поддерживает плавающие фреймы!</iframe>`
            this.formHtmlCode = code
            modalStore.setModalElement(elemForm)
        }else{
            alert('Код формы не доступен. Добавьте поля в форму!')
        }
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

    @action setLocation(props){
        this.location = props
    }

    @action setFieldForm(fieldKey, modalElem) {

        this.fieldForm = this.itemForm.formFields.find(item => item.fieldKey === fieldKey)
        const select = document.querySelector('[name="fieldType"]')
        if(select){
            select.value = this.fieldForm.fieldType
            const ev2 = new Event('change', { bubbles: true});
            select.dispatchEvent(ev2);
        }
        modalStore.setModalElement(modalElem)
    }

    @action clearFieldForm() {
        this.fieldForm = {}
    }

    @action clearFormFields() {
        this.itemForm.formFields = []
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
                fieldKey: this.FieldForm.fieldKey ,
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
            const fieldKey = `${formData.get('fieldType')}${Math.random().toString().replace(/[.]/g, "")}`
            let fieldSelectValues = null
            if(formData.get('fieldSelectValues')){
                fieldSelectValues = formData.get('fieldSelectValues').split(',')
                formData.set('fieldSelectValues', fieldSelectValues)
            }else{
                formData.set('fieldSelectValues', [])
            }
            formData.set('fieldHidden', formData.get('fieldType') === 'hidden' ? true : false)
           
            const field = {
                fieldKey: fieldKey,
                fieldLabel: formData.get('fieldTitle'),
                fieldPlaceholder: formData.get('fieldPlaceholder'),
                fieldType: formData.get('fieldType'),
                fieldValue: formData.get('fieldValue'),
                fieldTitle: formData.get('fieldTitle'),
                fieldSelectValues:  fieldSelectValues ? fieldSelectValues : [],
                fieldHidden: formData.get('fieldType') === 'hidden' ? true : false
            }
            this.addingFormField(field)
        }
        event.target.reset();
        window.M.updateTextFields()
    }

    @action addingFormField(field) {
        this.itemForm.formFields.push(field)
        window.M.toast({html: `Добавлено новое поле ${toJS(field.fieldTitle)}`})
    }

    @action removeFormField(fieldKey) {
        const field = this.itemForm.formFields.filter(item => item.fieldKey === fieldKey)
        const result = window.confirm(`Удалить поле ${toJS(field[0].fieldTitle)}?`)
        if(result){
            this.itemForm.formFields = this.itemForm.formFields.filter(item => item.fieldKey !== fieldKey)
            window.M.toast({html: `Удалено поле ${toJS(field[0].fieldTitle)}`})
        }
    }

    @action removeFormFields() {
        const result = window.confirm('Удалить все поля формы?')
        if(result){
            this.itemForm.formFields = []
        }
    }

    @action editingFormField(field){
        const index = this.itemForm.formFields.findIndex(i => i.fieldKey === field.fieldKey)
        this.itemForm.formFields[index] = field
        window.M.toast({html: `Отредактированно поле  ${toJS(field.fieldTitle)}`})
    }


    @action async submitSaveForm(event, save = true) {
        event.preventDefault()
        const elemForm = event.target
        const formData = new FormData(elemForm)
        this.elementForm = elemForm

        if(save){
            if(this.itemForm.formFields.length !== 0){
                formData.append('formFields', JSON.stringify(toJS(this.ItemForm.formFields)))
                const data = await this.httpRequest(`/api/contact/${this.itemForm._id}`, 'PATCH', formData, {'Authorization': `${authStore.isToken}`}, true)
                if(data.message){
                    window.M.toast({ html:`${data.message}`})
                }else{
                    this.setItemForm(data)
                    this.setTitleForm(data.formTitle)
                    const title = document.querySelector('[name="formTitle"]')
                    if(title){
                        title.value = data.formTitle
                    }
                    if(data.imageSrc){
                        this.setImagesData('/'+data.imageSrc)
                    }
                    this.setSendingMessage(data.formSuccessMessages)

                    window.M.toast({ html:`Изменения формы сохранены`})
                }
            }else{
                alert('Изменения не сохранены. Добавьте поля в форму')
            }
        }else{
            if(formData.get('autoGenerationFields') && formData.get('autoGenerationFields') === 'on'){
                const fieldsForm = [
                    {   
                        fieldKey: `text${Math.random().toString().replace(/[.]/g, "")}`,
                        fieldPosition: 1,                                                                                               
                        fieldLabel: 'Имя',
                        fieldType: 'text',
                        fieldPlaceholder: 'Введите имя',
                        fieldValue: '',
                        fieldTitle: 'Имя отправителя',
                        fieldSelectValues: [],
                        fieldHidden: false
                    },
                    {          
                        fieldKey: `email${Math.random().toString().replace(/[.]/g, "")}`,           
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
                        fieldKey: `select${Math.random().toString().replace(/[.]/g, "")}`,    
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
                        fieldKey: `textarea${Math.random().toString().replace(/[.]/g, "")}`,  
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
                formData.set('formMethod', 'post')
                formData.set('formFields', JSON.stringify(fieldsForm))
                formData.set('formSuccessMessages', 'Спасибо, Ваше сообщение успешно отправлено')
            } else {
                formData.set('formFields', JSON.stringify([]))
                formData.set('formMethod', 'post')
                formData.set('formSuccessMessages', 'Спасибо, Ваше сообщение успешно отправлено')
            }

            const data = await this.httpRequest(`/api/contact/`, 'POST', formData, {'Authorization': `${authStore.isToken}`}, false)
            if(data.message){
                window.M.toast({ html:`${data.message}`})
            }else{
                this.addForms(data)
                this.clearFormElement()
                modalStore.modalClose()
            }
   
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

    @action async removeForm() {
        const result = window.confirm('Вы уверены что хотите удалить форму?')
        if(result){
            const data = await this.httpRequest(`/api/contact/${this.itemForm._id}`,'DELETE',null,{'Authorization': `${authStore.isToken}`})
            if(data.message){
                const forms = this.forms.filter(i=>i._id !== this.itemForm._id)
                this.setForms(forms)
                window.M.toast({ html:`${data.message}`})
            }
            this.clearFormElement()
            this.location.history.push('/contacts/contact_form')
        }
    }

    @action async fetchItemForms(id) {
        const data = await this.httpRequest(`/api/contact/${id}`, 'GET', null, {'Content-type':'application/json','Authorization': `${authStore.isToken}`})
        if(data.message){
            window.M.toast({ html:`${data.message}`})
        }else{
                this.setItemForm(data)
                this.setTitleForm(data.formTitle)
                if(data.imageSrc){
                    this.setImagesData('/'+data.imageSrc)
                }
                this.setSendingMessage(data.formSuccessMessages)
        }
    }

    @action httpRequest = async (url, method = 'GET', body = null, headers = {}, loading=true) => {
        if(loading) {this.setLoading(true)} 
        try {
          if (body) {
            //body = JSON.stringify(body)
            //headers['Content-Type'] = 'application/json'
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

    @action clearFormElement(){
        // this.setImagesData(null)
        // this.clearFieldForm()
        // this.setItemForm(null)
        // this.elementForm.reset()
        // this.setFieldTypeKey(null)
        window.M.updateTextFields()
    }
}

const contactFormStore = new ContactFormStore()

export default contactFormStore

export {ContactFormStore}
