import React, { Component } from 'react'
import {inject, observer } from 'mobx-react'
import 'materialize-css'
import {useRoutes} from './routes/routes'

@inject('authStore')
@observer class App extends Component {

  componentDidMount() {
    this.props.authStore.autoLogin()
  }

  render() {
    return (
      <React.Fragment>
           {useRoutes(this.props.authStore.isAuth)}
      </React.Fragment>
    )
  }
}

export default App


