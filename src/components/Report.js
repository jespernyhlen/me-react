import React, { Component } from 'react';
import Readme from '../README.md';
import ReportTwo from './ReportTwo.md';

import ReactMarkdown from 'react-markdown';

const kmom = {
    '1': Readme,
    '2': ReportTwo
};

class Report extends Component {
    constructor(props) {
        super(props);
        let location = this.props.location.pathname.split('/')[3];
        this.state = {
            // // questions: [],
            kmom: location,
            githubURL: 'https://github.com/jespernyhlen/me-react',
            readmeMarkdown: ''
        };
        console.log(props);
    }

    componentDidMount() {
        fetch(kmom[this.state.kmom])
            .then(res => res.text())
            .then(text => this.setState({ readmeMarkdown: text }));
        console.log('eheeej');
    }

    render() {
        return (
            <main id='report'>
                <div className='main-container report'>
                    <div className='report-text'>
                        {/* <h1>Readme (English)</h1> */}
                        <ReactMarkdown source={this.state.readmeMarkdown} />
                        {/* {renderedQuestions} */}
                    </div>
                    <div className='report-github'>
                        <h1>Github Repo</h1>
                        <p>
                            Här finner du en{' '}
                            <a href={this.state.githubURL}>länk</a> till github
                            repot.{' '}
                        </p>
                    </div>
                </div>
            </main>
        );
    }
}

export default Report;
