import React, { Component } from 'react'
import {withRouter, Switch, Route} from 'react-router-dom'

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import Card from '../../components/Card/Card'
import ContactsForm from '../ContactsForm/ContactsForm'


class Contacts extends Component {

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
                <div className="row">
                    <Switch>
                        <Route exact path='/contacts'>
                            <Card 
                                icon={'contact_mail'}
                                formName={'Форма на сайт'}
                                formDescription={'В данном виджете вы можете создавать формы для ваших сайтов и управлять ими'}
                                link={'/contacts/contact_form'}
                            />
                        </Route>
                        <Route path="/contacts/contact_form">                 
                            <ContactsForm />
                        </Route>
 
                    </Switch>
                </div>

            </React.Fragment>
        )
    }
}

export default withRouter(Contacts)
