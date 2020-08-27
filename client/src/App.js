import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import { Route, Switch } from 'react-router-dom';
import PositionsPage from './pages/PositionsPage/PositionsPage';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/positions" component={PositionsPage} />
      </Switch>
    </>
  );
}

export default App;
