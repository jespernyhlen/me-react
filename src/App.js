import React, { useState } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from './components/NavBar.js';

import Me from './components/Me.js';
import Report from './components/Report.js';
import Register from './components/Register.js';
import Login from './components/Login.js';
import Logout from './components/Logout.js';
import Chat from './components/Chat/Chat.js';

import ShowReports from './components/reports/ShowReports.js';
import Edit from './components/reports/Edit.js';
import Create from './components/reports/Create.js';

import './App.css';

localStorage.setItem('token', null);

const App = () => {
    const [isLoggedIn, setisLoggedIn] = useState(false);

    const login = () => {
        setisLoggedIn(true);
    };

    const logout = () => {
        setisLoggedIn(false);
    };

    return (
        <Router>
            <div className='App'>
                <NavBar loggedIn={isLoggedIn} />
                <Route exact path='/' component={Me} />
                <Route exact path='/reports/week/:id' component={Report} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/chat' component={Chat} />
                <Route
                    exact
                    path='/login'
                    render={props => (
                        <Login
                            {...props}
                            login={login.bind(this)}
                            logout={logout.bind(this)}
                        />
                    )}
                />
                {isLoggedIn
                    ? [
                          <Route
                              exact
                              path='/showreports'
                              component={ShowReports}
                          />,
                          <Route
                              exact
                              path='/edit/week/:id'
                              component={Edit}
                          />,
                          <Route
                              exact
                              path='/create/week/:id'
                              component={Create}
                          />,
                          <Route
                              exact
                              path='/logout'
                              render={props => (
                                  <Logout
                                      {...props}
                                      login={login.bind(this)}
                                      logout={logout.bind(this)}
                                  />
                              )}
                          />
                      ]
                    : null}
            </div>
        </Router>
    );
};
export default App;
