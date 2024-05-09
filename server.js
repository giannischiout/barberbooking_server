const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
// Connection URI
const uri = 'mongodb+srv://giannischiout:o23ZVNnZsHAGCo2S@cluster0.r3kxqte.mongodb.net/barberbooking';
const barberRoutes = require('./routes/barberRoutes')
const appointmentRoutes = require('./routes/appointmentRoutes')
const appointmentTypeRoutes = require('./routes/appointmentTypeRoutes')
const timeslotRoutes = require('./routes/timeslotRoutes')
// Connect to the MongoDB server
mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB');
        // Start your Express.js server or define your models and routes here
    })
    .catch(error => console.error('Error connecting to MongoDB', error));





const port = 4000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



// Use routes
app.use('/barber', barberRoutes)
app.use('/appointment', appointmentRoutes)
app.use('/appointment-type', appointmentTypeRoutes)
app.use('/getTimeslots', timeslotRoutes)