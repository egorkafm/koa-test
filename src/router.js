const Router = require('koa-router');

const controllers = require('./controller');

const router = new Router();

router.get('base', controllers.base);
router.get('signIn', controllers.signIn);
router.get('signUp', controllers.signUp);
router.get('profile', controllers.profile);
router.get('search', controllers.search);
router.get('testIndex', controllers.testIndex);
router.get('index', controllers.index);


module.exports = {
  router,
};