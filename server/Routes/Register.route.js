import express from 'express';
import { CreateUser,LoginUser } from '../Controllers/Register.controller.js';

let router=express.Router();


router.post('/register',CreateUser);
router.post('/login',LoginUser)

export default router;