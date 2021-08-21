import React  from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AsyncApp from './AsyncApp.jsx';

const Root = () => {

  return (
    <div>
      <Router>
        <AsyncApp />
      </Router>
      
    </div>
  )
}

export default Root;
