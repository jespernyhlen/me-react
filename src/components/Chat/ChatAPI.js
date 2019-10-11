// 'use strict';

const apiURL =
    process.env.NODE_ENV === 'local'
        ? 'http://localhost:8333/'
        : 'https://me-api.jespernyhlenjs.me/';

// const apiURL = 'http://localhost:8333/';

// const fs = require('fs');
// const path = require('path');

export function insertMessage(docs) {
    // fetch('http://localhost:8333/reports', {
    fetch(apiURL + 'insert', {
        method: 'post',
        body: JSON.stringify({
            time: docs.time,
            username: docs.username,
            message: docs.message
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function(res) {
            console.log(res);
            return res; //error here
        })
        .then(function(data) {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
}

export function getMessages() {
    // fetch('http://localhost:8333/reports')
    fetch(apiURL + 'list')
        .then(res => res.json())
        .then(response => returnMessages(response));

    // console.log('hasdas');
    // fetch(apiURL + 'list', {
    //     method: 'get',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    //     .then(res => res.json())
    //     .then(response => {
    //         console.log('hej');
    //     });
}

function returnMessages(response) {
    let messages = [];
    messages = response;

    return messages;
}
