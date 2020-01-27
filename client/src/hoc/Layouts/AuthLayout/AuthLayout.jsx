import React, { Component, Fragment } from 'react'
import {Redirect, Route } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import authStore from '../../../stores/authStore'

import Navbar from '../../../components/Navbar/Navbar'

import Auth from '../../../pages/Auth/Auth'
// import NotFound from '../../../pages/NotFound/NotFound'



@inject('authStore')
@observer class AuthLayout extends Component {
    state = {
        navbarLinks: []
    }

    renderRoutes() {
        if(authStore.isAuthenticated){
            return  <Redirect to="/" /> 
        } 
           
        return (
            <Route path="/"><Auth /></Route> 
        )

    }

    render() {
        return (
            <div className="auth-layout">
               <Navbar navbarLinks={this.state.navbarLinks}/>
                {this.renderRoutes()}
               
            </div>
        )
    }
}

export default AuthLayout
