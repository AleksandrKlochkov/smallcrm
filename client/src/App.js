import React, { Component } from 'react'
import {inject, observer } from 'mobx-react'
import 'materialize-css'
import {useRoutes} from './routes/routes'

@inject('authStore')
@observer class App extends Component {

  constructor(props){
    super(props)
    this.props.authStore.autoLogin()
  }

  render() {
    return (
      <React.Fragment>
           {useRoutes(this.props.authStore.isAuthenticated)}
      </React.Fragment>
    )
  }
}

export default App


