const Post = require("../../models/post");

let storagePost = {
	getAll: async () => {
		try {
			let posts = await Post.find();

			return posts;
		} catch (error) {
			throw new Error(error.message);
		}
	},

	getOne: async id => {
		try {
			let post = await Post.findOne({ _id: id });

			return post;
		} catch (error) {
			throw new Error(error.message);
		}
	},

	create: async data => {
		try {
			const post = await Post.create(data);
			return post;
		} catch (error) {
			throw new Error(error.message);
		}
	},

	updateOne: async (id, data) => {
		try {
			let post = await Post.findOneAndUpdate(
				{ _id: id },
				{ ...data },
				{ new: true }
			);

			return post;
		} catch (error) {
			throw new Error(error.message);
		}
	},

	deleteOne: async id => {
		try {
			await Post.findByIdAndRemove({ _id: id });

			return "Deleted";
		} catch (error) {
			throw new Error(error.message);
		}
	},
};

module.exports = storagePost;
