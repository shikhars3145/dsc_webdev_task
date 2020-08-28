import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import { Route, Switch } from 'react-router-dom';
import PositionsPage from './pages/PositionsPage/PositionsPage';
import AdminPage from './pages/AdminPage/AdminPage';
import { UserContext } from './contexts';
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // console.log('useEffect running');
    if (localStorage.getItem('user')) {
      // console.log('user in ls');
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/positions" component={PositionsPage} />
          <Route exact path="/admin" component={AdminPage} />
        </Switch>
      </UserContext.Provider>
    </>
  );
}

export default App;
