const connection = require("../config/connection");
const { Thought, User } = require("../models/index");
const { users } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
	console.log("connected");

	await Thought.deleteMany({});
	await User.deleteMany({});

	await User.collection.insertMany(users);

	console.table(users);
	console.info("Seeding complete! 🌱");
	process.exit(0);
});
