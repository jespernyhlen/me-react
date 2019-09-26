import React, { Component } from 'react';

const apiURL =
    process.env.NODE_ENV === 'local'
        ? 'https://me-api.jespernyhlenjs.me/'
        : 'http://localhost:8333/';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            week: this.props.match.params.id,
            report: []
        };
    }

    componentDidMount() {
        let report = [];
        report.week = this.state.week;
        report.text = '';

        this.setState({
            report: report
        });
    }

    handleChange = e => {
        let report = [];

        report.text = e.target.value;
        report.week = this.state.report.week;

        this.setState({
            report: report
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        // fetch('http://localhost:8333/reports', {
        fetch(apiURL + 'reports', {
            method: 'post',
            body: JSON.stringify({
                kmom: this.state.report.week,
                text: this.state.report.text
            }),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(response => {
                this.props.history.push('/showreports');
            });
    };

    render() {
        return (
            <main id='login'>
                <div className='main-container register'>
                    <h1 className='center'>Skapa rapport</h1>

                    <form onSubmit={this.handleSubmit}>
                        <div className='report-textarea'>
                            <label htmlFor='text'>Text</label>
                            <textarea
                                id='report-text'
                                name='textarea'
                                value={this.state.report.text}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className='form-group btns'>
                            <button
                                className='btn register btn-center'
                                type='submit'
                            >
                                Skapa
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
}

export default Create;
