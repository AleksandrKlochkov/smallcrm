import React, { Component } from 'react'
import {Link, withRouter, Switch, Route} from 'react-router-dom'
import ContactsForm from '../ContactsForm/ContactsForm'

class Contacts extends Component {
    render() {
        const {} = this.props
        return (
            <React.Fragment>

                <Switch>
                    <Route exact path="/contacts">
                    <div className="row">
                        <div className="col xl3 l4 m6 s12">
                            <div className="card">
                                <div className="card-image waves-effect waves-block waves-light">
                                <Link to="/contacts/contact_form">
                                    <div className="card-img teal accent-3">
                                        <i className="large material-icons">contact_mail</i>
                                        {/* <img className="activator" src="images/office.jpg"/> */}
                                    </div>
                                </Link>
                                </div>
                                <div className="card-content">
                                    <span className="card-title activator grey-text text-darken-4">Форма на сайт<i className="material-icons right">more_vert</i></span>
                                    <p><Link to="/contacts/contact_form">Перейти...</Link></p>
                                </div>
                                <div className="card-reveal">
                                    <span className="card-title grey-text text-darken-4">Форма на сайт<i className="material-icons right">close</i></span>
                                    <p>В данном виджете вы можете создавать формы для ваших сайтов и управлять ими</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Route>
                    <Route path="/contacts/contact_form">
                        <ContactsForm />
                    </Route>
                </Switch>
            </React.Fragment>
        )
    }
}

export default withRouter(Contacts)
