const LocalStrategy = require('passport-local');
const jwt = require('jwt-simple');

const { UserDB } = require('../../models/user/UserDB');

const opts = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false,
};

module.exports = new LocalStrategy(opts, async (req, email, password, done) => {
  UserDB.checkPassword(email, password).then((checkPasswordResponse) => {
    if (!checkPasswordResponse.flag) {
      return done({ message: checkPasswordResponse.message }, false);
    }

    const { user } = checkPasswordResponse;

    const accessTokenPayload = {
      id: user.id,
      expiresIn: new Date().setTime(new Date().getTime() + 2000000),
    };

    const refreshTokenPayload = {
      email: user.email,
      expiresIn: new Date().setTime(new Date().getTime() + 1000000),
    };

    const accessToken = jwt.encode(accessTokenPayload, 'super_secret');
    const refreshToken = jwt.encode(refreshTokenPayload, 'super_secret_refresh');
    user.tokens = { accessToken, refreshToken };
    // const responseData = user.getInfo();

    // responseData.tokens = {
    //   accessToken: jwt.encode(accessToken, 'super_secret'),
    //   accessTokenExpirationDate: accessToken.expiresIn,
    //   refreshToken: jwt.encode(refreshToken, 'super_secret_refresh'),
    //   refreshTokenExpirationDate: refreshToken.expiresIn,
    // };

    return done(null, user);
  }).catch((err) => done({ message: err.message }, false));
});