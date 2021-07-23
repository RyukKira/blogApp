const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const User = require("./users");
const Category = require("./category");
const Tag = require("./tag");

const Post = mongoose.model(
	"Post",
	mongoose.Schema({
		_id: {
			type: String,
			default: uuidv4(),
		},
		userID: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "UserID field is required"],
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
			required: [true, "CategoryID field is required"],
		},
		tag: [
			{
				type: Schema.Types.ObjectId,
				ref: "Tag",
				required: [true, "Tag field is required"],
			},
		],
		author: {
			type: String,
		},
	})
);

module.exports = Post;
