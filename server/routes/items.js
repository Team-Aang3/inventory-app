const express = require("express");
const { Item } = require("../models");

const router = express.Router();
router.use(express.json());

// Define your routes here



 router.get('/items/:id', async (req, res) => {
    try {
      const item = await Item.findByPk(req.params.id)
      if(item) {
        res.json(item)
      } else {
        res.status(404).send('Item not found')
      }
    } catch (error) {
      res.status(500).send('Server error')
    }
  })

module.exports = router;
