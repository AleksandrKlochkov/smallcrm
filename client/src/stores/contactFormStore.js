import {observable, computed, action, toJS} from 'mobx'
import modalStore from './modalStore';

class ContactFormStore{
    @observable forms = []
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
    


    @computed get Forms() {
        return this.forms
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

    @action addFieldForm(field) {
        this.fieldsForm.push(field)
        window.M.toast({html: `Добавлено новое поле ${toJS(field.fieldTitle)}`})
    }

    @action removeFieldForm(key) {
        const field = this.fieldsForm.filter(item => item.fieldKey === key.trim())
        this.fieldsForm = this.fieldsForm.filter(item => item.fieldKey !== key.trim())
        window.M.toast({html: `Удалено поле ${toJS(field[0].fieldTitle)}`})
    }

    @action editingFormField(field){
        const index = this.fieldsForm.findIndex(i => i.fieldKey === field.fieldKey)
        this.fieldsForm[index] = field
        window.M.toast({html: `Отредактированно поле  ${toJS(field.fieldTitle)}`})
    }

    @action setFieldForm(key) {
        this.fieldForm = contactFormStore.fieldsForm.find(item => item.fieldKey === key.trim())
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
            const field = {
                fieldKey: this.FieldForm.fieldKey,
                fieldLabel: formData.get('fieldTitle'),
                fieldPlaceholder: formData.get('fieldPlaceholder'),
                fieldType: formData.get('fieldType'),
                fieldValue: formData.get('fieldValue'),
                fieldTitle: formData.get('fieldTitle'),
                fieldSelectValues: formData.get('fieldSelectValues').split(',') || [],
                fieldName: formData.get('fieldName'),
                fieldHidden: formData.get('fieldHidden')
            }
            this.editingFormField(field)
            modalStore.modalClose()
        }else{
            const fieldKey = `${formData.get('fieldType')}${Math.random().toString().replace(/[.]/g, "")}`
            const field = {
                fieldKey: fieldKey.trim(),
                fieldLabel: formData.get('fieldTitle'),
                fieldPlaceholder: formData.get('fieldPlaceholder'),
                fieldType: formData.get('fieldType'),
                fieldValue: formData.get('fieldValue'),
                fieldTitle: formData.get('fieldTitle'),
                fieldSelectValues:  formData.get('fieldSelectValues').split(',') || [],
                fieldName: formData.get('fieldName'),
                fieldHidden: formData.get('fieldHidden')
            }
            console.log(field)
            this.addFieldForm(field)
        }
    
        event.target.reset();
        window.M.updateTextFields()
    }

    
    @action async submitSaveForm(event, save = true) {
        event.preventDefault()
        const elemForm = event.target
        const formData = new FormData(elemForm)
        const fieldKey = `${formData.get('fieldType')}${Math.random().toString().replace(/[.]/g, "")}`
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
                        fieldName: fieldKey,
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
                        fieldName: fieldKey,
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
                        fieldName: fieldKey,
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
                        fieldName: fieldKey,
                        fieldHidden: false
                    }
                ]
                formData.append('formFields', JSON.stringify(fieldsForm))
            } else {
                formData.append('formFields', JSON.stringify([]))
            }
            modalStore.modalClose()
        }

        const token = localStorage.getItem('token')
        try{
            await fetch('/api/contact',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `${token}`
                },
                body: formData
            })
            .then(response => {
                return response.json()
            })
            .then(data=>{
                if(data.message){
                    window.M.toast({ html:`${data.message}`})
                }else{
                    this.addForms(data)
                    this.clearFormElement()
                }
            })
            .catch(e => {
                console.log(e.message)
                window.M.toast({ html:`Что то пошло не так`})
            })
        }catch(e){
            console.log(e.message)
            window.M.toast({ html:`Что то пошло не так`})
        }
    }

    @action async fetchForms() {
        const token = localStorage.getItem('token')  
        try{
            await fetch('/api/contact',{
                method: 'GET',
                headers: {
                    'Authorization': `${token}`
                }
            })
            .then(response => {
                return response.json()
            })
            .then(data=>{
                if(data.message){
                    window.M.toast({ html:`${data.message}`})
                }else{
                    this.setForms(data)
                }
            })
            .catch(e => {
                console.log(e.message)
                window.M.toast({ html:`Что то пошло не так`})
            })
        }catch(e){
            console.log(e.message)
            window.M.toast({ html:`Что то пошло не так`})
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
