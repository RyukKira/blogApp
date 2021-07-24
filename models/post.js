const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const User = require("./users");
const Category = require("./category");
const Tag = require("./tag");
const Schema = mongoose.Schema;

const Post = new Schema({
	_id: {
		type: String,
		default: uuidv4(),
	},
	title: {
		type: String,
		required: [true, "Title field is required"],
	},
	body: {
		type: String,
		required: [true, "Body field is required"],
	},
	categoryID: {
		type: Schema.Types.ObjectId,
		ref: "Category",
	},
	tag: [
		{
			type: Schema.Types.ObjectId,
			ref: "Tag",
		},
	],
	author: {
		type: String,
	},
});

module.exports = mongoose.model("Post", Post);
