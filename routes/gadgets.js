const express = require('express');
const { getAllGadgets, addGadget, updateGadget, decommissionGadget, triggerSelfDestruct } = require('../controllers/gadgetController');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();

router.get('/gadgets', authenticateToken, getAllGadgets);
router.post('/gadgets', authenticateToken, addGadget);
router.patch('/gadgets/:id', authenticateToken, updateGadget);
router.delete('/gadgets/:id', authenticateToken, decommissionGadget);
router.post('/gadgets/:id/self-destruct', authenticateToken, triggerSelfDestruct);

module.exports = router;

/**
 * @swagger
 * /api/gadgets:
 *   get:
 *     summary: Retrieve all gadgets
 *     description: Get a list of all gadgets with a random success probability.
 *     responses:
 *       200:
 *         description: List of gadgets
 */

/**
 * @swagger
 * /api/gadgets/{id}/self-destruct:
 *   post:
 *     summary: Trigger gadget self-destruct
 *     description: Marks a gadget as "Destroyed" and returns a confirmation code.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Gadget ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Self-destruct initiated
 */
