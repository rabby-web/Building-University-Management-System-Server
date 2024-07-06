import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicFacultyServices } from './academicFaculty.service';

// create student
const createAcademicFaculty = catchAsync(async (req, res) => {
  //   const { password, student: studentData } = req.body;
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty Created a successfully',
    data: result,
  });
});

// get all academic semester
const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty are retrieved successfully',
    data: result,
  });
});
// get single semester
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is retrieved successfully',
    data: result,
  });
});

// update semester
const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is retrieved successfully',
    data: result,
  });
});

export const academicSemesterControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
