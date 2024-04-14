/*
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
*/

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './redux/store'
//import App from './App.jsx'
//import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
      <BrowserRouter>
        <Provider store={store}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </Provider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </HelmetProvider>
)
