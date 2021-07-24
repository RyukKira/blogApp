const setBase = require("./database-setup");
const storageCategory = require("../Storage/MongoDB/category");
const model = require("../models/category");
const { test, expect } = require("@jest/globals");

setBase();

describe("Category", () => {
	let category;

	test("create new category", async () => {
		category = await storageCategory.create({
			name: "Sports",
		});

		expect(category.name).toEqual("Sports");
	});

	test("couldn't create new category", async () => {
		try {
			let falseCategory = await storageCategory.create({
				name: "",
			});
		} catch (error) {
			expect(error.message).toEqual(
				"Category validation failed: name: name field is required"
			);
		}
	});

	test("give me one category", async () => {
		let findCategory = await storageCategory.getOne(category._id);
		expect(findCategory._id).toEqual(category._id);
	});

	test("couldn't give me one category", async () => {
		try {
			let falseCategory = await storageCategory.getOne(
				String(category._id).substring(0, category._id.length - 2) + "e"
			);
		} catch (error) {
			expect(error.message).toEqual("Not found in DB");
		}
	});

	test("give me all categories", async () => {
		let allCategories = await storageCategory.getAll();
		expect(allCategories).toBeTruthy();
	});

	test("couldn't give me all categories", async () => {
		try {
			let allFalse = await storageCategory.getAll();
		} catch (error) {
			expect(error.message).toEqual("No categories in DB");
		}
	});

	test("update category", async () => {
		let updatedCategory = await storageCategory.updateOne(category._id, {
			name: "Fashion",
		});
		expect(updatedCategory.name).toEqual("Fashion");
	});

	test("couldn't update category", async () => {
		try {
			let falseUpdate = await storageCategory.updateOne(category._id, {
				name: "",
			});
		} catch (error) {
			expect(error.message).toEqual("Not found in DB");
		}
	});

	test("delete category", () => {
		expect(storageCategory.deleteOne(category._id)).toMatchObject({});
	});

	test("couldn't delete category", () => {
		try {
			storageCategory.deleteOne(category._id);
		} catch (error) {
			expect(error.message).toEqual(
				"You are trying to delete something that does not exist"
			);
		}
	});
});
