const router = require("express").Router();
const { NOT_FOUND_ERROR } = require("../utils/errors");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingitems");

const { createUser, userLogin } = require("../controllers/users");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.post("/signup", createUser);
router.post("/signin", userLogin);

router.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: "Page not found." });
});

module.exports = router;
