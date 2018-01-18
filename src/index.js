// src/app-client.js
import React from 'react';
import ReactDOM from 'react-dom';
import Page from './components/Page';

window.onload = () => {
  ReactDOM.render(<Page />, document.getElementById('main'));
};