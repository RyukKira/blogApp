const Tag = require("../../models/tag");

let storageTag = {
	getAll: async () => {
		try {
			const tags = await Tag.find();

			return tags;
		} catch (error) {
			throw new Error(error.message);
		}
	},

	getOne: async id => {
		try {
			const tag = await Tag.findOne({ _id: id });

			return tag;
		} catch (error) {
			throw new Error(error.message);
		}
	},

	create: async data => {
		try {
			let tag = await Tag.create(data);
			return tag;
		} catch (error) {
			throw new Error(error.message);
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
			throw new Error(error.message);
		}
	},

	deleteOne: async id => {
		try {
			await Tag.findByIdAndRemove({ _id: id });

			return "Deleted";
		} catch (error) {
			throw new Error(error.message);
		}
	},
};

module.exports = storageTag;
