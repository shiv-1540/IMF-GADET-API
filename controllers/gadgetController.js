const Gadget = require('../models/Gadget');
const { v4: uuidv4 } = require('uuid');

const getAllGadgets = async (req, res) => {
  try {
    const gadgets = await Gadget.findAll();
    const gadgetsWithProbability = gadgets.map(gadget => ({
      ...gadget.dataValues,
      missionSuccessProbability: `${Math.floor(Math.random() * 100)}%`,
    }));
    res.json(gadgetsWithProbability);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const addGadget = async (req, res) => {
  try {
    const { name } = req.body;
    const newGadget = await Gadget.create({ name });
    res.status(201).json(newGadget);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create gadget' });
  }
};

const updateGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    await Gadget.update({ name, status }, { where: { id } });
    res.json({ message: 'Gadget updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update gadget' });
  }
};

const decommissionGadget = async (req, res) => {
  try {
    const { id } = req.params;
    await Gadget.update(
      { status: 'Decommissioned', decommissionedAt: new Date() },
      { where: { id } }
    );
    res.json({ message: 'Gadget decommissioned' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to decommission gadget' });
  }
};

const triggerSelfDestruct = async (req, res) => {
  try {
    const { id } = req.params;
    const confirmationCode = uuidv4();
    await Gadget.update({ status: 'Destroyed' }, { where: { id } });
    res.json({ message: 'Self-destruct triggered', confirmationCode });
  } catch (err) {
    res.status(500).json({ message: 'Failed to trigger self-destruct' });
  }
};

module.exports = { getAllGadgets, addGadget, updateGadget, decommissionGadget, triggerSelfDestruct };
