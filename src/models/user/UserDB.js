const crypto = require('crypto');

const db = require('../../db/db');

class UserDB {
  static async getUserById(id) {
    const userResponse = await db.query(`SELECT * FROM "user" WHERE id = ${id}`);

    if (!userResponse.rowCount) {
      throw new Error(`User does not exist`);
    }

    return { ...userResponse.rows[0] };
  }

  static async getUserByEmail(email) {
    const userResponse = await db.query(`SELECT * FROM "user" WHERE email = '${email}'`);

    if (!userResponse.rowCount) {
      throw new Error(`User does not exist with email: ${email}`);
    }

    return { ...userResponse.rows[0] };
  }

  static async checkPassword(email, password) {
    const userResponse = await db.query(`SELECT * FROM "user" WHERE email = '${email}'`);

    if (!userResponse.rowCount) {
      return { message: `User with email: ${email}, does not exist`, flag: false };
      // const err = new Error(`User with email: ${email}, does not exist`);
      // err.status = 404;
      // throw err;
    }

    const user = { ...userResponse.rows[0] };
    const passportHash = crypto.pbkdf2Sync(password, 'salt', 100000, 64, 'sha256').toString('hex');

    if (passportHash === user.password) {
      return {  user, flag: true };
    }
    return { message: 'Incorect password', flag: false };
  }
}

module.exports = { UserDB };