const validateUser = require("../validators/users");
const storageUser = require("../Storage/MongoDB/users");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const user = await storageUser.getAll();
		return res.status(200).send(user);
	} catch (error) {
		return res.status(404).send("Not found in DB");
	}
});

router.get("/:id", async (req, res) => {
	try {
		const user = await storageUser.getOne(req.params.id);
		return res.status(200).send(user);
	} catch (error) {
		return res.status(404).send("Not found in DB with the given ID");
	}
});

router.post("/", async (req, res) => {
	try {
		const { error } = validateUser(req.body);
		if (error) throw new Error(error.message);

		const user = await storageUser.create(req.body);
		return res.status(201).send({ success: true, id: user });
	} catch (error) {
		return res.status(404).send("Create valid data, please");
	}
});

router.put("/:id", (req, res) => {
	try {
		const { error } = validateUser(req.body);
		if (error) throw new Error(error.message);

		const updatedUser = await storageUser.updateOne(req.params.id, req.body);
		return res.status(200).send({ id: updatedUser });
	} catch (error) {
		return res.status(404).send("Not found such ID in DB");
	}
});

router.delete("/:id", (req, res) => {
	try {
		const user = await storageUser.deleteOne(req.params.id);
		return res.status(200).send({ msg: user });
	} catch (error) {
		return res
			.status(404)
			.send("You are trying to delete something that does not exist");
	}
});

module.exports = router;
