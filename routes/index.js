const router = require("express").Router();
const NotFoundError = require("../errors/not-found-err");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingitems");

const { createUser, userLogin } = require("../controllers/users");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.post("/signup", createUser);
router.post("/signin", userLogin);

router.use((req, res, next) => {
  next(new NotFoundError("Page not found."));
});

module.exports = router;
