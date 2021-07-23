const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const User = mongoose.model(
	"User",
	mongoose.Schema({
		_id: {
			type: String,
			default: uuidv4(),
		},
		name: {
			firstName: {
				type: String,
				required: [true, "FirstName field is required"],
				minlength: 6,
				maxlength: 15,
			},
			lastName: String,
			minlength: 8,
			maxlength: 16,
		},
		email: {
			type: String,
			required: [true, "email field is required"],
			unique: true,
			minlength: 8,
			maxlength: 50,
		},
		password: {
			type: String,
			required: [true, "password field is required"],
			unique: true,
			minlength: 8,
			maxlength: 30,
		},
	})
);

module.exports = User;
