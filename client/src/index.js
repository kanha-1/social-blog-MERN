import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter  } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <App />
    <ToastContainer role="alert" autoClose={2000} position="top-right"   />
  </BrowserRouter>,
  document.getElementById('root')
);

