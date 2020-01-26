import React, { Component } from 'react'
import {toJS } from 'mobx'
import { inject, observer} from 'mobx-react'
import {withRouter, Switch, Route} from 'react-router-dom'
import Card from '../../components/Card/Card'
import FormCreate from '../../components/FormCreate/FormCreate'
import CreateFieldsForm from '../../components/CreateFieldsForm/CreateFieldsForm'
import CreateFormModal from '../../components/CreateFormModal/CreateFormModal'
import Loading from '../../components/Loading/Loading'

@inject('contactFormStore','modalStore')
@observer class ContactsForm extends Component {
    constructor(props) {
        super(props)
        this.modalRef = React.createRef()
        this.modalCreateFormRef =React.createRef()
        this.modalCreateFieldsRef = React.createRef()
    }

    closeModal(e) {
        e.stopPropagation()
        const close = e.target.classList.contains('modal_win_close')
        if(close){
            const {contactFormStore, modalStore} = this.props
            contactFormStore.clearFieldForm()
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
                        key={`${index}_${Math.random().toString().replace(/[.]/g, "")}`} 
                        {...item}
                    />
                )
             })
         }
        return "Нет созданных форм, добавьте новую форму."
    }

    componentDidMount() {
        this.props.contactFormStore.fetchForms()
        this.props.contactFormStore.setLocation(this.props)
        window.M.updateTextFields()
    }

    render() {
        const {contactFormStore, modalStore, match} = this.props
        return (
            <div className="contact-form-pages">
                <div className="contact-form-btn">
                    <button onClick={()=>modalStore.setModalElement(this.modalCreateFormRef.current)} className="waves-effect waves-light btn grey darken-1">Добавить форму</button>
                </div>
                <div className="contact-form">
                    <Switch>
                        <Route exact path="/contacts/contact_form">
                            <div className="row">
                              {contactFormStore.Loading ? <Loading /> : this.renderCardForms(toJS(contactFormStore.Forms))}
                            </div>
                        </Route>
                        <Route path="/contacts/contact_form/:id">
                            <FormCreate modalCreateFieldsRef={this.modalCreateFieldsRef} />
                        </Route>
                    </Switch>     
                </div>
                <CreateFieldsForm
                    modalRef={this.modalCreateFieldsRef}
                    closeModal={this.closeModal.bind(this)}
                />   
                <CreateFormModal 
                    modalRef={this.modalCreateFormRef}
                    closeModal={this.closeModal.bind(this)}
                />   
        </div>
        )
    }
}

export default withRouter(ContactsForm)
