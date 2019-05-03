const Employees = require('../models/employees');

function listAllEmployees (req, res) {
    Employees.find()
    .then(employees => res.status(200).json(employees))
    .catch(err => res.status(404).json(err))
}

function listOneEmployee(req, res) {
    const {ObjectID} = req;
    Employees.findOne({'_id': ObjectID})
        .then(singleEmployee => res.status(200).json(singleEmployee))
        .catch(err => res.status(400).json(err))
}

function createEmployee(req, res) {
    if (req.body) {
        const employee = req.body;
        const newEmployee = new Employees(employee);
        newEmployee.save()
        .then(newEmployee => {
            res.status(200).json(`Inserted employee with id ${newEmployee.id}`)
        })
        .catch(err => res.status(400).json(err))
    } else {
        return res.status(403).json('please specify some data');
    }
}

function updateEmployee(req, res) {
    const employeeID = req.params.id;
    Employees.findOneAndUpdate({'_id': employeeID}, req.body, { new: true})
        .then(updatedEmployee => {
            res.status(200).json(updatedEmployee)
        })
        .catch(err => res.satus(400).json(err));
}

function deleteEmployee(req, res) {

}

module.exports = {
    listAllEmployees,
    listOneEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
}