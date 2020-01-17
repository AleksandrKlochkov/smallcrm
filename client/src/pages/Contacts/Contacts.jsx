import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
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
        const {history} = this.props
        const pathnames = history.location.pathname.split('/')
        const breadcrumbLinks = []
        pathnames.forEach((i)=>{
            const item = this.props.links.find(link => link.url.replace(/\//g, "") === i)
            if(item){
                item.active=false
                breadcrumbLinks.push(item)
                return
            }
        })
        breadcrumbLinks[breadcrumbLinks.length-1].active = true

        return (
            <React.Fragment>
                <Breadcrumbs
                    breadcrumbLinks={breadcrumbLinks} 
                />
                {this.renderContacts(history.location.pathname)}
            </React.Fragment>
        )
    }
}

export default withRouter(Contacts)
