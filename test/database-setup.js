const { mongoDatabase } = require("../config/index");
const config = require("../config/index");
const mongoose = require("mongoose");

module.exports = function setupDB() {
	// Connect to Mongoose
	beforeAll(async () => {
		return await mongoose.connect(
			`mongodb://localhost:27017/${config.mongoDatabase}`,
			{
				useNewUrlParser: true,
				useFindAndModify: false,
				useUnifiedTopology: true,
				serverSelectionTimeoutMS: 5000,
			}
		);
	});
};
