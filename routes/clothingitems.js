const router = require("express").Router();
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingitems");

router.get("/", getItems);
router.put("/:itemId", updateItem);
router.post("/", createItem);
router.delete("/:itemId", deleteItem);

router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
