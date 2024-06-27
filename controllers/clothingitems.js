const ClothingItem = require("../models/clothingitem");

const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const ForbiddenError = require("../errors/forbidden-err");

const createItem = (req, res, next) => {
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
        return next(new BadRequestError("Invalid data, check inputs."));
      }
      return next(err);
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      return next(err);
    });
};

const deleteItem = (req, res, next) => {
  ClothingItem.findById(req.params.itemId)
    .orFail(() => {
      throw new NotFoundError("Item not found.");
    })
    .then((item) => {
      const itemOwnerId = item.owner.toString();
      const userId = req.user._id.toString();
      if (itemOwnerId !== userId) {
        throw new ForbiddenError(
          "The user is trying to remove the card of another user",
        );
      }

      return ClothingItem.deleteOne({ _id: req.params.itemId })
        .then(() => {
          res.send({ message: "Item deleted" });
        })
        .catch((err) => {
          console.error(err);
          return next(err);
        });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID."));
      }
      return next(err);
    });
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;
  const { _id: userId } = req.user;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError(
        "The item you are trying to like could not be found.",
      );
    })
    .then((item) => res.json(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid, cannot like this item."));
      }
      return next(err);
    });
};

const dislikeItem = (req, res, next) => {
  const userId = req.user._id;
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError(
        "The item you are trying to unlike could not be found.",
      );
    })
    .then((item) => res.json(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid, cannot dislike this item."));
      }
      return next(err);
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
