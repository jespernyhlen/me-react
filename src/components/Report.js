import React, { Component } from 'react';
import Readme from '../README.md';
import ReactMarkdown from 'react-markdown';

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // questions: [],
            // kmom: props.match.params.kmom,
            githubURL: 'https://github.com/',
            readmeMarkdown: ''
        };
        console.log(props);
    }

    componentDidMount() {
        fetch(Readme)
            .then(res => res.text())
            .then(text => this.setState({ readmeMarkdown: text }));
        // let that = this;
        // fetch('https://me-api.jsramverk.me/reports/' + this.state.kmom)
        //     .then(function(response) {
        //         return response.json();
        //     })
        //     .then(function(result) {
        //         that.setState({
        //             questions: result.data
        //         });
        //         console.log(result.data);
        //     });
    }

    render() {
        // const renderedQuestions = this.state.questions.map(
        //     (question, index) => {
        //         return (
        //             <div className='question' key={index}>
        //                 <p>
        //                     <strong>{question.question}</strong>
        //                 </p>
        //                 <p>{question.answer}</p>
        //             </div>
        //         );
        //     }
        // );

        return (
            <main>
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
