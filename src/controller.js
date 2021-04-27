const db = require('./db/db');
const validator = require('./validator');

async function base(ctx) {
  const { userId } = ctx.request.params;
  const userResponse = await db.query(`SELECT * FROM "user" WHERE id = ${userId}`);

  // const userInRedis = await ctx.redis.get(userId);
  // console.log(JSON.parse(userInRedis));

  if(!userResponse.rowCount) {
    ctx.throw(400, 'User doesn`t exist');
  }

  const user = userResponse.rows[0];
  ctx.body = {
    user,
  };
  // const name = userResponse.rows[0].fname;

  // await ctx.render('base', { name });
}

async function createUser(ctx) {
  const { body } = ctx.request;

  await validator.schema.validateAsync(body);
  
  // console.log(body);

  const createUserResponse = await db.query(`INSERT INTO "user" (fname, lname, isActive) VALUES ('${body.fname}', '${body.lname}', ${body.active}) RETURNING *`);

  const user = { ...createUserResponse.rows[0] };
  
  // await ctx.redis.set(user.id, JSON.stringify(user));

  ctx.status =201;
  ctx.body = {
    id: user.id,
    fname: user.fname,
    lname: user.lname,
  };
}

async function signIn1(ctx) {
  await ctx.render('signIn1');
}

async function signIn2(ctx) {
  await ctx.render('signIn2');
}

async function signIn3(ctx) {
  await ctx.render('signIn3');
}

async function signIn4(ctx) {
  await ctx.render('signIn4');
}

async function signUp(ctx) {
  await ctx.render('signUp');
}

async function signUp1(ctx) {
  await ctx.render('signUp1');
}

async function signUp2(ctx) {
  await ctx.render('signUp2');
}

async function signUp3(ctx) {
  await ctx.render('signUp3');
}

async function signUp4(ctx) {
  await ctx.render('signUp4');
}

async function signUp5(ctx) {
  await ctx.render('signUp5');
}

async function signUp6(ctx) {
  await ctx.render('signUp6');
}

async function profilePersonal(ctx) {
  await ctx.render('profilePersonal');
}

async function profileAccount(ctx) {
  await ctx.render('profileAccount');
}

async function searchResults(ctx) {
  await ctx.render('searchResults');
}

async function searchMap(ctx) {
  await ctx.render('searchMap');
}

async function adminPage(ctx) {
  await ctx.render('adminPage');
}

async function testIndex(ctx) {
  await ctx.render('testIndex');
}

async function index(ctx) {
  await ctx.render('index');
}

module.exports = {
  base,
  createUser,
  signIn1,
  signIn2,
  signIn3,
  signIn4,
  signUp,
  signUp1,
  signUp2,
  signUp3,
  signUp4,
  signUp5,
  signUp6,
  profilePersonal,
  profileAccount,
  searchResults,
  searchMap,
  adminPage,
  testIndex,
  index,
};