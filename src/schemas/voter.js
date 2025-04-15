const Joi = require('joi')

const getVoterSchema = Joi.object({
  document: Joi.string().required()
})

module.exports = {
  getVoterSchema
}
