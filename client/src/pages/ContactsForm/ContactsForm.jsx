import React, { Component } from 'react'
import {toJS } from 'mobx'
import { inject, observer} from 'mobx-react'
import {Link} from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'

@inject('contactFormStore')
@observer class ContactsForm extends Component {

    renderCardForms(forms) {
        console.log(forms)

         if(forms && forms.length !==0 ){
             return forms.map((item,index) => {
                return (
                    <div  key={`${index}_${Math.random()}`} className="col xl3 l4 m6 s12">
                        <div className="card">
                            <div className="card-image waves-effect waves-block waves-light">
                            <Link to="/contacts/contact_form">
                                <div className="card-img teal accent-3">
                                    <i className="large material-icons">contact_mail</i>
                                </div>
                            </Link>
                            </div>
                            <div className="card-content">
                                <span className="card-title activator grey-text text-darken-4">{item.formName}<i className="material-icons right">more_vert</i></span>
                                <p><Link to="/contacts/contact_form">Перейти...</Link></p>
                            </div>
                            <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4">{item.formName}<i className="material-icons right">close</i></span>
                                <p>{item.formDescription}</p>
                            </div>
                        </div>
                    </div>
                )
             })
         }



        return "Нет созданных форм, добавьте новую форму."
    }

    render() {
        console.log(this.props)
        const {contactFormStore} = this.props
        return (
            <div className="contact-form-pages">
                 <Breadcrumbs prevPage={{url:'/contacts', title: 'Контакт центр'}}title={'Готовые формы'}/>
                <div className="contact-form-btn">
                    <button className="waves-effect waves-light btn grey darken-1">Добавить форму</button>
                </div>
                <div className="contact-form">
                    <div className="row">
                    {this.renderCardForms(toJS(contactFormStore.arrForms))}
                    </div>
                    {/* <div className="row">
                        <div className="col xl6">
                            <form action="/">
                                Добавьте поля формы     
                            </form>
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default ContactsForm
