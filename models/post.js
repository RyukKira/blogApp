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
			minlength: 6,
			maxlength: 20,
		},
		body: {
			type: String,
			required: [true, "Body field is required"],
			minlength: 15,
			maxlength: 1000,
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
			minlength: 5,
			maxlength: 30,
		},
	})
);

module.exports = Post;
