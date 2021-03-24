async function profile(ctx) {
  await ctx.render('index', {
    name: 'Stella',
  });

  // ctx.body = {};
}

module.exports = {
  profile,
};