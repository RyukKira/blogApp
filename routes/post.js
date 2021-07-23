const validatePost = require("../validators/post");
const storagePost = require("../Storage/MongoDB/post");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const post = await storagePost.getAll();
		return res.status(200).send(post);
	} catch (error) {
		return res.status(404).send("Not found in DB");
	}
});

router.get("/:id", async (req, res) => {
	try {
		const post = await storagePost.getOne(req.params.id);
		return res.status(200).send(post);
	} catch (error) {
		return res.status(404).send("Not found in DB with the given ID");
	}
});

router.post("/", async (req, res) => {
	try {
		const { error } = validatePost(req.body);
		if (error) throw new Error(error.message);

		const post = await storagePost.create(req.body);
		return res.status(201).send({ success: true, id: post });
	} catch (error) {
		return res.status(404).send("Create valid data, please");
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { error } = validatePost(req.body);
		if (error) throw new Error(error.message);

		const updatedPost = await storagePost.updateOne(req.params.id, req.body);
		return res.status(200).send({ id: updatedPost });
	} catch (error) {
		return res.status(404).send("Not found such ID in DB");
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const post = await storagePost.deleteOne(req.params.id);
		return res.status(200).send({ msg: post });
	} catch (error) {
		return res
			.status(404)
			.send("You are trying to delete something that does not exist");
	}
});

module.exports = router;
