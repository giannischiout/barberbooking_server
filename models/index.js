const { model, models, Schema } = require('mongoose');
// Define User schema
const userSchema = new Schema({
    username: String,
    email: { type: String, index: true }, 
    password: String,
    phone: String,
    address: String,
    // Other relevant details
});

// Define Barber schema
const barberSchema = new Schema({
    name: String,
    specialty: { type: String, index: true }, 
    phone: { type: Number, index: true }, 
    email: { type: String, index: true }, 
    workingHours: [{
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        },
        timeSlots: [{
            startTime: {
                type: String,
                min: 0,
                max: 2359,
                required: true
            },
            endTime: {
                type: String,
                min: 0,
                max: 2359,
                required: true
            }
        }]
    }],
});

// Define Appointment Type schema
const appointmentTypeSchema = new Schema({
    typeName: String,
    duration: Number, // Duration in minutes
    price: Number,
});

// Define Appointment schema
const appointmentSchema = new Schema({
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    barber: {
        type: Schema.Types.ObjectId,
        ref: 'Barber'
    },
    appointmentType: {
        type: Schema.Types.ObjectId,
        ref: 'AppointmentType'
    },
    date: String,
    startTime: Number,
    endTime: Number,
    status: { type: String, enum: ['Pending', 'Accepted'], default: 'Pending' }
});

// Create models from schemas
const User = models.User || model('User', userSchema);
const Barber = models.Barber || model('Barber', barberSchema);
const AppointmentType = models.AppointmentType || model('AppointmentType', appointmentTypeSchema);
const Appointment = models.Appointment || model('Appointment', appointmentSchema);

module.exports = {
    User,
    Barber,
    AppointmentType,
    Appointment
};
