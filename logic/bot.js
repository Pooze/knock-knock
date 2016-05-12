'use strict';

function echo(event) {
    if (typeof event.message !== 'undefined' && event.message !== null) {
    	console.log('Got a message!');
        return Promise.resolve({
            messageText: event.message.text,
            senderId: event.sender.id
        });
    } else {
        return Promise.resolve({});
    }
}

module.exports = {
    react: echo
};