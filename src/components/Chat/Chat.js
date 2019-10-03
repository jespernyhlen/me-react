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
        this.mesRef = React.createRef();

        this.socket = io('https://socket-server.jespernyhlenjs.me');
        // this.socket = io('http://localhost:8300');

        this.getTime = () => {
            let today = new Date();
            let months = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ];
            let month = months[today.getMonth()];
            let day = ('0' + today.getDate()).slice(-2);

            let time =
                ('0' + today.getHours()).slice(-2) +
                ':' +
                ('0' + today.getMinutes()).slice(-2);

            return month + ' ' + day + ' ' + time;
        };

        this.sendMessage = e => {
            e.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                time: this.getTime(),
                author: ' ' + this.state.username,
                message: this.state.message
            });
            this.setState({ message: '' });
        };

        this.joinChat = e => {
            e.preventDefault();
            this.socket.emit('JOIN_CHAT', {
                time: this.getTime(),
                message: this.state.username + ' has joined the chat'
            });
            this.setState({
                activeUser: true
            });
        };

        this.leaveChat = e => {
            e.preventDefault();
            this.socket.emit('LEAVE_CHAT', {
                time: this.getTime(),
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
            this.scrollToBottom();
        };

        const joinMessage = data => {
            this.setState({
                messages: [...this.state.messages, data]
            });
            this.scrollToBottom();
        };

        const leaveMessage = data => {
            this.setState({
                messages: [...this.state.messages, data]
            });
            this.scrollToBottom();
        };
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        console.log(this.mesRef);
        this.mesRef.current.scrollTop = this.mesRef.current.scrollHeight;
    };
    render() {
        return (
            <main id='chat'>
                <div className='main-container register'>
                    <h1 className='center'>Chatt-klient</h1>
                    <p className='desc center'>
                        {' '}
                        Skriv in ett användarnamn för att delta i chatten
                    </p>
                    <div className='messages' ref={this.mesRef}>
                        {this.state.messages.map(message => {
                            return (
                                <div className='message-div'>
                                    <p className='message-time'>
                                        {message.time}
                                    </p>
                                    {message.author}
                                    {message.author ? ':' : null}{' '}
                                    <strong> {message.message}</strong>
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
                                onKeyDown={e => {
                                    if (e.keyCode == 13) {
                                        this.joinChat(e);
                                    }
                                }}
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
                                onKeyDown={e => {
                                    if (e.keyCode == 13) {
                                        this.sendMessage(e);
                                    }
                                }}
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
