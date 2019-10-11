import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const apiURL =
    process.env.NODE_ENV === 'local'
        ? 'http://localhost:8333/'
        : 'https://me-api.jespernyhlenjs.me/';

const Report = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [readmeMarkdown, setreadmeMarkdown] = useState('');
    const githubURL = useState('https://github.com/jespernyhlen/me-react');

    useEffect(() => {
        const fetchReports = async () => {
            setIsLoading(true);
            try {
                const result = await axios.get(
                    `${apiURL}reports/week/${props.match.params.id}`
                );
                setreadmeMarkdown(result.data.data.text);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        // code to run on component mount
        console.log(props.match.params.id);
        fetchReports();
    }, [props]);

    return (
        <main id='report'>
            <div className='main-container report'>
                <div className='report-text'>
                    {isLoading ? null : (
                        <ReactMarkdown source={readmeMarkdown} />
                    )}
                </div>
                <div className='report-github'>
                    <h1>Github Repo</h1>
                    <p>
                        Här finner du en <a href={githubURL}>länk</a> till
                        github repot.{' '}
                    </p>
                </div>
            </div>
        </main>
    );
};
export default Report;
