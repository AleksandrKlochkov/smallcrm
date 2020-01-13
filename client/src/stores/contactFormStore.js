import {observable, computed} from 'mobx'

class ContactFormStore{
    @observable forms = [
        {
            formId: 23123132132, 
            formUrl: '#',
            formUrlSite: '#',
            formName: 'Форма обратной связи', 
            formImages: '#',
            formTitle: 'Обратная связь', 
            formDescription: 'Форма обратной связи для моего лендинга',
            fromStyles: '',
            formFields: {
                input: {
                    label: 'Введите имя',
                    placeholder: 'Введите сообщение',
                    type: 'text',
                    title: 'Имя',
                    name: 'name',
                    hidden: false
                },
                input: {
                    label: 'Введите номер телефона',
                    placeholder: 'Введите номер',
                    type: 'number',
                    name: 'phone', 
                    hidden: false
                },
                textarea: {
                    label: 'Введите сообщение',
                    placeholder: 'Введите сообщение',
                    type: 'number',
                    title: 'Сообщение',
                    name: 'phone', 
                    hidden: false
                },
                button: {
                    type: 'submit',
                    title: 'Отправить'
                }
            }
        }
    ]

    @computed get arrForms() {
        return this.forms
    }
    
}

const contactFromStore = new ContactFormStore()

export default contactFromStore

export {ContactFormStore}
