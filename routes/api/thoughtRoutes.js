const router = require("express").Router();

// imports in controller functions
const {
	getThoughts,
	getSingleThought,
	createThought,
	deleteThought,
	updateThought,
	createReaction,
	deleteReaction,
} = require("../../controller/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
	.route("/:thoughtId")
	.get(getSingleThought)
	.delete(deleteThought)
	.put(updateThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
