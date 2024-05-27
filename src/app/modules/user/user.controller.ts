import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';

// create student
const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await UserService.createStudentIntoDB(password, studentData);
    res.status(200).json({
      success: true,
      message: 'Student is create a successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userControllers = {
  createStudent,
};
