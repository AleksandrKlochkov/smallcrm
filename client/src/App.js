import React, { Component } from 'react'
import 'materialize-css'
import './App.css'

import {observer} from 'mobx-react'
const routes = "Hello"
@observer
class App extends Component {
  
  render() {
    return (
      <div>
          {routes}
      </div>
    )
  }
}

export default App

