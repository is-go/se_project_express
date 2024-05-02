const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingitems");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

module.exports = router;
