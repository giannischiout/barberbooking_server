const express = require('express');
const router = express.Router();
const { createAppointmentType, getAppointmentType } = require('../controllers/appointmentTypeController');

router.post('/', createAppointmentType);
router.get('/:appointmentId', getAppointmentType);
module.exports = router;