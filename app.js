const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const views = require('koa-views');
const serve = require('koa-static');
const globalRouter = require('./src/router');
const nunjucks = require('nunjucks');

const app = new Koa();

const router = new Router();

const nunjucksEnvironment = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(path.join(__dirname, '/src/templates'))
);

const port = process.env.PORT || 3000;

const render = views(path.join(__dirname, '/src/templates'), {
  extention: 'html',
  options: {
    nunjucksEnv: nunjucksEnvironment,
  },
  map: {
    html: 'nunjucks',
  },
});
// const render = views(path.join(__dirname, '/src/templates'), {
//   extension: 'njk',
//   map: {
//     html: 'nunjucks',
//   },
// });

app.use(render);
app.use(serve(path.join(__dirname, '/src/public')));

router.use('/', globalRouter.router.routes());

app.use(router.routes());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});