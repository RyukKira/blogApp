const Joi = require("joi");

const validatePost = post => {
	const schema = Joi.object({
		title: Joi.string().trim().min(8).max(50).required(),
		body: Joi.string().trim().required(),
		author: Joi.string().min(8).max(32),
	});
	return schema.validate(post);
};

module.exports = validatePost;
