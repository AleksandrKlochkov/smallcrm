import React, { Component } from 'react'
import {inject } from 'mobx-react'
import 'materialize-css'
import {useRoutes} from './routes/routes'

@inject('authStore')
class App extends Component {
  render() {
    return (
      <React.Fragment>
           {useRoutes(this.props.authStore.isAuth)}
      </React.Fragment>
    )
  }
}

export default App


