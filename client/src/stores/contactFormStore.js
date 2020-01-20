import {observable, computed, action} from 'mobx'

class ContactFormStore{
    @observable modalFieldsForm = null   
    @observable formFields = []
    @observable editFieldsFlag = false
    @observable formField = {};

    @observable forms = [
        {
            formId: 23123132132, 
            formUrl: '#',
            formUrlSite: '#',
            formName: 'Форма обратной связи', 
            formImages: 'contact_mail',
            formTitle: 'Обратная связь', 
            formDescription: 'Форма обратной связи для моего лендинга',
            fromStyles: '',
            formFields: [
                {
                    fields: 'input',
                    label: 'Введите имя',
                    placeholder: 'Введите сообщение',
                    type: 'text',
                    title: 'Имя',
                    name: 'name',
                    hidden: false
                },
                {
                    fields: 'input',
                    label: 'Введите номер телефона',
                    placeholder: 'Введите номер',
                    type: 'number',
                    name: 'phone', 
                    hidden: false
                },
                {   
                    fields: 'input',
                    label: 'Введите сообщение',
                    placeholder: 'Введите сообщение',
                    type: 'number',
                    title: 'Сообщение',
                    name: 'phone', 
                    hidden: false
                },
                {
                    fields: 'button',
                    type: 'submit',
                    title: 'Отправить'
                }
            ]
        }
    ]

    @action modalInit(elem, options = null) {
         if(elem){
               this.modalFieldsForm = window.M.Modal.init(elem, options);
         }
     }
 
     @action modalClose() {
        this.modalFieldsForm.close();
     }
 
     @action modalOpen() {
        this.modalFieldsForm.open();
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

    @action removeFormField(key) {
        this.formFields = this.formFields.filter(item => item.fieldKey !== key.trim())
        window.M.toast({html: 'Удалено одно поле'})
    }

    @action editFormFields(key) {
        this.formField = this.formFields.find(item => item.fieldKey === key.trim())
    }

    @action addFormField(field) {
        this.formFields.push(field)
        window.M.toast({html: 'Добавлено новое поле'})
    }

    @action clearFormField() {
        this.formField = {}
    }
}

const contactFormStore = new ContactFormStore()

export default contactFormStore

export {ContactFormStore}
