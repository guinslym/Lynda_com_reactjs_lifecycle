import React, { Component } from 'react'

class App extends Component {

  static displayName = "SomethingNew"

  static defaultProps = {
    someImportArray: []
  }

  render() {
    console.log(this.props)
    return (
      <h1>
        Hello
      </h1>
    )
  }
}

export default App
