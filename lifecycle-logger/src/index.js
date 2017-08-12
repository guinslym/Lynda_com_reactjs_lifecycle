import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
//
import { loggerExample }  from './loggerExample'
import registerServiceWorker from './registerServiceWorker'

// ReactDOM.render(<App />, document.getElementById('root'))
ReactDOM.render(<loggerExample />, document.getElementById('root'))
registerServiceWorker()
