const Router = require('koa-router');

const controllers = require('./controller');

const router = new Router();

router.get('home', controllers.profile);

module.exports = {
  router,
};