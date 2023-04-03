const { User, Thought } = require("../models/index");

module.exports = {
	// get all users
	async getUsers(req, res) {
		try {
			const users = await User.find({});
			res.status(200).json(users);
		} catch (err) {
			res.status(500).send({ message: err });
		}
	},
	async getSingleUser(req, res) {
		try {
			const user = await User.findOne({ _id: req.params.userId });
			res.status(200).json(user);
		} catch (err) {
			res.status(500).send({ message: err });
		}
	},
	async createUser(req, res) {
		try {
			const user = await User.create(req.body);
			res.status(201).json(user);
		} catch (err) {
			res.status(500).send({ message: err });
		}
	},
	async deleteUser(req, res) {
		try {
			const user = await User.findOneAndDelete({ _id: req.params.userId });
			if (!user) {
				return res.status(404).json({ message: "No user with that id found" });
			}
			const thoughts = await Thought.deleteMany({ _id: { $in: user.thoughts } });
			res.status(200).json({ message: "User and associated thoughts deleted" });
		} catch (err) {
			res.status(500).send({ message: err });
		}
	},
	async updateUser(req, res) {
		try {
			const user = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $set: req.body },
				{ runValidators: true, new: true }
			);
			if (!user) {
				return res.status(404).json({ message: "No user with that id found" });
			}
			res.status(200).json(user);
		} catch (err) {
			res.status(500).send({ message: err });
		}
	},
};
