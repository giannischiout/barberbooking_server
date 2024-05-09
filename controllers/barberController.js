
const {Barber }= require('../models')


let response = {
    message: '',
    data: null,
    error: null
};
// Controller functions
exports.createBarber = async (req, res) => {
    console.log('barber')
    try {
        const { name, workingHours, contactInfo } = req.body;
        let create = await Barber.create({
            name,
            workingHours,
            contactInfo
        });
        if (!create) {
            response.message = 'Barber not created';
            response.error = 'Barber not created';
            return res.status(400).json(response);
        } else {
            response.message = 'Barber created';
            response.data = create;
        }
        console.log(create)
        res.status(201).json(response);
    } catch (error) {
        console.error('Error creating barber:', error);
        response.message = 'Error creating barber';
        response.error = error.message;
        res.status(500).json(response);
    }
};



exports.getBarber = async (req, res) => {
    
}
exports.updateBarber = async (req, res) => {

}
exports.deleteBarber = async (req, res) => {

}