import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlwares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';
// import { StudentControllers } from './student.controller';

const router = express.Router();
router.get('/', StudentControllers.getAllStudents);

// find or get routes => for single student
router.get('/:studentId', StudentControllers.getSingleStudent);
// update routes
router.patch('/:studentId',
    validateRequest(updateStudentValidationSchema),
    StudentControllers.updateStudent);
// delete routes => for single student
router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
