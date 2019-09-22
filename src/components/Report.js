import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

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
    }

    componentDidMount() {
        let that = this;

        fetch(
            // 'http://localhost:8333/reports/week/' + this.state.kmom
            'https://me-api.jespernyhlenjs.me/reports/week/' + this.state.kmom
        )
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                that.setState({
                    readmeMarkdown: result.data.text
                });
            });
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
