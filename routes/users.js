const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const { getCurrentUser, updateUserProfile } = require("../controllers/users");
const { validateUserUpdate } = require("../middlewares/validation");

router.use(auth);
router.get("/me", getCurrentUser);
router.patch("/me", validateUserUpdate, updateUserProfile);

module.exports = router;
