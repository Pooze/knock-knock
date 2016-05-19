'use strict';

function echo(event) {
    if (typeof event.message !== 'undefined' && event.message !== null && event.timestamp !== null) {
        return Promise.resolve({
            messageText: event.message.text,
            senderId: event.sender.id,
            timestamp: event.timestamp
        });
    } else {
        return Promise.resolve({});
    }
}

function backward(event) {
    if (typeof event.message !== 'undefined' && event.message !== null && event.timestamp !== null && typeof(event.message.text) == 'string') {
        return Promise.resolve({
            messageText: event.message.text.split("").reverse().join(""),
            senderId: event.sender.id,
            timestamp: event.timestamp
        });
    } else {
        return Promise.resolve({});
    }
}

module.exports = {
    react: backward
};