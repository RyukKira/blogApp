const Joi = require("joi");

const validateUser = user => {
	const schema = Joi.object({
		name: {
			firstName: Joi.string().trim().min(6).max(15).required(),
			lastName: Joi.string().trim().min(6).max(18),
		},
		email: Joi.string().trim().min(10).max(50).required(),
		password: Joi.string().trim().min(8).max(32).required(),
	});
	return schema.validate(user);
};

module.exports = validateUser;
