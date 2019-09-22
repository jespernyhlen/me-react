import React, { Component } from 'react';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            week: this.props.match.params.id,
            report: []
        };
    }

    componentDidMount() {
        // fetch('http://localhost:8333/reports/week/' + this.state.week)
        fetch(
            'https://me-api.jespernyhlenjs.me/reports/week/' + this.state.week
        )
            .then(res => res.json())
            .then(response => this.saveReport(response));
    }

    saveReport(response) {
        let report = [];
        report.week = response.data.kmom;
        report.text = response.data.text;

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

        // fetch('http://localhost:8333/reports/update', {
        fetch('https://me-api.jespernyhlenjs.me/reports/update', {
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
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <main id='login'>
                <div className='main-container register'>
                    <h1 className='center'>Redigera rapport</h1>

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
                                Uppdatera
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
}

export default Edit;
