const User = require("../../models/users");

let storageUser = {
	getAll: async () => {
		try {
			const resultUser = await User.find();

			return resultUser;
		} catch (error) {
			throw new Error("No users in DB");
		}
	},

	getOne: async id => {
		try {
			let user = await User.findOne({ _id: id });

			return user;
		} catch (error) {
			throw new Error(error.message);
		}
	},

	create: async data => {
		try {
			const resultUser = await User.create(data);
			return resultUser;
		} catch (error) {
			throw new Error(error.message);
		}
	},

	updateOne: async (id, data) => {
		try {
			let user = await User.findOneAndUpdate(
				{
					_id: id,
				},
				{ ...data },
				{ new: true }
			);

			return user;
		} catch (error) {
			throw new Error(error.message);
		}
	},

	deleteOne: async id => {
		try {
			await User.findByIdAndRemove({ _id: id });

			return "Deleted";
		} catch (error) {
			throw new Error(error.message);
		}
	},
};

module.exports = storageUser;
