const Joi = require('joi');

const schema = Joi.object({
  fname: Joi.string().min(3).required(),
  lname: Joi.string().min(3).required(),
  active: Joi.bool().required(),
});

module.exports = {
  schema,
};