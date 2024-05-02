const router = require("express").Router();
const { createUser, getUsers, getUserById } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userID", getUserById);
router.post("/", createUser);

module.exports = router;
