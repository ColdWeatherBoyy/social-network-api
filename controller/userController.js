const { User, Thought } = require("../models/index");

module.exports = {
	// get all users
	getUsers(req, res) {
		User.find({}, (err, users) => {
			if (err) {
				res.status(500).send({ message: err });
			} else {
				res.status(200).json(users);
			}
		});
	},
	getSingleUser(req, res) {
		User.findOne({ id: req.params.userId }, (err, user) => {
			if (err) {
				res.status(500).send({ message: err });
			} else {
				res.status(200).json(user);
			}
		});
	},
	createUser(req, res) {
		User.create({ username, email }, (err, user) => {
			if (err) {
				res.status(500).send({ message: err });
			} else {
				res.status(200).json(user);
			}
		});
	},
	deleteUser(req, res) {
		User.findOneAndDelete({ _id: req.params.userId }, (err, user) => {
			if (err) {
				res.status(500).send({ message: err });
			} else if (!user) {
				res.status(404).json({ message: "No user with that id found" });
			} else {
				Thought.deleteMany({ _id: { $in: user.thoughts } }, (err, results) => {
					if (err) {
						res.status(500).send({ message: err });
					} else {
						res.status(200).json({ message: "User and associated thoughts deleted" });
					}
				});
			}
		});
	},
	updateUser(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $set: { username, email } },
			{ runValidators: true, new: true },
			(err, user) => {
				if (err) {
					res.status(500).send({ message: err });
				} else if (!user) {
					res.status(404).json({ message: "No user with that id found" });
				} else {
					res.status(200).json(user);
				}
			}
		);
	},
};
