const express = require("express");
const { Item } = require("../models");

const router = express.Router();
router.use(express.json());

// Define your routes here
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

router.patch("/:itemId", async (req, res) => {
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

module.exports = router;
