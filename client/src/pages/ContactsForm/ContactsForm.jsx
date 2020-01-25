import React, { Component } from 'react'
import {toJS } from 'mobx'
import { inject, observer} from 'mobx-react'
import {Link, withRouter, Switch, Route} from 'react-router-dom'
import Card from '../../components/Card/Card'
import FormCreate from '../../components/FormCreate/FormCreate'
import CreateFieldsForm from '../../components/CreateFieldsForm/CreateFieldsForm'
import CreateFormModal from '../../components/CreateFormModal/CreateFormModal'

@inject('contactFormStore','modalStore')
@observer class ContactsForm extends Component {
    constructor(props) {
        super(props)
        this.modalRef = React.createRef()
        this.modalCreateFormRef =React.createRef()
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
                 console.log(item)
                return (
                    <Card
                        key={`${index}_${Math.random()}`} 
                        {...item}
                    />
                )
             })
         }
        return "Нет созданных форм, добавьте новую форму."
    }

    componentDidMount() {
        this.props.contactFormStore.fetchForms()
        if(this.modalRef.current){
            this.modalRef.current.querySelector('form').reset()
            setTimeout(()=>{this.props.modalStore.setFormRef(this.modalRef.current.querySelector('form'))},100)
        }
        window.M.updateTextFields()
    }

    render() {
        const {contactFormStore, modalStore, history} = this.props
        console.log(contactFormStore.Forms)
        return (
            <div className="contact-form-pages">
                 { history.location.search === "" ?
                    <div className="contact-form-btn">
                        {/* <Link to="/contacts/contact_form/add_form?action=add"> */}
                            <button onClick={()=>modalStore.setModalElement(this.modalCreateFormRef.current)} className="waves-effect waves-light btn grey darken-1">Добавить форму</button>
                        {/* </Link> */}
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
                            <FormCreate />
                        </Route>
                    </Switch>     
                </div>
                <CreateFieldsForm
                    modalRef={this.modalRef}
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
