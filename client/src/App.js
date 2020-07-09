import React, { Fragment } from 'react';
import './App.css';
import Landing from './components/layouts/Landing';
import Navbar from './components/layouts/Navbar';

const App = () => (
  <Fragment>
    <Navbar />
    <Landing />
  </Fragment>
)
export default App;
