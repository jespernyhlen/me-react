import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Me from './components/Me.js';
import Report from './components/Report.js';

import './App.css';

class App extends Component {
    render() {
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
                                <Link to='/reports/week/kmom01'>
                                    <i className='fas fa-address-card'></i>Vecka
                                    1
                                </Link>
                            </li>
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
                    <Route path='/reports/week/:kmom' component={Report} />
                </div>
            </Router>
        );
    }
}

export default App;
