import React, { Component } from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import {inject} from 'mobx-react'
import authStore from '../../stores/authStore'

@inject('authStore')
class Logout extends Component {
    componentDidMount(){
        authStore.logout()
    }
    render() {
        return <Redirect to="/login" />
    }
}

export default withRouter(Logout)

