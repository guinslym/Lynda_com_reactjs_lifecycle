import React from 'react'
import ReactDOM from 'react-dom'
// import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { loggerExample }  from './loggerExample'

// ReactDOM.render(<App />, document.getElementById('root'))
ReactDOM.render(<loggerExample />, document.getElementById('root'))
registerServiceWorker()
