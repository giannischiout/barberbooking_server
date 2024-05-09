

let response = {
    message: '',
    data: null,
    error: null
};



exports.getAvailableTimeslots = async (req, res) => {
    res.status(200).json({message: 'Timeslots retrieved'});
}   