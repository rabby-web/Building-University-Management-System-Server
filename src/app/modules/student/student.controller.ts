import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.services';
import studentValidationSchema from './student.validation';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// find all student
const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Created a successfully',
      data: result,
    });
    // res.status(200).json({
    //   success: true,
    //   message: 'Students are retrieved successfully',
    //   data: result,
    // });
  } catch (err) {
    next(err);
  }
};
// find single student
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Created a successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
// delete or update single student
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Created a successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
