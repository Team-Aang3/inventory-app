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

//GET item by id
router.get("/items/:id", async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).send("Item not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

//POST new item
router.post("/add", async (req, res) => {
  try {
    //check if item already exists
    const item = await Item.findOne({ where: { name: req.body.name } });

    //error handling
    if (!item) {
      //create item
      const newItem = await Item.create(req.body);
      //return
      res.status(201).json({ message: "Item Created", newItem });
    } else {
      return res.status(400).json({ message: "Item already exists" });
    }
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//UPDATE existing item
router.put("/:itemId", async (req, res) => {
  try {
    //find item
    const item = await Item.findByPk(req.params.itemId);

    //check if exists
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    //update item
    const updateItem = await item.update(req.body);

    //return
    res.status(200).json({ message: "Item Updated", updateItem });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
