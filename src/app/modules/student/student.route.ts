import express from 'express';
import { StudentControllers } from './student.controller';
// import { StudentControllers } from './student.controller';

const router = express.Router();
// create or post routes
router.post('/create-student', StudentControllers.createStudent);
// find or get routes => all student
router.get('/', StudentControllers.getAllStudents);
// find or get routes => single student
router.get('/:studentId', StudentControllers.getSingleStudent);

export const StudentRoutes = router;
