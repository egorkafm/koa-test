async function base(ctx) {
  await ctx.render('base');
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
  signIn,
  signUp,
  profile,
  search,
  testIndex,
  index,
};