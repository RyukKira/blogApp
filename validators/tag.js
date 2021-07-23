const Joi = require("joi");

const validateTag = tag => {
	const schema = Joi.object({
		name: Joi.string().trim().max(25).required(),
	});
	return schema.validate(tag);
};

module.exports = validateTag;
