const db = require('./db/db');
const validator = require('./validator');

async function base(ctx) {
  const { userId } = ctx.request.params;
  const userResponse = await db.query(`SELECT * FROM "user" WHERE id = ${userId}`);

  // const userInRedis = await ctx.redis.get(userId);
  console.log(JSON.parse(userInRedis));

  if(!userResponse.rowCount) {
    ctx.throw(400, 'User doesn`t exist');
  }

  const name = userResponse.rows[0].fname;

  await ctx.render('base', { name });
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

async function signIn(ctx) {
  await ctx.render('signIn');
}

async function signUp(ctx) {
  await ctx.render('signUp');
}

async function profile(ctx) {
  await ctx.render('profile');
}

async function search(ctx) {
  await ctx.render('search');
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
  signIn,
  signUp,
  profile,
  search,
  testIndex,
  index,
};