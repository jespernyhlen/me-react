import React, { Component } from 'react';
import profileImg from '../web-dev2.png';

class Me extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // name: '',
            // description: '',
            // message: ''
        };
    }

    componentDidMount() {
        // let that = this;
        // fetch('https://me-api.jsramverk.me')
        //     .then(function(response) {
        //         return response.json();
        //     })
        //     .then(function(result) {
        //         console.log(result);
        //         that.setState({
        //             message: result.description
        //         });
        //     });
        // that.setState({
        //     name: 'Jesper Nyhlén',
        //     description: 'Lite om mig',
        //     message:
        //         'Hej! Välkommen till min me-sida för kursen JS-Ramverk. Mitt namn är Jesper Nyhlén och studerar Webbutveckling vid Blekinge Tekniska Högskola. Denna plats kommer att vara min bas inom kursen och uppdateras med redovisningar samt annan information gällande detta kursmoment. Uppdateringar kommer ständigt ske, så det är bara att följa med!'
        // });
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
                        <p className='desc'>Jesper Nyhlén</p>
                        <h1>Lite om mig</h1>
                        <p>
                            Välkommen till min me-sida för kursen JS-Ramverk.
                            Mitt namn är Jesper Nyhlén och studerar
                            Webbutveckling vid Blekinge Tekniska Högskola.
                        </p>{' '}
                        <p>
                            Denna plats kommer att vara min bas inom kursen och
                            uppdateras med redovisningar samt annan information
                            gällande detta kursmoment. Uppdateringar kommer
                            ständigt ske, så det är bara att följa med!
                        </p>
                    </div>
                </div>
            </main>
        );
    }
}

export default Me;
