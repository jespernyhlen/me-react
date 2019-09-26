import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const initialState = () => {
    let initState = {
        reports: null
    };
    return initState;
};

const apiURL =
    process.env.NODE_ENV === 'local'
        ? 'https://me-api.jespernyhlenjs.me/'
        : 'http://localhost:8333/';

class ShowReports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            week: 1,
            reports: []
        };

        this.getReports();
    }

    getReports() {
        // fetch('http://localhost:8333/reports')
        fetch(apiURL + 'reports')
            .then(res => res.json())
            .then(response => this.saveReports(response));
    }

    saveReports(response) {
        let reports = [];
        reports = response.data;

        this.setState({
            reports: reports
        });
    }

    showAll() {
        const options = [];

        if (this.state.reports) {
            this.state.reports.map((report, index) =>
                options.push(
                    <option key={index} value={report.kmom}>
                        Vecka: {report.kmom}
                    </option>
                )
            );

            return (
                <div>
                    <select
                        name='week'
                        className='form-control date'
                        onChange={e => {
                            this.setState({ week: e.target.value });
                        }}
                    >
                        {options}
                    </select>
                </div>
            );
        }
    }

    render() {
        return (
            <main id='login'>
                <div className='main-container register'>
                    <h1 className='center'>Samtliga rapporter</h1>
                    <p className='desc center'>
                        Skapa eller redigera veckorapporter
                    </p>

                    {this.showAll()}
                    <div className='form-group btns'>
                        <Link
                            to={
                                '/create/week/' +
                                (this.state.reports.length + 1)
                            }
                        >
                            <button className='btn register'>Skapa ny</button>
                        </Link>
                        <Link to={'/edit/week/' + this.state.week}>
                            <button className='btn register'>Redigera</button>
                        </Link>
                    </div>
                </div>
            </main>
        );
    }
}

export default ShowReports;
