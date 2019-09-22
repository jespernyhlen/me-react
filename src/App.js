import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Me from './components/Me.js';
import Report from './components/Report.js';
import Register from './components/Register.js';
import Login from './components/Login.js';
import Logout from './components/Logout.js';

import ShowReports from './components/reports/ShowReports.js';
import Edit from './components/reports/Edit.js';
import Create from './components/reports/Create.js';

import './App.css';

localStorage.setItem('token', null);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
    }

    login() {
        this.setState({ loggedIn: true });
    }

    logout() {
        this.setState({ loggedIn: false });
    }

    render() {
        let loggedIn = this.state.loggedIn;
        let loginLogout;
        let loggedInOption;

        if (this.state.loggedIn) {
            loginLogout = (
                <li>
                    <Link to='/logout'>
                        <i className='fas fa-sign-in-alt'></i>
                        Logga ut
                    </Link>
                </li>
            );
            loggedInOption = (
                <li>
                    <Link to='/showreports'>
                        <i className='fas fa-sign-in-alt'></i>
                        CRUD
                    </Link>
                </li>
            );
        } else {
            loginLogout = (
                <li>
                    <Link to='/login'>
                        <i className='fas fa-sign-in-alt'></i>
                        Logga in
                    </Link>
                </li>
            );

            loggedInOption = (
                <li>
                    <Link to='/register'>
                        <i className='fas fa-sign-in-alt'></i>
                        Registrera
                    </Link>
                </li>
            );
        }

        return (
            <Router>
                <div className='App'>
                    <nav>
                        <div className='nav-brand'>
                            <Link to='/'>
                                {' '}
                                <p>JS-Ramverk</p> <p>Jesper Nyhlén</p>
                            </Link>
                        </div>
                        <ul>
                            <li>
                                <Link to='/'>
                                    <i className='fas fa-home'></i>Hem
                                </Link>
                            </li>
                            <li>
                                <Link to='/reports/week/1'>
                                    <i className='fas fa-address-card'></i>Vecka
                                    1
                                </Link>
                            </li>
                            <li>
                                <Link to='/reports/week/2'>
                                    <i className='fas fa-address-card'></i>Vecka
                                    2
                                </Link>
                            </li>

                            {loggedInOption}
                            {loginLogout}
                        </ul>
                        <div className='nav-footer'>
                            <div className='nav-contacts'>
                                <a href='https://github.com/jespernyhlen/me-react'>
                                    <i className='fab fa-github-square'></i>
                                </a>
                            </div>
                            <p className='nav-copyright'>
                                2019 © Jesper Nyhlén{' '}
                            </p>
                        </div>
                    </nav>

                    <Route exact path='/' component={Me} />
                    <Route exact path='/reports/week/1' component={Report} />
                    <Route exact path='/reports/week/2' component={Report} />
                    <Route exact path='/register' component={Register} />

                    <Route
                        exact
                        path='/login'
                        render={props => (
                            <Login
                                {...props}
                                login={this.login.bind(this)}
                                logout={this.logout.bind(this)}
                            />
                        )}
                    />
                    {loggedIn
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
                                          login={this.login.bind(this)}
                                          logout={this.logout.bind(this)}
                                      />
                                  )}
                              />
                          ]
                        : null}
                </div>
            </Router>
        );
    }
}

export default App;
