
const Departments = require('../models/employees')

function listAllDepartments (req, res) {
    Departments.distinct('department.name')
        .then(departments => res.status(200).json(departments))
        .catch(err => res.status(500).json(err))
}



function getDepartmentEmployees(req, res) {
    const {deptName} = req.params;
    Departments.find({
        'department.name': new RegExp(deptName, 'i')
    })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
}

module.exports = {
    listAllDepartments,
    getDepartmentEmployees
}