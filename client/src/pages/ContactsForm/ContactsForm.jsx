import React, { Component } from 'react'
import {toJS } from 'mobx'
import { inject, observer} from 'mobx-react'
import {Link, withRouter, Switch, Route} from 'react-router-dom'
import noimages from '../../shared/images/noimages.png'
import Card from '../../components/Card/Card'
import FormCreate from '../../components/FormCreate/FormCreate'
import CreateFieldsForm from '../../components/CreateFieldsForm/CreateFieldsForm'
import modalStore from '../../stores/modalStore'


@inject('contactFormStore','modalStore')
@observer class ContactsForm extends Component {
    constructor(props) {
        super(props)
        this.modalRef = React.createRef()
        setTimeout(() => {
            this.props.contactFormStore.modalInit(this.modalRef.current)
        }, 100)
    }

    submitHandler(event) {
        event.preventDefault()
        const {contactFormStore} = this.props
        const formData = new FormData(event.target)
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
        event.target.reset();
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
                modalStore.modalClose(e)
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
                        <div className="row">
                            <form action="#">
                                <div className="col s12 l6 xl6">
                                    <div className="input-field">
                                        <input type="file" hidden />
                                        <label htmlFor="">Изображение для формы</label>
                                    </div>
                                    <div className="form-img-box">
                                        <div className="col s12 center m45_0">
                                                <img className="responsive-img" style={{height: "200px"}} src={noimages} alt="images forms" />
                                        </div>
                                        <div className="form-button-box">
                                            <button className="waves-effect waves-light btn orange lighten-2 mb2" type="button">
                                                <i className="material-icons left">backup</i>
                                                Загрузить изображение
                                            </button>
                                        </div>
                                    </div>
                                    <div className="input-field">
                                        <input id="formName" type="text" name="formName" required/>
                                        <label htmlFor="name">Название формы</label>
                                    </div>

                                    <div className="input-field">
                                        <input id="formTitle" type="text" name="formTitle" required/>
                                        <label htmlFor="title">Заголовок формы</label>
                                    </div>

                                    <div className="input-field">
                                        <input id="formUrlSite" type="text" name="formUrlSite" required/>
                                        <label htmlFor="formUrlSite">URL-сайта</label>
                                    </div>

                                    <div className="input-field">
                                        <input id="formDescription" type="text" name="formDescription" required/>
                                        <label htmlFor="formDescription">Краткое описание</label>
                                    </div>

                                    <div className="form-button-box">
                                        <button className="waves-effect waves-light btn" type="submit">
                                            <i className="material-icons left">save</i>
                                            Сохранить изменения
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="col s12 l6 xl6 border">
                                  <FormCreate 
                                    formFields={fieldsForm}
                                    removeField={this.removeField.bind(this)}
                                    editField={this.editField.bind(this)}
                                  />
                            </div>
                        </div>
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
                
            {/* <Popup /> */}
        </div>
        
        )
    }
}

export default withRouter(ContactsForm)
