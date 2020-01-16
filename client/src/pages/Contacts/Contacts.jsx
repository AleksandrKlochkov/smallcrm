import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import Card from '../../components/Card/Card'
import ContactsForm from '../ContactsForm/ContactsForm'


class Contacts extends Component {

    renderContacts(pathname) {

        switch (pathname) {
            case "/contacts/contact_form":
                return (
                    <div className="row">                         
                       <ContactsForm />
                    </div>
                )
            case "/contacts/contact_form/add_form":
                return (
                    <div className="row">                         
                        <ContactsForm />
                    </div>
                )
            default:
                return (
                    <div className="row">                         
                        <Card 
                            icon={'contact_mail'}
                            title={'Форма на сайт'}
                            description={'В данном виджете вы можете создавать формы для ваших сайтов и управлять ими'}
                            link={'/contacts/contact_form'}
                        />
                    </div>
                )
        }
    }
    render() {
        console.log(this.props)
        const {history} = this.props
        return (
            <React.Fragment>
                {this.renderContacts(history.location.pathname)}
            </React.Fragment>
        )
    }
}

export default withRouter(Contacts)
