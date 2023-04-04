const router = require("express").Router();

const {
	getThoughts,
	getSingleThought,
	createThought,
	deleteThought,
	updateThought,
} = require("../../controller/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
	.route("/:thoughtId")
	.get(getSingleThought)
	.delete(deleteThought)
	.put(updateThought);
