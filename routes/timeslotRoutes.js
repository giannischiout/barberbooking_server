const express = require('express');
const router = express.Router();
const { getAvailableTimeslots } = require('../controllers/timeslotController');

// Define barber routes
router.post('/', getAvailableTimeslots);


module.exports = router;