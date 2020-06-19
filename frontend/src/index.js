import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';
import dotenv from 'dotenv';
import Axios from 'axios';

dotenv.config();
const store = createStore(reducer);

Axios.interceptors.request.use(request => {
  if(request.url.includes('contact')){
    let token = localStorage.getItem('token');
    if(token){
      request.headers = { 'Authorization':`Bearer ${token}` }
    }
  }
  return request;
},(err) =>{
  return Promise.reject(err)
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
