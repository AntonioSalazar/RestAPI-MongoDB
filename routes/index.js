const express = require('express');
const router  = express.Router();
const routes  = require('./routes');
const middlewares = require('../middlewares/middlewares');


//employees endpoints
router.get('/employees', routes.employees.listAllEmployees);

router.get('/employees/:id', middlewares.authenticate,  middlewares.convertToObjectID, routes.employees.listOneEmployee);

router.post('/employees', routes.employees.createEmployee);

router.patch('/employees/:id', middlewares.convertToObjectID, routes.employees.updateEmployee);

router.delete('/employees/:id', middlewares.convertToObjectID, routes.employees.deleteEmployee);

//departments endpoints
router.get('/departments', routes.departments.listAllDepartments);

router.get('/departments/:deptName/employees', routes.departments.getDepartmentEmployees)


module.exports = router;
