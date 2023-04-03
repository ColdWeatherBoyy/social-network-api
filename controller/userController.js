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
			const user = await User.findOne({ _id: req.params.userId }).populate("friends");
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
	async createFriend(req, res) {
		try {
			const friend = await User.findOne({ _id: req.params.friendId });
			const user = await User.findOne({ _id: req.params.userId });
			if (!friend) {
				res.status(404).send({ message: "Friend ID not found" });
			} else if (!user) {
				res.status(404).send({ message: "User ID not found" });
			} else if (user.friends.includes(friend)) {
				res.status(400).send({ message: "Friend already added" });
			}

			user.friends.push(friend);
			await user.save();

			res.status(200).json(friend);
		} catch (err) {
			res.status(500).send({ message: err });
		}
	},
	async deleteFriend(req, res) {
		try {
			const user = await User.findOne({ _id: req.params.userId });

			if (!user) {
				res.status(404).send({ message: "User ID not found" });
			} else if (!user.friends.includes(req.params.friendId)) {
				res.status(404).send({ message: "Friend ID not found" });
			}

			user.friends.pull(req.params.friendId);
			await user.save();

			res.status(200).send({ message: "Friend removed successfully" });
		} catch (err) {
			res.status(500).send({ message: err });
		}
	},
};
