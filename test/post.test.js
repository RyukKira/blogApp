const setBase = require("./database-setup");
const storagePost = require("../Storage/MongoDB/post");
const model = require("../models/post");
const { test, expect } = require("@jest/globals");

setBase();

describe("Post", () => {
	let post;

	test("create new post", async () => {
		post = await storagePost.create({
			title: "Let's learn something",
			body: "I am always trying to learn as much as possible as I can.",
		});

		expect(post.title).toEqual("Let's learn something");
	});

	test("couldn't create new post", async () => {
		try {
			let falsePost = await storagePost.create({
				title: "",
			});
		} catch (error) {
			expect(error.message).toEqual(
				"Post validation failed: body: Body field is required, title: Title field is required"
			);
		}
	});

	test("give me one post", async () => {
		let findPost = await storagePost.getOne(post._id);
		expect(findPost._id).toEqual(post._id);
	});

	test("couldn't give me one post", async () => {
		try {
			let falsePost = await storagePost.getOne(
				String(post._id).substring(0, post._id.length - 2) + "e"
			);
		} catch (error) {
			expect(error.message).toEqual("Not found in DB");
		}
	});

	test("give me all posts", async () => {
		let allPosts = await storagePost.getAll();
		expect(allPosts).toBeTruthy();
	});

	test("couldn't give me all posts", async () => {
		try {
			let allFalse = await storagePost.getAll();
		} catch (error) {
			expect(error.message).toEqual("No posts in DB");
		}
	});

	test("update post", async () => {
		let updatedPost = await storagePost.updateOne(post._id, {
			title: "Let's not switch back",
		});
		expect(updatedPost.title).toEqual("Let's not switch back");
	});

	test("couldn't update post", async () => {
		try {
			let falseUpdate = await storagePost.updateOne(post._id, {
				title: "",
			});
		} catch (error) {
			expect(error.message).toEqual("Not found in DB");
		}
	});

	test("delete post", () => {
		expect(storagePost.deleteOne(post._id)).toMatchObject({});
	});

	test("couldn't delete post", () => {
		try {
			storagePost.deleteOne(post._id);
		} catch (error) {
			expect(error.message).toEqual(
				"You are trying to delete something that does not exist"
			);
		}
	});
});
