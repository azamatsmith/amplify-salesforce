import React from 'react';
// import PropTypes from 'prop-types';
import { Router } from '@reach/router';
import Header from './components/Header';
import Home from './pages/Home';
import AuthSuccess from './pages/AuthSuccess';
import Todos from './pages/Todos';
import NotFound from './pages/NotFound';
import Form from './pages/Form';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Home path="/" />
        <AuthSuccess path="auth-success" />
        <Todos path="todos" />
        <Form path="form" />
        <NotFound default />
      </Router>
    </div>
  );
}

export default App;
