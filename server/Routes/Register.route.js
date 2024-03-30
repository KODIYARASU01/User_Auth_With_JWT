import express from 'express';
import { RegisterUser,LoginUser } from '../Controllers/Register.controller.js';

let router=express.Router();


router.post('/register',RegisterUser);
router.post('/login',LoginUser)

export default router;