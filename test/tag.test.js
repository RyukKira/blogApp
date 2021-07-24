const setBase = require("./database-setup");
const storageTag = require("../Storage/MongoDB/tag");
const model = require("../models/tag");
const { test, expect } = require("@jest/globals");

setBase();

describe("Tag", () => {
	let tag;

	test("create new tag", async () => {
		tag = await storageTag.create({
			name: "upForNewChallenge",
		});

		expect(tag.name).toEqual("upForNewChallenge");
	});

	test("couldn't create new tag", async () => {
		try {
			let falseTag = await storageTag.create({
				name: "",
			});
		} catch (error) {
			expect(error.message).toEqual(
				"Tag validation failed: name: Name field is required"
			);
		}
	});

	test("give me one tag", async () => {
		let findTag = await storageTag.getOne(tag._id);
		expect(findTag._id).toEqual(tag._id);
	});

	test("couldn't give me one tag", async () => {
		try {
			let falseTag = await storageTag.getOne(
				String(tag._id).substring(0, tag._id.length - 2) + "e"
			);
		} catch (error) {
			expect(error.message).toEqual("Not found in DB");
		}
	});

	test("give me all tags", async () => {
		let allTags = await storageTag.getAll();
		expect(allTags).toBeTruthy();
	});

	test("couldn't give me all tags", async () => {
		try {
			let allFalse = await storageTag.getAll();
		} catch (error) {
			expect(error.message).toEqual("No tags in DB");
		}
	});

	test("update tag", async () => {
		let updatedTag = await storageTag.updateOne(tag._id, {
			name: "throughBack",
		});
		expect(updatedTag.name).toEqual("throughBack");
	});

	test("couldn't update tag", async () => {
		try {
			let falseUpdate = await storageTag.updateOne(tag._id, {
				name: "",
			});
		} catch (error) {
			expect(error.message).toEqual("Not found in DB");
		}
	});

	test("delete tag", () => {
		expect(storageTag.deleteOne(tag._id)).toMatchObject({});
	});

	test("couldn't delete tag", () => {
		try {
			storageTag.deleteOne(tag._id);
		} catch (error) {
			expect(error.message).toEqual(
				"You are trying to delete something that does not exist"
			);
		}
	});
});
