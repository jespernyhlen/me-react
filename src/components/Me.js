import React, { Component } from 'react';
import profileImg from '../web-dev2.png';

const apiURL =
    process.env.NODE_ENV === 'local'
        ? 'https://me-api.jespernyhlenjs.me/'
        : 'http://localhost:8333/';

class Me extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            text: ''
        };
    }

    componentDidMount() {
        let that = this;
        // fetch('http://localhost:8333/')

        fetch(apiURL)
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                that.setState({
                    name: result.data.name,
                    text: result.data.text
                });
            });
    }

    render() {
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
                        <p className='desc'>{this.state.name}</p>
                        <h1>Lite om mig</h1>
                        <p>{this.state.text}</p>
                        {/* <p>
                            Välkommen till min me-sida för kursen JS-Ramverk.
                            Mitt namn är Jesper Nyhlén och studerar
                            Webbutveckling vid Blekinge Tekniska Högskola.
                        </p>{' '}
                        <p>
                            Denna plats kommer att vara min bas inom kursen och
                            uppdateras med redovisningar samt annan information
                            gällande detta kursmoment. Uppdateringar kommer
                            ständigt ske, så det är bara att följa med!
                        </p> */}
                    </div>
                </div>
            </main>
        );
    }
}

export default Me;
