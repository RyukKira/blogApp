const validateCategory = require("../validators/category");
const storageCategory = require("../Storage/MongoDB/category");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const categories = await storageCategory.getAll();
		return res.status(200).send(categories);
	} catch (error) {
		return res.status(404).send("Not found in DB");
	}
});

router.get("/:id", async (req, res) => {
	try {
		const category = await storageCategory.getOne(req.params.id);
		return res.status(200).send(category);
	} catch (error) {
		return res.status(404).send("Not found in DB with the given ID");
	}
});

router.post("/", async (req, res) => {
	try {
		const { error } = validateCategory(req.body);
		if (error) throw new Error(error.message);

		const category = await storageCategory.create(req.body);
		return res.status(201).send({ success: true, id: category });
	} catch (error) {
		return res.status(404).send("Create valid data, please");
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { error } = validateCategory(req.body);
		if (error) throw new Error(error.message);

		const updatedCategory = await storageCategory.updateOne(
			req.params.id,
			req.body
		);
		return res.status(200).send({ id: updatedCategory });
	} catch (error) {
		return res.status(404).send("Not found such ID in DB");
	}
});

router.delete();

module.exports = router;
