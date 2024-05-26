import express from 'express';
import { userControllers } from './user.controller';
const router = express.Router();

router.post('/create-user', userControllers.createStudent);

export const UserRoutes = router;
