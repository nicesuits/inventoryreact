const koa = require('koa');
const cors = require('@koa/cors');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const schema = require('./schema/schema');

const initDB = require('./database');

initDB();

const app = new koa();

app.listen(4000);
app.use(cors());
app.use(
  mount(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true
    })
  )
);

app.on('error', err => {
  log.error('Server Error: ', err);
});
