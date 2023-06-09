const router = require("express").Router();

// imports in controller functions
const {
	getUsers,
	getSingleUser,
	createUser,
	deleteUser,
	updateUser,
	deleteFriend,
	createFriend,
} = require("../../controller/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(createFriend).delete(deleteFriend);

module.exports = router;
