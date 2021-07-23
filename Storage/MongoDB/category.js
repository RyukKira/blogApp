const Category = require("../../models/category");

let storageCategory = {
	getAll: async () => {
		try {
			const categories = await Category.find();

			if (!categories) {
				return "Not found in DB";
			}

			return categories;
		} catch (error) {
			return error.message;
		}
	},
	getOne: async id => {
		try {
			let category = await Category.findOne({ _id: id });

			if (!category) {
				return "Not found in DB";
			}

			return category;
		} catch (error) {
			return error.message;
		}
	},
	create: async data => {
		try {
			const category = await Category.create(data);

			return category;
		} catch (error) {
			return error.message;
		}
	},
	updateOne: async (id, data) => {
		try {
			let category = await Category.findOneAndUpdate(
				{ _id: id },
				{ ...data },
				{ new: true }
			);

			if (!category) {
				return "Not found in DB";
			}

			return category;
		} catch (error) {
			return error.message;
		}
	},
	deleteOne: async id => {
		try {
			await Category.findByIdAndRemove({ _id: id });

			return "Deleted";
		} catch (error) {
			return error.message;
		}
	},
};

module.exports = storageCategory;
