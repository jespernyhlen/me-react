// 'use strict';

const apiURL =
    process.env.NODE_ENV === 'local'
        ? 'http://localhost:8333/'
        : 'https://me-api.jespernyhlenjs.me/';

export async function insertMessage(docs) {
    try {
        let response = await fetch(apiURL + 'insert', {
            method: 'post',
            body: JSON.stringify({
                time: docs.time,
                username: docs.username,
                message: docs.message
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.text();
    } catch (err) {
        console.error(err);
        // Handle errors here
    }
}

export async function getMessages() {
    try {
        let response = await fetch(apiURL + 'list', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (err) {
        console.error(err);
        // Handle errors here
    }
}
