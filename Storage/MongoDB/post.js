const Post = require("../../models/post");

let storagePost = {
	getAll: async () => {
		try {
			let posts = await Post.find();

			if (!posts) throw new Error("Not found in DB");

			return posts;
		} catch (error) {
			return error.message;
		}
	},

	getOne: async id => {
		try {
			let post = await Post.findOne({ _id: id });

			if (!post) throw new Error("Not found in DB");

			return post;
		} catch (error) {
			return error.message;
		}
	},

	create: async data => {
		try {
			const post = await Post.create(data);
			return post;
		} catch (error) {
			return error.message;
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
			return error.message;
		}
	},

	deleteOne: async id => {
		try {
			await Post.findByIdAndRemove({ _id: id });

			return "Deleted";
		} catch (error) {
			return error.message;
		}
	},
};

module.exports = storagePost;
