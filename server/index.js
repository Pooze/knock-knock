'use strict';
const Koa = require('koa');
const server = new Koa();


const bot = require('../logic/bot');



// logger

server.use(function *(next){
	const start = new Date;
	yield next;
	const ms = new Date - start;
	console.log('%s %s - %s', this.method, this.url, ms);
});

// response

server.use(function *(){
  this.body = 'Hello World';
});

server.listen(process.env.PORT || 3000);
