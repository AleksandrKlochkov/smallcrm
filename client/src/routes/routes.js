import React from 'react'
import AuthLayout from '../hoc/Layouts/AuthLayout/AuthLayout'
import SiteLayout from '../hoc/Layouts/SiteLayout/SiteLayout'

export function useRoutes(isAuthenticated) {
  console.log('AUTH', isAuthenticated)
    if (isAuthenticated) {
      return (
        <SiteLayout />
      )
    } else {
      return (
        <AuthLayout />
      )
    }
}
