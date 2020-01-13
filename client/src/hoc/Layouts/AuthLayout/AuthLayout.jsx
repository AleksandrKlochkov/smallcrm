import React, { Component } from 'react'
import {Switch, Redirect, Route } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import Navbar from '../../../components/Navbar/Navbar'

import Auth from '../../../pages/Auth/Auth'
import NotFound from '../../../pages/NotFound/NotFound'




@inject('authStore')
@observer class AuthLayout extends Component {
    state = {
        navbarLinks: []
    }

    render() {
        return (
            <div className="auth-layout">
               <Navbar navbarLinks={this.state.navbarLinks}/>
               <Switch>
                    <Route exact path="/">
                       <Redirect to="/login"/>
                    </Route>
                    <Route path="/login">
                        <Auth />
                    </Route>
                    {/* <Route path="/NotFound">
                       <NotFound />
                    </Route> */}
                    <Redirect to="/"/>
                </Switch>
            </div>
        )
    }
}

export default AuthLayout
