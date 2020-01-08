import React, { Component } from 'react'
import Auth from '../../../pages/Auth/Auth'
import Navbar from '../../../components/Navbar/Navbar'
import { Switch, Redirect, Route } from 'react-router-dom'

class AuthLayout extends Component {
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

export default AuthLayout
