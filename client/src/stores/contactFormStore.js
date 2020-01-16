import {observable, computed} from 'mobx'

class ContactFormStore{
    @observable modal = null;
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

    modalInit(elem, options = null) {
        if(elem){
              this.modal = window.M.Modal.init(elem, options);
        }
     }

    @computed get arrForms() {
        return this.forms
    }
    
}

const contactFromStore = new ContactFormStore()

export default contactFromStore

export {ContactFormStore}
