'use strict';

const express = require('express');
const { Cars } = require('../models/index.js');

const router = express.Router();

router.get('/cars', getCars);
router.get('/cars/:id', getOneCar);
router.post('/cars', createCar);
router.put('cars/:id', updateCar);
router.delete('/cars/:id', deleteCar);

async function createCar(req, res) {
  let CarData = req.body
  let addedCar = await Cars.create(CarData);
  res.status(200).json(addedCar);
}

async function getCars(req, res) {
  let allCars = await Cars.findAll();
  res.status(200).json(allCars);
}

async function getOneCar(req, res) {
  const id = req.params.id;
  let oneCar = await Cars.findOne({ where: { id: id } });
  res.status(200).json(oneCar);
}


async function updateCar(req, res) {
  const id = parseInt(req.params.id);
  const obj = req.body;
  let car = await Cars.update({ where: { id: id } });
  let updatedCar = await car.update(obj);
  res.status(200).json(updatedCar);
}

async function deleteCar(req, res) {
  const id = req.params.id;
  let deletedCar = await Cars.destroy({ where: { id: id } });
  res.status(200).json(deletedCar);
}

module.exports = router;
