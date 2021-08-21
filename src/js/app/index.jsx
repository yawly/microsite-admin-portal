import React from 'react';
import ReactDOM from 'react-dom';

// import '../../scss/styles.scss'

import Root from './root.jsx';

if (process.env.NODE_ENV === 'production') {
    // Add any production specific configuration
}

if (process.env.NODE_ENV === 'development') {
    // Add any development specific configuration
}

const App = document.getElementById('Root')

console.log('a');

if(App) {
  ReactDOM.render(
    <Root></Root>,
    App
  )
}
