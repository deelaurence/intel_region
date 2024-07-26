import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStateProvider } from './GlobalState'
import {HelmetProvider} from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <React.StrictMode>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </React.StrictMode>
  </HelmetProvider>
)
