import React, { Component } from 'react';

class Logout extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.logout();
        this.props.history.push('/login');
    };

    render() {
        return (
            <main id='login'>
                <div className='main-container register'>
                    <h1 className='center'>Logga ut användare</h1>

                    <form onSubmit={this.handleSubmit}>
                        <div className='form-group btns btn-center'>
                            <button
                                type='submit'
                                className='btn register center'
                            >
                                Logga ut
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
}

export default Logout;
