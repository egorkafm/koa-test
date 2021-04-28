const Router = require('koa-router');

const controllers = require('./controller');

const router = new Router();

router.get('base', controllers.base);
router.get('user/:userId', controllers.base);
router.post('user', controllers.createUser);
router.get('signIn1', controllers.signIn1);
router.get('signIn2', controllers.signIn2);
router.get('signIn3', controllers.signIn3);
router.get('signIn4', controllers.signIn4);
router.get('signUp', controllers.signUp);
router.get('signUp1', controllers.signUp1);
// router.get('user/:userId', controllers.signUp1);
// router.post('user', controllers.createUser);
// router.get('signUp1', controllers.signUp1);
router.get('signUp2', controllers.signUp2);
router.get('signUp3', controllers.signUp3);
router.get('signUp4', controllers.signUp4);
router.get('signUp5', controllers.signUp5);
router.get('signUp6', controllers.signUp6);
// router.post('user', controllers.createUser);
router.get('profilePersonal', controllers.profilePersonal);
router.get('profileAccount', controllers.profileAccount);
router.get('searchResults', controllers.searchResults);
router.get('searchMap', controllers.searchMap);
router.get('adminPage', controllers.adminPage);
router.get('testIndex', controllers.testIndex);
router.get('index', controllers.index);
router.get('users', controllers.userList);

module.exports = {
  router,
};