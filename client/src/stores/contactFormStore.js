import {observable, computed, action, toJS} from 'mobx'

class ContactFormStore{
    @observable formFields = []
    @observable editFieldsFlag = false
    @observable formField = {};
    @observable imagesData = null
    @observable imageUpload = null
    @observable forms = []

    @computed get ImagesData() {
        return this.imagesData 
    }

    @computed get ImagesUpload() {
        return this.imageUpload
    }

    @computed get FormField() {
        return this.formField
    }
  
    @computed get Forms() {
        return this.forms
    }

    @computed get FieldsForms() {
        return this.formFields
    }

  

    @action setImagesData(imagesData) {
        this.imagesData = imagesData
    }

    @action setImageUpload(imageUpload) {
        this.imageUpload = imageUpload
    }

    @action removeFormField(key) {
        const field = this.formFields.filter(item => item.fieldKey === key.trim())
        this.formFields = this.formFields.filter(item => item.fieldKey !== key.trim())
        window.M.toast({html: `Удалено поле ${toJS(field[0].fieldTitle)}`})
    }

    @action editingFormField(field){
        const index = this.formFields.findIndex(i => i.fieldKey === field.fieldKey)
        this.formFields[index] = field
        window.M.toast({html: `Отредактированно поле  ${toJS(field.fieldTitle)}`})
    }

    @action addFormField(field) {
        this.formFields.push(field)
        window.M.toast({html: `Добавлено новое поле ${toJS(field.fieldTitle)}`})
    }

    @action editFormFields(key) {
        this.formField = this.formFields.find(item => item.fieldKey === key.trim())
    }

    @action clearFormField() {
        this.formField = {}
    }

    @action async сreateForm(form) {
        try{

        }catch(e){
            console.log(e.message)
        }
    }
}

const contactFormStore = new ContactFormStore()

export default contactFormStore

export {ContactFormStore}
