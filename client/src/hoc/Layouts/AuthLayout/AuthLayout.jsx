import React, { Component } from 'react'
import {Switch, Redirect, Route } from 'react-router-dom'

import Navbar from '../../../components/Navbar/Navbar'
import Logout from '../../../components/Logout/Logout'

import Auth from '../../../pages/Auth/Auth'



class AuthLayout extends Component {
    state = {
        navbarLinks: []
    }
    render() {
        return (
            <div className="auth-layout">
               <Navbar navbarLinks={this.state.navbarLinks}/>
               <Switch>
                    <Route exact path="/">
                       <Redirect to="/auth"/>
                    </Route>
                    <Route path="/auth">
                        <Auth />
                    </Route>
                    <Route path="/logout" component={Logout} />
                </Switch>
            </div>
        )
    }
}

export default AuthLayout
