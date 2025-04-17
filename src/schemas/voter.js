const Joi = require('joi')

const getVoterSchema = Joi.object({
  document: Joi.string().required()
})

const createVoterSchema = Joi.object({
  document: Joi.string().required(),
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  sex: Joi.string().valid('M', 'F').required(),
  isCandidate: Joi.number().valid(0, 1).required()
})

module.exports = {
  getVoterSchema,
  createVoterSchema
}
