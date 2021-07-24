const storageTag = require("../Storage/MongoDB/tag");
const validateTag = require("../validators/tag");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const tags = await storageTag.getAll();
		return res.status(200).send(tags);
	} catch (error) {
		return res.status(404).send("Not found in DB");
	}
});

router.get("/:id", async (req, res) => {
	try {
		const tag = await storageTag.getOne(req.params.id);
		return res.status(200).send(tag);
	} catch (error) {
		return res.status(404).send("Not found in DB with the given ID");
	}
});

router.post("/", async (req, res) => {
	try {
		const { error } = validateTag(req.body);
		if (error) throw new Error(error.message);

		const tag = await storageTag.create(req.body);
		return res.status(201).send({ success: true, id: tag });
	} catch (error) {
		return res.status(404).send("Create valid data, please");
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { error } = validateTag(req.body);
		if (error) throw new Error(error.message);

		const updatedTag = await storageTag.updateOne(req.params.id, req.body);
		return res.status(200).send({ id: updatedTag });
	} catch (error) {
		return res.status(404).send("Not found such ID in DB");
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const tag = await storageTag.deleteOne(req.params.id);
		return res.status(200).send({ msg: tag });
	} catch (error) {
		return res
			.status(404)
			.send("You are trying to delete something that does not exist");
	}
});

module.exports = router;
