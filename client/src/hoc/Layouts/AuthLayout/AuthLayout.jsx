import React, { Component } from 'react'
import Auth from '../../../pages/Auth/Auth'
import Navbar from '../../../components/Navbar/Navbar'
import { Redirect } from 'react-router-dom'

export default class AuthLayout extends Component {
    state = {
        navbarLinks: []
    }
    render() {
        return (
            <React.Fragment>
               <Navbar navbarLinks={this.state.navbarLinks}/>
               <Switch>
                    <Route exact path="/">
                       <Redirect to="/auth"/>
                    </Route>
                    <Route path="/auth">
                        <Auth />
                    </Route>
                </Switch>
     
            </React.Fragment>
        )
    }
}
