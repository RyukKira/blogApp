const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const Tag = mongoose.model(
	"Tag",
	mongoose.Schema({
		_id: {
			type: String,
			default: uuid(),
		},
		name: {
			type: String,
			required: [true, "Name field is required"],
		},
	})
);

module.exports = Tag;
