import React, { Component } from 'react';
import ValidateForm from './Validate';

const initialState = () => {
    let initState = {
        email: '',
        password: '',
        emailError: '',
        passwordError: ''
    };
    return initState;
};

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = initialState();
    }

    componentDidMount() {}

    handleChange = e => {
        const isCheckbox = e.target.type === 'checkbox';
        this.setState({
            [e.target.name]: isCheckbox ? e.target.checked : e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const validated = ValidateForm(
            'name',
            'lastname',
            this.state.email,
            '1990-01-01',
            this.state.password
        );

        if (validated === true) {
            alert('Tillfälligt meddelande, din registrering lyckades.');
            console.log(validated);
            this.loginUser();
            this.setState(initialState());
        }
        if (!validated) {
            this.setState(initialState());
        }
        this.setState({
            emailError: validated.emailError,
            passwordError: validated.passwordError
        });
    };

    loginUser() {
        fetch('https://me-api.jespernyhlenjs.me/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));

        console.log('Feeetching done');
    }

    handleReset = e => {
        e.preventDefault();

        this.setState(initialState());
    };

    render() {
        return (
            <main id='login'>
                <div className='main-container register'>
                    <h1 className='center'>Logga in användare</h1>

                    <form
                        onSubmit={this.handleSubmit}
                        onReset={this.handleReset}
                    >
                        <div className='form-group'>
                            <label htmlFor='email'>E-post</label>
                            <input
                                name='email'
                                value={this.state.email}
                                type='email'
                                onChange={this.handleChange}
                            />
                            <div className='invalid-feedback'>
                                {this.state.emailError}
                            </div>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='password'>Lösenord</label>
                            <input
                                name='password'
                                value={this.state.password}
                                type='password'
                                onChange={this.handleChange}
                            />
                            <div className='invalid-feedback'>
                                {this.state.passwordError}
                            </div>
                        </div>
                        <div className='form-group btns'>
                            <button
                                type='submit'
                                className='btn register center'
                            >
                                Logga in
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
}

export default Login;
