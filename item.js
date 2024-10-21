const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Create, Read, Update, Delete
router.post('/', async (req, res) => { res.json(await new Item(req.body).save()) });
router.get('/', async (req, res) => { res.json(await Item.find()) });
router.put('/:id', async (req, res) => { res.json(await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })) });
router.delete('/:id', async (req, res) => { await Item.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }) });

module.exports = router;
