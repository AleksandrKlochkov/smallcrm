import React, { Component } from 'react'
import "materialize-css"
import Home from './pages/Home'

class App extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <Home />
        </div>
      </div>
    )
  }
}

export default App

