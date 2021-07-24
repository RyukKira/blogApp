const setBase = require("./database-setup");
const storageUser = require("../Storage/MongoDB/users");
const model = require("../models/users");
const { test, expect } = require("@jest/globals");

setBase();

describe("Users", () => {
	let user;

	test("create new user", async () => {
		user = await storageUser.create({
			name: {
				firstName: "RyukKira",
			},
			email: "tursunov_khudoyberdi@mail.ru",
			password: "12345678",
		});

		expect(user.password).toEqual("12345678");
	});

	test("couldn't create new user", async () => {
		try {
			let falseUser = await storageUser.create({
				name: {
					lastName: "LightYagami",
				},
			});
		} catch (error) {
			expect(error.message).toEqual(
				"User validation failed: password: password field is required, email: email field is required, name.firstName: FirstName field is required"
			);
		}
	});

	test("give me one user", async () => {
		let findUser = await storageUser.getOne(user._id);
		expect(findUser._id).toEqual(user._id);
	});

	test("couldn't give me one user", async () => {
		try {
			let falseUser = await storageUser.getOne(
				String(user._id).substring(0, user._id.length - 2) + "e"
			);
		} catch (error) {
			expect(error.message).toEqual("Not found in DB");
		}
	});

	test("give me all users", async () => {
		let allUsers = await storageUser.getAll();
		expect(allUsers).toBeTruthy();
	});

	test("couldn't give me all users", async () => {
		try {
			let allFalse = await storageUser.getAll();
		} catch (error) {
			expect(error.message).toEqual("No users in DB");
		}
	});

	test("update user", async () => {
		let updatedUser = await storageUser.updateOne(user._id, {
			name: { firstName: "Naruto" },
		});
		expect(updatedUser.name.firstName).toEqual("Naruto");
	});

	test("couldn't update user", async () => {
		try {
			let falseUpdate = await storageUser.updateOne(user._id, { name: "" });
		} catch (error) {
			expect(error.message).toEqual("Not found in DB");
		}
	});

	test("delete user", () => {
		expect(storageUser.deleteOne(user._id)).toMatchObject({});
	});

	test("couldn't delete user", () => {
		try {
			storageUser.deleteOne(user._id);
		} catch (error) {
			expect(error.message).toEqual(
				"You are trying to delete something that does not exist"
			);
		}
	});
});
