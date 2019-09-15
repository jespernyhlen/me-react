import React, { Component } from 'react';
import DateForm from './DateForm';
import ValidateForm from './Validate';

const initialState = () => {
    let initState = {
        name: '',
        lastName: '',
        year: '',
        email: '',
        password: '',
        nameError: '',
        lastNameError: '',
        yearError: '',
        emailError: '',
        passwordError: ''
    };
    return initState;
};

class Register extends Component {
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
            this.state.name,
            this.state.lastName,
            this.state.email,
            this.state.year,
            this.state.password
        );

        if (validated === true) {
            alert('Tillfälligt meddelande, din registrering lyckades.');
            this.setState(initialState());
        }
        if (!validated) {
            this.setState(initialState());
        }
        this.setState({
            nameError: validated.nameError,
            lastNameError: validated.lastNameError,
            emailError: validated.emailError,
            passwordError: validated.passwordError,
            yearError: validated.yearError
        });
    };

    handleReset = e => {
        e.preventDefault();

        this.setState(initialState());
    };

    changeYear = newYear => {
        this.setState({ year: newYear });
    };

    formatDate(dateToFormat) {
        return new Intl.DateTimeFormat('sv-SE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(dateToFormat);
    }

    render() {
        return (
            <main id='register'>
                <div className='main-container register'>
                    <h1 className='center'>Registrera användare</h1>

                    <form
                        onSubmit={this.handleSubmit}
                        onReset={this.handleReset}
                    >
                        <div className='form-group'>
                            <label htmlFor='firstName'>Namn*</label>
                            <input
                                name='name'
                                value={this.state.name}
                                type='text'
                                onChange={this.handleChange}
                            />
                            <div className='invalid-feedback'>
                                {this.state.nameError}
                            </div>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='lastName'>Efternamn*</label>
                            <input
                                name='lastName'
                                value={this.state.lastName}
                                type='text'
                                onChange={this.handleChange}
                            />
                            <div className='invalid-feedback'>
                                {this.state.lastNameError}
                            </div>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='birthyear'>
                                Födelsedatum* (Minst 18 år)
                            </label>
                            <DateForm
                                // value={this.state.selected_date}
                                onChange={this.handleDate}
                                data={{
                                    year: this.state.year,
                                    changeYear: this.changeYear.bind(this)
                                }}
                                // onSelectDate={this.handleDate}
                            />
                            <div className='invalid-feedback'>
                                {this.state.yearError}
                            </div>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='email'>E-post* </label>
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
                            <label htmlFor='password'>
                                Lösenord* (Minst 6 tecken)
                            </label>
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
                        {/* <div className='form-group'>
                            <input
                                type='checkbox'
                                id='scales'
                                name='scales'
                                checked
                            />
                            <label for='scales'>Scales</label>
                        </div> */}

                        <div className='form-group btns'>
                            <button type='submit' className='btn register'>
                                Registrera
                            </button>
                            <button type='reset' className='btn reset'>
                                Rensa
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
}

export default Register;