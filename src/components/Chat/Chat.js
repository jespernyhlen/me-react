import React, { Component } from 'react';
import io from 'socket.io-client';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeUser: false,
            username: '',
            message: '',
            messages: []
        };

        this.socket = io('localhost:8300');

        this.sendMessage = e => {
            e.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            });
            this.setState({ message: '' });
        };

        this.joinChat = e => {
            e.preventDefault();
            this.socket.emit('JOIN_CHAT', {
                message: this.state.username + ' has joined the chat'
            });
            this.setState({
                activeUser: true
            });
        };

        this.leaveChat = e => {
            e.preventDefault();
            this.socket.emit('LEAVE_CHAT', {
                message: this.state.username + ' has left the chat'
            });
            this.setState({
                activeUser: false,
                username: ''
            });
        };

        this.socket.on('RECEIVE_JOIN_MESSAGE', function(data) {
            joinMessage(data);
        });

        this.socket.on('RECEIVE_LEAVE_MESSAGE', function(data) {
            leaveMessage(data);
        });

        this.socket.on('RECEIVE_MESSAGE', function(data) {
            addMessage(data);
        });

        const addMessage = data => {
            this.setState({ messages: [...this.state.messages, data] });
        };

        const joinMessage = data => {
            this.setState({
                messages: [...this.state.messages, data]
            });
        };

        const leaveMessage = data => {
            this.setState({
                messages: [...this.state.messages, data]
            });
        };
    }
    render() {
        return (
            <main id='chat'>
                <div className='main-container register'>
                    <h1 className='center'>Chatt-klient</h1>
                    <p className='desc center'>
                        {' '}
                        Skriv in ett användarnamn för att delta i chatten
                    </p>
                    <div className='messages'>
                        {this.state.messages.map(message => {
                            return (
                                <div>
                                    {message.author}
                                    {message.author ? ':' : null}{' '}
                                    {message.message}
                                </div>
                            );
                        })}
                    </div>
                    <div className='form-group'>
                        {!this.state.activeUser ? (
                            <input
                                type='text'
                                placeholder='Username'
                                value={this.state.username}
                                onChange={e =>
                                    this.setState({
                                        username: e.target.value
                                    })
                                }
                                className='form-control'
                            />
                        ) : null}
                        <br />
                        {this.state.activeUser ? (
                            <input
                                type='text'
                                placeholder='Message'
                                className='form-control'
                                value={this.state.message}
                                onChange={e =>
                                    this.setState({
                                        message: e.target.value
                                    })
                                }
                            />
                        ) : null}
                    </div>

                    <br />
                    <div className='form-group btns evenly'>
                        {this.state.activeUser ? (
                            <button
                                onClick={this.sendMessage}
                                className='btn register'
                            >
                                Send
                            </button>
                        ) : null}
                        {this.state.activeUser ? (
                            <button
                                onClick={this.leaveChat}
                                className='btn reset'
                            >
                                Leave
                            </button>
                        ) : null}

                        {!this.state.activeUser ? (
                            <button
                                onClick={this.joinChat}
                                className='btn register'
                            >
                                Join
                            </button>
                        ) : null}
                    </div>
                </div>
            </main>
        );
    }
}

export default Chat;
