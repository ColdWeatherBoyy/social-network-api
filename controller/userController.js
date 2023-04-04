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
	// get single user
	async getSingleUser(req, res) {
		try {
			const user = await User.findOne({ _id: req.params.userId })
				// populating single user get requests with friends and thoughts subdocs
				.populate("friends")
				.populate("thoughts");
			res.status(200).json(user);
		} catch (err) {
			res.status(500).send({ message: err });
		}
	},
	// creates new user
	async createUser(req, res) {
		try {
			const user = await User.create(req.body);
			res.status(201).json(user);
		} catch (err) {
			res.status(500).send({ message: err });
		}
	},
	// deletes user
	async deleteUser(req, res) {
		try {
			const user = await User.findOneAndDelete({ _id: req.params.userId });
			if (!user) {
				return res.status(404).json({ message: "No user with that id found" });
			}
			// deleting associated thoughts
			const thoughts = await Thought.deleteMany({ _id: { $in: user.thoughts } });
			res.status(200).json({ message: "User and associated thoughts deleted" });
		} catch (err) {
			res.status(500).send({ message: err });
		}
	},
	// updating user
	async updateUser(req, res) {
		try {
			const user = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				// updates values from req.body
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
	// creates friends using two user documents
	async createFriend(req, res) {
		try {
			const friend = await User.findOne({ _id: req.params.friendId });
			const user = await User.findOne({ _id: req.params.userId });
			// various validations for no friend, no user, already added
			if (!friend) {
				res.status(404).send({ message: "Friend ID not found" });
			} else if (!user) {
				res.status(404).send({ message: "User ID not found" });
			} else if (user.friends.includes(friend)) {
				res.status(400).send({ message: "Friend already added" });
			}

			// adds friend as subdoc to user and saves
			user.friends.push(friend);
			await user.save();

			res.status(200).json(friend);
		} catch (err) {
			res.status(500).send({ message: err });
		}
	},
	// delete friend
	async deleteFriend(req, res) {
		try {
			// finds user
			const user = await User.findOne({ _id: req.params.userId });

			if (!user) {
				res.status(404).send({ message: "User ID not found" });
			} else if (!user.friends.includes(req.params.friendId)) {
				res.status(404).send({ message: "Friend ID not found" });
			}

			// pulls friend out of friends array and saves
			user.friends.pull(req.params.friendId);
			await user.save();

			res.status(200).send({ message: "Friend removed successfully" });
		} catch (err) {
			res.status(500).send({ message: err });
		}
	},
};
