const express = require("express");
const app = express();
const mongoose = require("mongoose");
const categoryRouter = require("./routes/category");
const postRouter = require("./routes/post");
const tagRouter = require("./routes/tag");
const userRouter = require("./routes/users");

mongoose
	.connect("mongodb://localhost:27017/todos", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("Connected to MongoDB...");
	})
	.catch(err => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/category", categoryRouter);
app.use("/post", postRouter);
app.use("/tag", tagRouter);
app.use("/users", userRouter);

let port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is up and listening on ${port}...`));
