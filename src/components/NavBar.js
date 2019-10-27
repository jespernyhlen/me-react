import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        const { loggedIn } = this.props;

        let loginLogout;
        let loggedInOption;

        if (loggedIn) {
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
                        <i className='fas fa-edit'></i>
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
                            <i className='fas fa-address-card'></i>Vecka 1
                        </Link>
                    </li>
                    <li>
                        <Link to='/reports/week/2'>
                            <i className='fas fa-address-card'></i>Vecka 2
                        </Link>
                    </li>
                    <li>
                        <Link to='/reports/week/3'>
                            <i className='fas fa-address-card'></i>Vecka 3
                        </Link>
                    </li>
                    <li>
                        <Link to='/reports/week/4'>
                            <i className='fas fa-address-card'></i>Vecka 4
                        </Link>
                    </li>
                    <li>
                        <Link to='/reports/week/10'>
                            <i className='fas fa-address-card'></i>Projekt
                        </Link>
                    </li>

                    {loggedInOption}
                    {loginLogout}
                    <li>
                        <Link to='/chat'>
                            <i className='fas fa-address-card'></i>Chatt
                        </Link>
                    </li>
                </ul>
                <div className='nav-footer'>
                    <div className='nav-contacts'>
                        <a href='https://github.com/jespernyhlen/me-react'>
                            <i className='fab fa-github-square'></i>
                        </a>
                    </div>
                    <p className='nav-copyright'>2019 © Jesper Nyhlén </p>
                </div>
            </nav>
        );
    }
}

export default Report;
