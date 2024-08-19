import express from 'express';
import { userControllers } from './user.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validateRequest from '../../middlwares/validateRequest';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  userControllers.createStudent,
);

export const UserRoutes = router;
