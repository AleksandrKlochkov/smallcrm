import {observable, computed, action, toJS} from 'mobx'
import modalStore from './modalStore';

class ContactFormStore{
    @observable forms = []
    @observable fieldsForm = []
    @observable fieldForm = {};
    @observable imagesData = null

    @computed get Forms() {
        return this.forms
    }

    @computed get FieldsForm() {
        return this.fieldsForm 
    }

    @computed get FieldForm() {
        return this.fieldForm
    }

    @computed get ImagesData() {
        return this.imagesData 
    }

    @action setImagesData(imagesData) {
        this.imagesData = imagesData
    }

    @action addForms(form) {
        this.forms.push(form)
        window.M.toast({html: `Форма ${toJS(form.fieldTitle)} создана`})
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
                    fieldSelection: formData.get('fieldSelection'),
                    fieldKey: contactFormStore.fieldForm.fieldKey,
                    fieldLabel: formData.get('fieldTitle'),
                    fieldPlaceholder: formData.get('fieldPlaceholder'),
                    fieldType: formData.get('fieldType'),
                    fieldTitle: formData.get('fieldTitle'),
                    fieldName: formData.get('fieldName'),
                    fieldHidden: formData.get('fieldHidden')
                }
                this.editingFormField(field)
                modalStore.modalClose()
            }else{
                const fieldKey = `${formData.get('fieldName')}${Math.random().toString().replace(/[.]/g, "")}`
                const field = {
                    fieldSelection: formData.get('fieldSelection'),
                    fieldKey: fieldKey.trim(),
                    fieldLabel: formData.get('fieldTitle'),
                    fieldPlaceholder: formData.get('fieldPlaceholder'),
                    fieldType: formData.get('fieldType'),
                    fieldTitle: formData.get('fieldTitle'),
                    fieldName: formData.get('fieldName'),
                    fieldHidden: formData.get('fieldHidden')
                }
                this.addFieldForm(field)
            }
        
            event.target.reset();
            window.M.updateTextFields()
    }

    
    @action submitSaveForm(event) {
        event.preventDefault()
        const elemForm = event.target
        const formData = new FormData(elemForm)
        formData.append('formFields', JSON.stringify(toJS(this.FieldsForm)))
        this.сreateForm(formData)
        this.setImagesData = null
        elemForm.reset()
        window.M.updateTextFields()
    }

    @action async сreateForm(formData) {
        const token = localStorage.getItem('token')
        console.log(token)
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
                    }
                })
                .catch(e => {
                    console.log(e)
                    window.M.toast({ html:`${e.message}`})
                })
        }catch(e){
            console.log(e.message)
        }
    }
}

const contactFormStore = new ContactFormStore()

export default contactFormStore

export {ContactFormStore}
