const { User, Thought } = require("../models/index");
const { reactionSchema } = require("../models/Reaction");

module.exports = {
	// get all thoughts
	async getThoughts(req, res) {
		try {
			const thoughts = await Thought.find({});
			res.status(200).json(thoughts);
		} catch (err) {
			res.status(500).send({ message: err });
		}
	},
	// get a single thought by _id
	async getSingleThought(req, res) {
		try {
			const thought = await Thought.find({ _id: req.params.thoughtId });
			res.status(200).json(thought);
		} catch (err) {
			res.status(500).send({ message: err });
		}
	},
	// create a new thought (push created thought to associated uer's thoughts array)
	async createThought(req, res) {
		try {
			const thought = await Thought.create(req.body);

			const user = await User.findOneAndUpdate(
				{ _id: req.body.userId },
				{ $addToSet: { thoughts: thought._id } },
				{ new: true }
			);

			// check if user found
			if (!user) {
				return res
					.status(404)
					.send({ message: "User not found, but application created" });
			}

			res
				.status(202)
				.json(
					`"${thought.thoughtText}" is created and added to ${user.username}'s thoughts`
				);
		} catch (err) {
			res.status(500).send({ message: err });
		}
	},
	// update a thought by id
	async updateThought(req, res) {
		try {
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $set: req.body },
				{ runValidators: true, new: true }
			);

			if (!thought) {
				return res.status(404).json({ message: "No thought with that ID found" });
			}

			res.status(200).json({ message: thought });
		} catch (err) {
			res.status(500).send({ message: err });
		}
	},
	// delete a thought by id (remove from user array also)
	async deleteThought(req, res) {
		try {
			const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

			if (!thought) {
				return res.status(404).json({ message: "No thought with that ID found" });
			}

			const user = await User.findOneAndUpdate(
				{ thoughts: req.params.thoughtId },
				{ pull: { thoughts: req.params.thoughtId } },
				{ runValidators: true, new: true }
			);

			if (!user) {
				return res
					.status(404)
					.json({ message: "Thought deleted, but no user with that ID found)" });
			}
			res.status(200).json({ message: "Thought deleted and removed from User document" });
		} catch (err) {
			res.status(500).send({ message: err });
		}
	},
	async createReaction(req, res) {
		try {
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $addToSet: { reactions: req.body } },
				{ runValidators: true, new: true }
			);

			if (!thought) {
				return res.status(404).json({ message: "No thought with that ID found" });
			}

			res.status(200).json(thought);
		} catch (err) {
			res.status(500).send({ message: err });
		}
	},
	async deleteReaction(req, res) {
		try {
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $pull: { reactions: { reactionId: req.params.reactionId } } },
				{ runValidators: true, new: true }
			);

			res.status(200).json({ thought });
		} catch (err) {
			res.status(500).send({ message: err });
		}
	},
};
