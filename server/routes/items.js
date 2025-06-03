const express = require("express");
const { Item } = require("../models");

const router = express.Router();
router.use(express.json());

// Define your routes here
// GET /items
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.send(items);
  } catch (error) {
    next(error);
  }
});

// DELETE /items/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      const deletedItem = await item.destroy();
      res.json(deletedItem);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
