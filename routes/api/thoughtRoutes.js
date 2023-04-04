const router = require("express").Router();

const {
	getThoughts,
	getSingleThought,
	createThought,
	deleteThought,
} = require("../../controller/thoughtController");
