import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.interceptors.request.use(request => {
    console.log(request);
    return request;
}, error => {
    console.log(error); //this is just logging to the console, maybe for the serve to acknowledge, will still catch error in respective component
    return Promise.reject(error)
});

axios.interceptors.response.use(response => {
    console.log(response);
    return response;
}, error => {
    console.log(error); //this is just logging to the console, maybe for the serve to acknowledge, will still catch error in respective component
    return Promise.reject(error)
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();


