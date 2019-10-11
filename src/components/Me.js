import React, { useEffect, useState } from 'react';
import axios from 'axios';
import profileImg from '../web-dev2.png';

const apiURL =
    process.env.NODE_ENV === 'local'
        ? 'http://localhost:8333/'
        : 'https://me-api.jespernyhlenjs.me/';

const Me = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        const fetchMeInfo = async () => {
            setIsLoading(true);
            try {
                const result = await axios.get(`${apiURL}`);
                console.log(result);
                setName(result.data.data.name);
                setText(result.data.data.text);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        // code to run on component mount
        fetchMeInfo();
    }, []);

    return (
        <main id='home'>
            <div className='main-container home'>
                {/* <p>{this.state.name}</p>
                    <h1>{this.state.description}</h1>
                    <p>{this.state.message}</p> */}
                <div className='home-img'>
                    <img src={profileImg} alt='profil bild' />
                </div>

                <div className='home-info'>
                    {isLoading ? null : (
                        <React.Fragment>
                            {' '}
                            <p className='desc'>{name}</p>
                            <h1>Lite om mig</h1>
                            <p>{text}</p>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Me;
