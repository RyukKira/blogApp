const Category = require("../../models/category");

let storageCategory = {
	getAll: async () => {
		try {
			const categories = await Category.find();

			return categories;
		} catch (error) {
			throw new Error(error.message);
		}
	},

	getOne: async id => {
		try {
			let category = await Category.findOne({ _id: id });

			return category;
		} catch (error) {
			throw new Error(error.message);
		}
	},

	create: async data => {
		try {
			const category = await Category.create(data);

			return category;
		} catch (error) {
			throw new Error(error.message);
		}
	},

	updateOne: async (id, data) => {
		try {
			let category = await Category.findOneAndUpdate(
				{ _id: id },
				{ ...data },
				{ new: true }
			);

			return category;
		} catch (error) {
			throw new Error(error.message);
		}
	},

	deleteOne: async id => {
		try {
			await Category.findByIdAndRemove({ _id: id });

			return "Deleted";
		} catch (error) {
			throw new Error(error.message);
		}
	},
};

module.exports = storageCategory;
