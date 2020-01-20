import React, { Component } from 'react'
import {toJS } from 'mobx'
import { inject, observer} from 'mobx-react'
import {Link, withRouter, Switch, Route} from 'react-router-dom'
import Card from '../../components/Card/Card'
import FormCreate from '../../components/FormCreate/FormCreate'
import CreateFieldsForm from '../../components/CreateFieldsForm/CreateFieldsForm'

@inject('contactFormStore','modalStore')
@observer class ContactsForm extends Component {
    constructor(props) {
        super(props)
        this.modalRef = React.createRef()
        this.selectRef4 = React.createRef()
    }

    uploadsFiles = (event) => {
        const {contactFormStore} =  this.props
        const file = event.target.files[0]
        const reader = new FileReader()
        contactFormStore.setImageUpload(file)
        reader.onload = () => {
           const imagesData = reader.result
           contactFormStore.setImagesData(imagesData)
        }
        reader.readAsDataURL(file)
    }

    submitHandlerSave(event) {
        event.preventDefault()
        const {contactFormStore} = this.props
        const formData = new FormData(event.target)

        const form = {
            // formId: Math.random(), 
            // formAction: '#',
            formUrl: formData.get('formUrlSite'),
            formMethod: formData.get('formMethod'),
            formUrlSite: formData.get('formUrlSite'),
            formName: formData.get('formName'), 
            formImage: formData.get('formImages'),
            formTitle: formData.get('formTitle'), 
            formDescription: formData.get('formDescription'),
            formFields: toJS(contactFormStore.FieldsForms)
        }
        console.log(form)
    }

    submitHandler(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const {contactFormStore, modalStore} = this.props
        const formField = toJS(contactFormStore.FormField)
        if(formField && Object.keys(formField).length !== 0) {
            const field = {
                fieldSelection: formData.get('fieldSelection'),
                fieldKey: formField.fieldKey,
                fieldLabel: formData.get('fieldTitle'),
                fieldPlaceholder: formData.get('fieldPlaceholder'),
                fieldType: formData.get('fieldType'),
                fieldTitle: formData.get('fieldTitle'),
                fieldName: formData.get('fieldName'),
                fieldHidden: formData.get('fieldHidden')
            }
            contactFormStore.editingFormField(field)
            contactFormStore.clearFormField()
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
            contactFormStore.addFormField(field)
        }
        event.target.reset();
        window.M.updateTextFields();
    }

    removeField(key) {
        const {contactFormStore} = this.props
        contactFormStore.removeFormField(key) 
    }

    editField(key) {
        const {contactFormStore, modalStore} = this.props
        contactFormStore.editFormFields(key)
        modalStore.modalOpen()
    }

    closeModal(e) {
        e.stopPropagation()
        const close = e.target.classList.contains('modal_win_close')
        if(close){
            const {contactFormStore, modalStore} = this.props
            contactFormStore.clearFormField()
            if(this.modalRef.current){
                this.modalRef.current.querySelector('form').reset()
            }
            modalStore.modalClose()
        }
    }

    renderCardForms(forms) {
         if(forms && forms.length !==0 ){
             return forms.map((item,index) => {
                return (
                    <Card
                        key={`${index}_${Math.random()}`} 
                        icon={item.formImages} 
                        title={item.formName} 
                        description={item.formDescription}
                        link={`/contacts/contact_form/${item.formId}`}
                    />
                )
             })
         }
        return "Нет созданных форм, добавьте новую форму."
    }

    componentDidMount() {
        window.M.updateTextFields()
        window.M.FormSelect.init(this.selectRef4.current)
        if(this.modalRef.current){
            this.modalRef.current.querySelector('form').reset()
            setTimeout(()=>{this.props.modalStore.setFormRef(this.modalRef.current.querySelector('form'))},100)
        }
    }

    render() {
        const {contactFormStore, modalStore, history} = this.props
        const fieldsForm = toJS(contactFormStore.FieldsForms)
        return (
            <div className="contact-form-pages">
                 { history.location.search === "" ?
                    <div className="contact-form-btn">
                        <Link to="/contacts/contact_form/add_form?action=add">
                            <button className="waves-effect waves-light btn grey darken-1">Добавить форму</button>
                        </Link>
                    </div> : null
                 }
                <div className="contact-form">
                    <Switch>
                        <Route exact path="/contacts/contact_form/">
                            <div className="row">
                                {this.renderCardForms(toJS(contactFormStore.Forms))}
                            </div>
                        </Route>
                        <Route path="/contacts/contact_form/add_form">
                            <FormCreate 
                                formFields={fieldsForm}
                                removeField={this.removeField.bind(this)}
                                editField={this.editField.bind(this)}
                                submitHandlerSave={this.submitHandlerSave.bind(this)}
                            />
                        </Route>
                    </Switch>     
            </div>
            {modalStore.ShowModal ?
                <CreateFieldsForm
                    id={'modal1'}
                    modalRef={this.modalRef}
                    submitHandler={this.submitHandler.bind(this)}
                    closeModal={this.closeModal.bind(this)}
                />   
                : null
            }     
        </div>
        )
    }
}

export default withRouter(ContactsForm)
