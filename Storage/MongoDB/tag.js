const Tag = require("../../models/tag");

let storageTag = {
	getAll: async () => {
		try {
			const tags = await Tag.find();

			if (!tags) throw new Error("Not found in DB");

			return tags;
		} catch (error) {
			return error.message;
		}
	},

	getOne: async id => {
		try {
			const tag = await Tag.findOne({ _id: id });

			if (!tag) throw new Error("Not found in DB");

			return tag;
		} catch (error) {
			return error.message;
		}
	},

	create: async data => {
		try {
			let tag = await Tag.create(data);
			return tag;
		} catch (error) {
			return error.message;
		}
	},

	updateOne: async (id, data) => {
		try {
			let tag = await Tag.findOneAndUpdate(
				{ _id: id },
				{ ...data },
				{ new: true }
			);

			return tag;
		} catch (error) {
			return error.message;
		}
	},

	deleteOne: async id => {
		try {
			await Tag.findByIdAndRemove({ _id: id });

			return "Deleted";
		} catch (error) {
			return error.message;
		}
	},
};

module.exports = storageTag;
