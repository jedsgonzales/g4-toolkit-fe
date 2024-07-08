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

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./client/apollo";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <HelmetProvider>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
        >
            <Provider store={store}>
              <App />
            </Provider>
        </GoogleOAuthProvider>
      </HelmetProvider>
    </ApolloProvider>
  </React.StrictMode>
);
