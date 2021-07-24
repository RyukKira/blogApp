const logger = require("./config/logger");
const config = require("./config/index");
const express = require("express");
const mongoose = require("mongoose");
const categoryRouter = require("./routes/category");
const postRouter = require("./routes/post");
const tagRouter = require("./routes/tag");
const userRouter = require("./routes/users");

function main() {
	logger.info("Main function is running...");

	const mongoDBUrl =
		"mongodb://" +
		config.mongoHost +
		":" +
		config.mongoPort +
		"/" +
		config.mongoDatabase;

	logger.info(`Connecting to db: ${mongoDBUrl}`);

	mongoose
		.connect(mongoDBUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		})
		.then(() => {
			logger.info("Successfully connected to MongoDB");
		})
		.catch(error => {
			logger.error("Could not connect to MongoDB", { error: error });

			process.exit(1);
		});

	const app = express();
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());

	app.use("/category", categoryRouter);
	app.use("/post", postRouter);
	app.use("/tag", tagRouter);
	app.use("/users", userRouter);

	app.listen(config.HTTPPort, () => {
		logger.info(`Express server is running on PORT: ${config.HTTPPort}`);
	});
}

main();
