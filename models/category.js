const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Schema = mongoose.Schema;

const Category = new Schema({
	_id: {
		type: String,
		default: uuidv4(),
	},
	name: {
		type: String,
		required: [true, "name field is required"],
	},
});

module.exports = mongoose.model("Category", Category);
