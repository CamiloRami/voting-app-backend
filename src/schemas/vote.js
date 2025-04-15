const Joi = require('joi')

const createVoteSchema = Joi.object({
  voterId: Joi.number().required(),
  candidateId: Joi.number().required()
})

module.exports = {
  createVoteSchema
}
