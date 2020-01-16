import React, { Component } from 'react'
import {Redirect, Route } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import Navbar from '../../../components/Navbar/Navbar'

import Auth from '../../../pages/Auth/Auth'
import authStore from '../../../stores/authStore'
// import NotFound from '../../../pages/NotFound/NotFound'

@inject('authStore')
@observer class AuthLayout extends Component {
    state = {
        navbarLinks: []
    }

    render() {
        return (
            <div className="auth-layout">
               <Navbar navbarLinks={this.state.navbarLinks}/>
               {authStore.isAuthenticated ? <Redirect to="/" /> : <Route path="/"><Auth /></Route> }
            </div>
        )
    }
}

export default AuthLayout
