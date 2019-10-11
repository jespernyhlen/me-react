import React, { Component } from 'react';
import io from 'socket.io-client';
import { insertMessage, getMessages } from './ChatAPI';

const apiURL = 'https://me-api.jespernyhlenjs.me';

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
            let data = {
                time: this.getTime(),
                username: this.state.username,
                message: this.state.message
            };
            this.socket.emit('SEND_MESSAGE', data);
            insertMessage(data);

            this.setState({ message: '' });
        };

        this.joinChat = e => {
            e.preventDefault();
            let data = {
                time: this.getTime(),
                username: this.state.username,
                message: `${this.state.username} has joined the chat`
            };
            this.socket.emit('JOIN_CHAT', data);

            insertMessage({
                time: this.getTime(),
                message: `${this.state.username} has joined the chat`
            });

            this.setState({
                activeUser: true
            });
        };

        this.leaveChat = e => {
            e.preventDefault();
            let data = {
                time: this.getTime(),
                username: this.state.username,
                message: `${this.state.username} has left the chat`
            };
            this.socket.emit('LEAVE_CHAT', data);
            insertMessage({
                time: this.getTime(),
                message: `${this.state.username} has left the chat`
            });

            this.setState({
                activeUser: false,
                username: ''
            });
        };

        this.socket.on('NEW_MESSAGE', function(data) {
            addMessage(data);
            // console.log(data);
        });

        const addMessage = data => {
            this.setState({ messages: [...this.state.messages, data] });

            this.scrollToBottom();
        };
    }

    componentDidMount() {
        fetch(apiURL + 'list')
            .then(res => res.json())
            .then(response => {
                this.setState({
                    messages: response
                });
            });
    }

    componentDidUpdate() {
        // console.log(this.state.messages);

        this.scrollToBottom();
    }

    scrollToBottom = () => {
        if (this.mesRef.current.scrollTop !== null) {
            this.mesRef.current.scrollTop = this.mesRef.current.scrollHeight;
        }

        // console.log(this.mesRef);
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
                                    {message.username}
                                    {message.username ? ':' : null}{' '}
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

// import React, { Component, useEffect, useState, useRef } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';

// import { insertMessage, getMessages } from './ChatAPI';
// const socket = io('http://localhost:8300');

// const Chat = () => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [activeUser, setActiveUser] = useState('');
//     const [username, setUsername] = useState('');
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);
//     socket.on('connect', function() {
//         console.info('Connected');
//     });

//     socket.on('disconnect', function() {
//         socket.removeAllListeners();
//     });
//     const apiURL = 'http://localhost:8333/';

//     const messagesEndRef = useRef(null);

//     // this.socket = io('https://socket-server.jespernyhlenjs.me');
//     const scrollToBottom = () => {
//         messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
//     };
//     const getTime = () => {
//         let today = new Date();
//         let months = [
//             'Jan',
//             'Feb',
//             'Mar',
//             'Apr',
//             'May',
//             'Jun',
//             'Jul',
//             'Aug',
//             'Sep',
//             'Oct',
//             'Nov',
//             'Dec'
//         ];
//         let month = months[today.getMonth()];
//         let day = ('0' + today.getDate()).slice(-2);

//         let time =
//             ('0' + today.getHours()).slice(-2) +
//             ':' +
//             ('0' + today.getMinutes()).slice(-2);

//         return month + ' ' + day + ' ' + time;
//     };

//     const sendMessage = e => {
//         e.preventDefault();
//         let data = {
//             time: getTime(),
//             username: username,
//             message: message
//         };
//         socket.emit('SEND_MESSAGE', data);
//         setMessage('');
//         insertMessage(data);
//     };

//     const joinChat = e => {
//         e.preventDefault();
//         let data = {
//             time: getTime(),
//             username: username
//         };

//         socket.emit('JOIN_CHAT', data);
//         setActiveUser(true);

//         insertMessage(data);
//     };

//     const leaveChat = e => {
//         e.preventDefault();
//         let data = {
//             time: getTime(),
//             username: username
//         };
//         socket.emit('LEAVE_CHAT', data);
//         setActiveUser(false);
//         setUsername('');

//         insertMessage(data);
//     };

//     socket.on('NEW_MESSAGE', function(data) {
//         addMessage(data);
//     });

//     const addMessage = data => {
//         setMessages([...messages, data]);
//         scrollToBottom();
//     };

//     useEffect(scrollToBottom, [messages]);

//     useEffect(() => {
//         const fetchHistory = async () => {
//             fetch(apiURL + 'list')
//                 .then(res => res.json())
//                 .then(response => {
//                     setMessages(response);
//                 });
//         };
//         fetchHistory();
//     }, []);

//     return (
//         <main id='chat'>
//             <div className='main-container register'>
//                 <h1 className='center'>Chatt-klient</h1>
//                 <p className='desc center'>
//                     {' '}
//                     Skriv in ett användarnamn för att delta i chatten
//                 </p>
//                 <div className='messages'>
//                     {messages.map(message => {
//                         return (
//                             <div className='message-div'>
//                                 <p className='message-time'>{message.time}</p>
//                                 {message.username}
//                                 {message.username ? ':' : null}{' '}
//                                 <strong> {message.message}</strong>
//                             </div>
//                         );
//                     })}
//                     <div ref={messagesEndRef} />
//                 </div>
//                 <div className='form-group'>
//                     {!activeUser ? (
//                         <input
//                             type='text'
//                             placeholder='Username'
//                             value={username}
//                             onKeyDown={e => {
//                                 if (e.keyCode == 13) {
//                                     joinChat(e);
//                                 }
//                             }}
//                             onChange={e => setUsername(e.target.value)}
//                             className='form-control'
//                         />
//                     ) : null}
//                     <br />
//                     {activeUser ? (
//                         <input
//                             type='text'
//                             placeholder='Message'
//                             className='form-control'
//                             value={message}
//                             onKeyDown={e => {
//                                 if (e.keyCode == 13) {
//                                     sendMessage(e);
//                                 }
//                             }}
//                             onChange={e => setMessage(e.target.value)}
//                         />
//                     ) : null}
//                 </div>

//                 <br />
//                 <div className='form-group btns evenly'>
//                     {activeUser ? (
//                         <button onClick={sendMessage} className='btn register'>
//                             Send
//                         </button>
//                     ) : null}
//                     {activeUser ? (
//                         <button onClick={leaveChat} className='btn reset'>
//                             Leave
//                         </button>
//                     ) : null}

//                     {!activeUser ? (
//                         <button onClick={joinChat} className='btn register'>
//                             Join
//                         </button>
//                     ) : null}
//                 </div>
//             </div>
//         </main>
//     );
// };

// export default Chat;
