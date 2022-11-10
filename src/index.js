import React from 'react';
import ReactDOM from 'react-dom';
import './assets/animated.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/elegant-icons/style.css';
import '../node_modules/et-line/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import './assets/style.scss';
import App from './components/app';
import { projectAuth } from './firebase/config';
import { store } from './app/store';
import { Provider } from 'react-redux';

let app;

projectAuth.onAuthStateChanged((_user) => {
  if (!app) {
    app = ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
});
