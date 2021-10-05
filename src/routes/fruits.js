'use strict';

const express = require('express');
const { Fruits } = require('../models/index.js');

const router = express.Router();

router.post('/fruits', createFruit);
router.get('/fruits', getFruits);
router.get('/fruits/:id', getOneFruit);
router.put('/fruits/:id', updateFruit);
router.delete('/fruits/:id', deleteFruit);

async function createFruit(req, res) {
  let fruitData = req.body
  let addedFruit = await Fruits.create(fruitData);
  res.status(200).json(addedFruit);
}

async function getFruits(req, res) {
  let allFruits = await Fruits.findAll();
  res.status(200).json(allFruits);
}

async function getOneFruit(req, res) {
  const id = req.params.id;
  let oneFruit = await Fruits.findOne({ where: { id: id } });
  res.status(200).json(oneFruit);
}

async function updateFruit(req, res) {
  const id = parseInt(req.params.id);
  const obj = req.body;
  let fruit = await Fruits.findOne({ where: { id: id}})
  let updatedFruit = await fruit.update(obj);
  res.status(200).json(updatedFruit);
}

async function deleteFruit(req, res) {
  const id = req.params.id;
  let deletedFruit = await Fruits.destroy({ where: { id: id } });
  res.status(200).json(deletedFruit);
}

module.exports = router;
