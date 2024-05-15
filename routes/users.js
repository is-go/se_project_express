const router = require("express").Router();
// const { createUser, getUsers, getUserById } = require("../controllers/users");
const { auth } = require("../middlewares/auth");
const { getCurrentUser, updateUser } = require("../controllers/users");

router.use(auth);
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUser);

// router.get("/", getUsers);
// router.get("/:userid", getUserById);
// router.post("/", createUser);

module.exports = router;
