const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const Category = mongoose.model(
	"Category",
	mongoose.Schema({
		_id: {
			type: String,
			default: uuidv4(),
		},
		name: {
			type: String,
			required: [true, "name field is required"],
			minlength: 6,
			maxlength: 30,
		},
	})
);

module.exports = Category;
