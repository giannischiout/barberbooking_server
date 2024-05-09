const express = require('express');
const router = express.Router();
const { createBarber, getBarber, updateBarber, deleteBarber } = require('../controllers/barberController');

// Define barber routes
router.post('/', createBarber);
router.get('/:barberId', getBarber);
router.put('/:barberId', updateBarber);
router.delete('/:barberId', deleteBarber);

module.exports = router;