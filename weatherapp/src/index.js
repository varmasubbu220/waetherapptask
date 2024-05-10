import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from './redux/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId="909783950540-q4mpb71e4gkb6lhf20722eltg0ib0p1q.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
    </Provider> </React.StrictMode>
);

reportWebVitals();
