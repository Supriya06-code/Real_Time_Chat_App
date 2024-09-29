import express from "express"
import { userGuestLogin, userLogin, userLogOut, userRegister } from "../routControllers/userroutController.js";

const router = express.Router();

router.post('/register',userRegister);

router.post('/login',userLogin);
router.post('/logout',userLogOut);
router.post('/guestlogin', userGuestLogin);

export default router