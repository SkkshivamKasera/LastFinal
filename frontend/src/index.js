import React from 'react';
import { createRoot } from 'react-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import App from './App';
import { Provider } from 'react-redux';
import store from './Store';


const alertOptions = {
  position: 'bottom center',
  timeout: 5000,
  offset: '30px',
  transition: 'scale',
};

const root = createRoot(document.getElementById('root'));

root.render(
  <AlertProvider template={AlertTemplate} {...alertOptions}>
    <Provider store={store}>
      <App />
    </Provider>
  </AlertProvider>
);
