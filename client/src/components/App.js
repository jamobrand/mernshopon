import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

import './App.css';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={LoginPage} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
