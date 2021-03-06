import React, { Component, Fragment } from 'react'
import {toJS } from 'mobx'
import { inject, observer} from 'mobx-react'
import {withRouter, Switch, Route, Redirect} from 'react-router-dom'
import Card from '../../components/Card/Card'
import FormCreate from '../../components/FormCreate/FormCreate'
import CreateFieldsForm from '../../components/CreateFieldsForm/CreateFieldsForm'
import CreateFormModal from '../../components/CreateFormModal/CreateFormModal'
import Loading from '../../components/Loading/Loading'
import FormHtmlCodeModal from '../../components/FormHtmlCodeModal/FormHtmlCodeModal'

@inject('contactFormStore','modalStore')
@observer class ContactsForm extends Component {
    constructor(props) {
        super(props)
        this.modalRef = React.createRef()
        this.modalCreateFormRef =React.createRef()
        this.modalCreateFieldsRef = React.createRef()
        this.formHtmlCodeModal = React.createRef()
        this.formGenerateRef = React.createRef()
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
        const {contactFormStore, modalStore, history} = this.props
        return (
            <div className="contact-form-pages">
              
                <div className="contact-form">
                    <Switch>
                        <Route exact path="/contacts/contact_form">
                            <Fragment>
                                {history.location.pathname === '/contacts/contact_form' && !contactFormStore.Loading ?   
                                <div className="contact-form-btn">
                                    <button onClick={()=>modalStore.setModalElement(this.modalCreateFormRef.current)}  className="waves-effect waves-light btn" type="button"><i className="small material-icons left">add</i>Добавить форму</button>
                                </div>
                                : null}
                                <div className="row">
                                    {contactFormStore.Loading ? <Loading /> : this.renderCardForms(toJS(contactFormStore.Forms))}
                                </div>
                            </Fragment>
                        </Route>
                        <Route path="/contacts/contact_form/:id">
                            <FormCreate formGenerateRef={this.formGenerateRef} modalCreateFieldsRef={this.modalCreateFieldsRef} formHtmlCodeModal={this.formHtmlCodeModal}/>
                        </Route>
                        <Redirect to='/NotFound' />
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
                <FormHtmlCodeModal 
                       modalRef={this.formHtmlCodeModal}
                       closeModal={this.closeModal.bind(this)}
                /> 
        </div>
        )
    }
}

export default withRouter(ContactsForm)
