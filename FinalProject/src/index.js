import React from 'react'
import ReactDOM from 'react-dom'
// import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {LoggerExample} from './loggerExample'

ReactDOM.render(<LoggerExample />, document.getElementById('root'))
// ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker()
