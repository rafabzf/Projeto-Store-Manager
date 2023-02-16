const Joi = require('joi');

const schema = Joi.number().integer().min(1).required();

const productRegisterSchema = Joi.object({ name: Joi.string().min(5).required() });

const salesRegisterSchema = Joi.object({
  productId: Joi.number().min(1).required(),

  quantity: Joi.number().min(1).required(),
});

module.exports = {
  schema,
  productRegisterSchema,
  salesRegisterSchema,
};