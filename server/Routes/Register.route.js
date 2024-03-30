import express from 'express';
import { CreateUser } from '../Controllers/Register.controller.js';

let router=express.Router();


router.post('/register',CreateUser);


export default router;