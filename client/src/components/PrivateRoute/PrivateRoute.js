import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import {
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";

@inject('authStore')
@observer class PrivateRoute extends Component {
    render() {
        console.log(this.props)
        const {isAuthenticated,authStore,children, ...rest} = this.props

        return (
   
            <Route
              {...rest}
              render={({ location }) =>
                isAuthenticated ? (
                  children
                ) : (
                  <Redirect
                    to={{
                      pathname: "/auth",
                      state: { from: location }
                    }}
                  />
                )
              }
            />
          )
    }
}

export default PrivateRoute
