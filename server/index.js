'use strict';
const Koa = require('koa');
const server = new Koa();


const bot = require('../logic/bot');



// logger
server.use((ctx, next) => {
    const start = new Date();
    return next().then(() => {
        const ms = new Date() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
});


// response
const controllers = require('./controllers')(
  process.env.PAGE_TOKEN,
  process.env.VERIFY_TOKEN,
  bot
);
const routes = require('./routes')(controllers);


server.use(routes);

server.listen(process.env.PORT || 3000, () => console.log('Server started on port 3000'));

