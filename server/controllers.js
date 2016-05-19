'use strict';
const querystring = require('querystring');
const request = require('request');

function requestp(options) {
    return new Promise((resolve, reject) => {
        request(options, (err, response) => {
            if (!err) {
                return resolve(response);
            }
            reject(err);
        });
    });
}

module.exports = function(PAGE_TOKEN, VERIFY_TOKEN, logic)
{
    function sendMessage(options){
        if (options.senderId && options.messageText) {
            return requestp({
                url: 'https://graph.facebook.com/v2.6/me/messages',
                qs: {access_token: PAGE_TOKEN},
                method: 'POST',
                json: {
                    recipient: {id: options.senderId},
                    message: {text: options.messageText}
                }
            });
        }
        throw new Error('logic.react needs to return senderId and messageText');
    }

    function logMessage(options) {
        if (options.senderId && options.messageText && options.timestamp) {
            console.log('logging');
        }
        throw new Error('logic.react needs to return senderId, messageTest and timestamp');
    }

    return {
        react: ctx => {
            console.log('Reaction call!');
            const promises = ctx.request.body.entry
            .map(entry => {
                return entry.messaging
                .map(event => {
                    return logic.react(event)
                    .then()
                    .then(sendMessage);
                });
            });

            Promise.all(promises)
            .then(_ => ctx.status = 200)
            .catch(_ => ctx.status = 500);
        },
        verify: ctx => {
            console.log('Verification');
            const query = querystring.parse(ctx.request.url);
            if (query['hub.verify_token'] === VERIFY_TOKEN) {
                console.log('\t PASSED');
                ctx.body = query['hub.challenge'];
            } else {
                console.log('\t FAILED');
                ctx.body = 'Bad verify_token';
            }
        },
        hello: ctx => {
            console.log('TEST');
            ctx.body = 'Hello World';
        }
  };
};