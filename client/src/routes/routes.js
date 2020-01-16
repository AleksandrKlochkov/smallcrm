import React from 'react'
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import AuthLayout from '../hoc/Layouts/AuthLayout/AuthLayout'
import SiteLayout from '../hoc/Layouts/SiteLayout/SiteLayout'

export function useRoutes(isAuthenticated) {
  const layout = (
    <Switch>
        <Route path="/auth">
          <AuthLayout />
        </Route>
        <PrivateRoute path="/" isAuthenticated={isAuthenticated}>
          <SiteLayout />
        </PrivateRoute>
    </Switch>
  )

  return  layout
}

export function PrivateRoute({isAuthenticated, children, ...rest }) {

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
  );
}


