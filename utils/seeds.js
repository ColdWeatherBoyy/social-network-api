const connection = require("../config/connection");
const { Thought, User } = require("../models/index");
const { users, thoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
	console.log("connected");

	// clear models/tables
	await Thought.deleteMany({});
	await User.deleteMany({});

	// seed Thought
	await Thought.collection.insertMany(thoughts);

	// finds and pulls the thoughts into an array with their id values accessible
	const createdThoughts = await Thought.find().lean();

	// updates user data with newly created IDs
	const userWithThoughts = users.map((user) => {
		user.thoughts = createdThoughts
			.filter((thought) => thought.username === user.username)
			.map((thought) => thought._id);
		return user;
	});

	// seed User with updated data
	await User.collection.insertMany(userWithThoughts);

	console.table(users);
	console.table(thoughts);
	console.info("Seeding complete! 🌱");
	process.exit(0);
});
