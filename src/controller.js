const crypto = require('crypto');
const passport = require('koa-passport');
const jwt = require('jwt-simple');
const { TRUE } = require('node-sass');
const db = require('./db/db');
const validator = require('./validator');
const { UserDB } = require('./models/user/UserDB');

async function base(ctx) {
  const { userId } = ctx.request.params;
  const userResponse = await db.query(`SELECT * FROM "user" WHERE id = '${userId}'`);

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
  
  body.password = crypto.pbkdf2Sync(body.password, 'salt', 100000, 64, 'sha256').toString('hex');
  // console.log(body);

  const createUserResponse = await db.query(`INSERT INTO "user" (fname, lname, isActive, password, email) VALUES ('${body.fname}', '${body.lname}', ${body.active}, '${body.password}', '${body.email}') RETURNING *`);

  const user = { ...createUserResponse.rows[0] };
  
  // await ctx.redis.set(user.id, JSON.stringify(user));

  ctx.status = 201;
  ctx.body = {
    id: user.id,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
  };
}

async function signIn(ctx) {
  await passport.authenticate('local', (err, user) => {
    if (user) {
      ctx.body = user;
    } else {
      ctx.status = 400;
      if (err) {
        ctx.body = { error: err };
      }
    }
  })(ctx);
};

async function profile(ctx) {
  ctx.body = {
    success: true,
  };
}

async function refresh(ctx) {
  const token = ctx.headers.authorization.split(' ')[1];
  const decodedToken = jwt.decode(token, 'super_secret_refresh');

  if (decodedToken.expiresIn <= new Date().getTime()) {
    const error = new Error('Refresh token expired, please sign in into your account.');
    error.status = 400;

    throw error;
  }

  // const user = userResponse.rows[0];
  const user = await UserDB.getUserByEmail(decodedToken.email);

  const accessToken = {
    id: user.id,
    expiresIn: new Date().setTime(new Date().getTime() + 200000),
  };
  const refreshToken = {
    email: user.email,
    expiresIn: new Date().setTime(new Date().getTime() + 1000000),
  };

  ctx.body = {
    accessToken: jwt.encode(accessToken, 'super_secret'),
    accessTokenExpirationDate: accessToken.expiresIn,
    refreshToken: jwt.encode(refreshToken, 'super_secret_refresh'),
    refreshTokenExpirationDate: refreshToken.expiresIn,
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

async function userList(ctx) {
  const userListResponse = await db.query('SELECT * FROM "user"');

  const users = userListResponse.rows;

  ctx.body = {
    users,
  };
}

module.exports = {
  base,
  createUser,
  profile,
  refresh,
  signIn,
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
  userList,
};