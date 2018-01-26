// src/app-client.js
import React from 'react';
import ReactDOM from 'react-dom';
import Page from './components/Page.jsx';

window.onload = () => {
  ReactDOM.render(<Page />, document.getElementById('main'));
};