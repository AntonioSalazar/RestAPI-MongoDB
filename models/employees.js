const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema ({
    name: String,
    address: String,
    email: String,
    hired: String,
    dob: String,
    salary: Number,
    bonus: Number,
    photo: String,
    department: {
        name: String,
        location: String
    }
})

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;