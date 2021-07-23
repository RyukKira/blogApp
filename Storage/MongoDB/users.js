const User = require("../../models/users");

let storageUser = {
	getAll: async () => {
		try {
			const resultUser = await User.find();

			if (!resultUser) {
				return "No users in DB";
			}

			return resultUser;
		} catch (error) {
			return error.message;
		}
	},
	getOne: async id => {
		try {
			let user = await User.findOne({ _id: id });

			if (!user) {
				return "Not found in DB";
			}

			return user;
		} catch (error) {
			return error.message;
		}
	},
	create: async data => {
		try {
			const resultUser = await User.create(data);
			return resultUser;
		} catch (error) {
			return error.message;
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

			if (!user) {
				return "Not found in DB";
			}

			return user;
		} catch (error) {
			return error.message;
		}
	},
	deleteOne: async id => {
		try {
			await User.findByIdAndRemove({ _id: id });

			return "Deleted";
		} catch (error) {
			return "Not found";
		}
	},
};

module.exports = storageUser;
