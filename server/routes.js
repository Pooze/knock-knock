'use strict';
const router = require('koa-router')();
const bodyparser = require('koa-bodyparser');

module.exports = function(controllers) {
    router.use(bodyparser());
    router.get('/webhook', controllers.verify);
    router.post('/', controllers.react);
    router.get('/test', controllers.hello);
    return router.routes();
};