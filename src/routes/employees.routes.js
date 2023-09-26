import { Router } from "express";
import { getEmployees, postEmployees, putEmployees, deleteEmployees, getEmployee } from "../controllers/employees.controllers.js";

const router = Router()

//endpint
router.get('/employees', getEmployees)

router.get('/employees/:id', getEmployee)

router.post('/employees', postEmployees)

router.patch('/employees/:id', putEmployees)   //put para todos los datos

router.delete('/employees/:id', deleteEmployees)

export default router