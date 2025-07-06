import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('reactify-django-ui'));
// registerServiceWorker();

let myComponent = document.getElementById('reactify-django-ui')
if (myComponent !== null) {
    ReactDOM.render(<App />, myComponent);
}

