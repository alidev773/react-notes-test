import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from './router/router';

import './App.css';

function App(): React.ReactElement {
  return (
    <div className='App'>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </div>
  );
}

export default App;
