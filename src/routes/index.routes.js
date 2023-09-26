import { Router } from "express";
import { ping } from "../controllers/index.controller.js";

const router = Router()

//coneccion mysql consulta
router.get('/ping', ping)

export default router