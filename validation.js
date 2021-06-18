const Joi = require("joi");

const registervalidate = (data) => {
	const schema = Joi.object({
		name: Joi.string().min(5).required(),
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
		mobile: Joi.number().min(10).required(),
	});
	return schema.validate(data);
};
module.exports.registervalidate = registervalidate;

