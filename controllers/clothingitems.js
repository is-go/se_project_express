const ClothingItem = require("../models/clothingitem");

const {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  SERVER_ERROR,
  FORBIDDEN_ERROR,
} = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log("Item created:", item);
      res.status(201).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_ERROR).send({
          message: "Invalid data, check inputs.",
        });
      }
      return res.status(SERVER_ERROR).send({
        message: "Sorry, an error has occurred on the server. Try again.",
      });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      return res.status(SERVER_ERROR).send({
        message: "Sorry, an error has occurred on the server. Try again.",
      });
    });
};

const deleteItem = (req, res) => {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      // Ensure owner and the user ID are both strings for comparison
      const itemOwnerId = item.owner.toString();
      const userId = req.user._id.toString();

      if (itemOwnerId !== userId) {
        return res.status(FORBIDDEN_ERROR).send({
          message: "The user is trying to remove the card of another user",
        });
      }

      // If the user is the owner; delete
      return ClothingItem.deleteOne({ _id: req.params.itemId })
        .then(() => {
          res.send({ message: "Item deleted" });
        })
        .catch((err) => {
          console.error(err);
          return res.status(SERVER_ERROR).send({
            message: "An error has occurred on the server",
          });
        });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({
          message: "Item not found.",
        });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST_ERROR).send({
          message: "Invalid item ID.",
        });
      }
      return res.status(SERVER_ERROR).send({
        message: "Sorry, an error has occurred on the server. Try again.",
      });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;
  const { _id: userId } = req.user;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: "Invalid, cannot like this item." });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({
          message: "The item you are trying to like could not be found.",
        });
      }
      return res.status(SERVER_ERROR).send({
        message: "Sorry, an error has occurred on the server. Try again.",
      });
    });
};

const dislikeItem = (req, res) => {
  console.log(req.user._id);
  const userId = req.user._id;
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .orFail()
    .then(() => res.send({ data: itemId }))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: "Invalid, cannot dislike this item." });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({
          message: "The item you are trying to unlike could not be found.",
        });
      }
      return res.status(SERVER_ERROR).send({
        message: "Sorry, an error has occurred on the server. Try again.",
      });
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
