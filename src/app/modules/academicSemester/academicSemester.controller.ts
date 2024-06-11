import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
// import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';
import catchAsync from '../../utils/catchAsync';

// create student
const createAcademicSemester = catchAsync(async (req, res, next) => {
  //   const { password, student: studentData } = req.body;
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Created a successfully',
    data: result,
  });
});

// get all academic semester
const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    data: result,
  });
});

export const academicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
};
