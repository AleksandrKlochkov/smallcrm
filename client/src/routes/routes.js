import React from 'react'
import AuthLayout from '../hoc/Layouts/AuthLayout/AuthLayout'
import SiteLayout from '../hoc/Layouts/SiteLayout/SiteLayout'

export function useRoutes(isAuthenticated) {
  const layout = isAuthenticated ? <SiteLayout /> : <AuthLayout /> 
  return (
    layout
  )
}
