const Joi = require('joi');

const schema = Joi.object({
  fname: Joi.string().min(3).required(),
  lname: Joi.string().min(3).required(),
  active: Joi.bool().required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
});

module.exports = {
  schema,
};