const Employees = require('../models/employees');

function listAllEmployees (req, res) {
    Employees.find()
    .then(employees => res.status(200).json(employees))
    .catch(err => res.status(500).json(err))
}

function listOneEmployee(req, res) {
    const {ObjectID} = req;
    Employees.findOne({'_id': ObjectID})
        .then(singleEmployee => {
            if (singleEmployee) {
                return res.status(200).json(singleEmployee)
            } else {
                return res.status(200).json(`Employe with the ID ${ObjectID} cannot be found`)
            }
        })
        .catch(err => res.status(500).json(err))
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
    const employee = req.body;
    const employeeID = req.params.id;
    if (employee && employeeID) {
         Employees.findOneAndUpdate({'_id': employeeID}, {$set: employee}, { new: true})
        .then(updatedEmployee => {
            if (updatedEmployee) {
                return res.status(200).json(updatedEmployee)
            } else {
                return res.status(200).json(`Couldnt modify employee with ID ${employeeID}, ID specified didnt matched any employee ID`)
            }
        })
        .catch(err => res.satus(500).json(err));   
    } else {
        return res.status(400).json('Specify data to modify')
    }
}

function deleteEmployee(req, res) {
    const employeeID = req.params.id;
    Employees.deleteOne({'_id': employeeID})
        .then(deletedEmployee => res.status(201).json(`Employee with the ID ${employeeID} has been deleted`))
        .catch(err => res.status(400).json(err));
}



module.exports = {
    listAllEmployees,
    listOneEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    
}