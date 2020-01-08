import React, { Component } from 'react'
import 'materialize-css'
import './App.css'

import {useRoutes} from './routes/routes'

import {observer} from 'mobx-react'


export default class App extends Component {

  state = {
    isAuthenticated: false,//!!token,
    routes: useRoutes(this.isAuthenticated)
  }
  render() {
    return (
        <div>
            {this.state.routes}
        </div>
    )
  }
}


