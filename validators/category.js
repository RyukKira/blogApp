const Joi = require("joi");

const validateCategory = category => {
	const schema = Joi.object({
		name: Joi.string().trim().min(5).max(32).required(),
	});
	return schema.validate(category);
};

module.exports = validateCategory;
