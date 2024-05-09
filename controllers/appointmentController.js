const {Appointment} = require('../models');
const { addMinutes, format, parse } = require('date-fns');



exports.getAppointments = async (req, res) => {

    let response = {
        message: '',
        data: null,
        error: null
    };
    
    const { date } = req.query;
  
  
    try {
        const appointments = await Appointment.find({date: date}).populate('barber').populate('appointmentType').exec();
        response.count = appointments.length;
        response.data = appointments;
        response.message = 'Appointments retrieved';

        let newappointments = [
            {
                startTime: "10:00 π.μ.",
                endTime: "10:30 π.μ"
            },
            {
                startTime: "12:00 μ.μ.",
                endTime:  "12:30 μ.μ."
            },
            {
                startTime: "12:30 μ.μ.",
                endTime:  "13:00 μ.μ."
            }
        ]
        let slots = createTimeSlots(newappointments, new Date(date));
        // console.log('slots')
        // console.log(slots)
        res.status(200).json(response);
    } catch (error) {
        console.error('Error retrieving appointments:', error);
        response.message = 'Error retrieving appointments';
        response.error = error.message;
        res.status(500).json(response);
    }
}



exports.createAppointment = async (req, res) => {
    let response = {
        message: '',
        data: null,
        error: null
    };
    try {
        const { user, barber, appointmentType, date, endTime, startTime } = req.body;

        console.log('barber')
        console.log(barber)
        let create = await Appointment.create({
            user,
            barber,
            date,
            startTime,
            endTime,
            appointmentType
        });
        if (!create) {
            response.message = 'Appointment not created';
            response.error = 'Appointment not created';
            return res.status(400).json(response);
        } else {
            response.message = 'Appointment created';
            response.data = create;
        }
        res.status(201).json(response);
    } catch (error) {
        console.error('Error creating appointment:', error);
        response.message = 'Error creating appointment';
        response.error = error.message;
        res.status(500).json(response);
    }
}




function createTimeSlots(appointments, date) {
    let interval = 30;
    const openingTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 0); // Start time: 9:00 AM
    const closingTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 17, 0); // End time: 5:00 PM
    const timeSlots = [];
    for (let time = new Date(openingTime); time <= closingTime; time.setMinutes(time.getMinutes() + 30)) {
        // Loop through time from startTime to endTime with increments of 30 minutes
        const startTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        // Convert the current time to a formatted string like "09:00 AM"
        const isAvailable = !appointments.some(appointment => appointment.startTime === startTime);
        
        console.log(isAvailable)
        // Check if the current time slot is available by searching for existing appointments at that time
        if (isAvailable) {
            // If the time slot is available, add it to the list of time slots
            timeSlots.push({ 
                startTime: startTime,
                endTime: format(addMinutes(time, interval), 'hh:mm'),
                isBooked: false
            
            });
        } else {
            // If the time slot is not available, add it to the list of time slots with the isBooked flag set to true
            timeSlots.push({ 
                startTime: startTime,
                endTime: format(addMinutes(time, interval), 'hh:mm'),
                isBooked: true
            });
        }
      
    }
    console.log(timeSlots)
}


