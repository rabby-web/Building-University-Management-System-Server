import express from 'express';
import { StudentControllers } from './student.controller';
// import { StudentControllers } from './student.controller';

const router = express.Router();
// create or post a student routes
// router.post('/create-student', StudentControllers.createStudent);
// find or get routes => for all student
router.get('/', StudentControllers.getAllStudents);
// find or get routes => for single student
router.get('/:studentId', StudentControllers.getSingleStudent);
// delete routes => for single student
router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
