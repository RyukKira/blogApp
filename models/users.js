const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Schema = mongoose.Schema;

const User = new Schema({
	_id: {
		type: String,
		default: uuidv4(),
	},
	name: {
		firstName: {
			type: String,
			required: [true, "FirstName field is required"],
		},
		lastName: String,
	},
	email: {
		type: String,
		required: [true, "email field is required"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "password field is required"],
	},
});

module.exports = mongoose.model("User", User);
