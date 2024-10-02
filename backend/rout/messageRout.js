import express from "express"
import { sendMessage } from "../routControllers/messageroutController.js";
import isLogin from "../middleware/isLogin.js";
const router = express.Router();

router.post('/send/:id',isLogin, sendMessage)

export default router