const router = require("express").Router();

const {
	getUsers,
	getSingleUser,
	createUser,
	deleteUser,
	updateUser,
} = require("../../controller/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:id
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

module.exports = router;
