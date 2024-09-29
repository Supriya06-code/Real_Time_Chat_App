import express from "express"
import { userRegister } from "../routControllers/userroutController.js";

const router = express.Router();

router.post('/register',userRegister);


export default router