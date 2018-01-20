const express = require('express');
const router = express.Router();

const User = require('../models/users.js');
const Daily = require('../models/daily.js');
const Input = require('../models/input.js');


//GET ALL USER DAILIES
router.get('/', async (req, res) => {
  try {
    const loggedUser = await User.find({username: req.session.username});
    const userDailies = await Daily.find({user: loggedUser._id})
    res.status(200).json(userDailies);
  } catch (e) {
    res.status(400).json({err: e.message});
  }
});

//GET ONE DAILY AND ITS INPUTS
router.get('/:id', async (req, res) => {
  try {
    const oneDaily = await Daily.findById(req.params.id);
    const dailyInputs = await Input.find({daily: oneDaily._id});
    res.status(200).json(oneDaily, dailyInputs);
  } catch (e) {
    res.status(400).json({err: e.message});
  }
});

//CREATE NEW DAILY
router.post('/', async (req, res) => {
  try {
    const newDaily = await Daily.create(req.body);
    res.status(200).json(newDaily);
  } catch (e) {
    res.status(400).json({err: e.message});
  }
});

//CREATE NEW INPUT
router.post('/input', async (req, res) => {
  try {
    const newInput = await Input.create(req.body);
    res.status(200).json(newInput);
  } catch (e) {
    res.status(400).json({err: e.message});
  }
})

//UPDATE DAILY
router.put('/:id', async (req, res) => {
  try {
    const updatedDaily = await Daily.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedDaily);
  } catch (e) {
    res.status(400).json({err: e.message});
  }
});

//UPDATE INPUT
router.put('/input/:id', async (req, res) => {
  try {
    const updatedInput = await Input.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedInput);
  } catch (e) {
    res.status(400).json({err: e.message});
  }
});

//DELETE DAILY
router.delete('/:id', async (req, res) => {
  try {
    const deletedDaily = await Daily.findByIdAndRemove(req.params.id);
    const deletedInputs = Input.remove({daily: deletedDaily._id});
    res.status(200).json({message: 'Daily and its inputs have been deleted.'});
  } catch (e) {
    res.status(400).json({err: e.message});
  }
});

//DELETE INPUT
router.delete('/input/:id', async (req, res) => {
  try {
    const deletedInput = await Input.findByIdAndRemove(req.params.id);
    res.status(200).json({message: 'Input deleted.'});
  } catch (e) {
    res.status(400).json({err: e.message});
  }
});

module.exports = router;
