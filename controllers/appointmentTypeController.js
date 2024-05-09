const {AppointmentType} = require('../models');

let response = {
    message: '',
    data: null,
    error: null
};





exports.createAppointmentType = async (req, res) => {
    try {
        const { typeName, duration, price } = req.body;
        let create = await AppointmentType.create({
            typeName,
            duration,
            price
        });
        if (!create) {
            response.message = 'Appointment Type not created';
            response.error = 'Appointment Type not created';
            return res.status(400).json(response);
        } else {
            response.message = 'Appointment Type created';
            response.data = create;
        }
        res.status(201).json(response);
    } catch (error) {
        console.error('Error creating appointment type:', error);
        response.message = 'Error creating appointment type';
        response.error = error.message;
        res.status(500).json(response);
    }
}



exports.getAppointmentType = async (req, res) => {
    try {
        let filter = {};
        const { appointmentTypeId } = req.params;
        if(appointmentTypeId) {
           filter = {_id: appointmentTypeId};
        }
        let appointmentType = await AppointmentType.find(filter);
        if (!appointmentType) {
            response.message = 'Appointment Type not found';
            response.error = 'Appointment Type not found';
            return res.status(404).json(response);
        } else {
            response.message = 'Appointment Type found';
            response.data = appointmentType;
        }
    }
    catch (e) {
        console.error('Error getting appointment type:', error);
        response.message = 'Error getting appointment type';
        response.error = error.message;
        res.status(500).json(response);
    }
}