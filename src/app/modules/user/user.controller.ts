import { Request, Response } from 'express';
import { UserService } from './user.service';

// create student
const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using zod

    const { password, student: studentData } = req.body;
    // data validation using joi
    // const { error, value } = studentValidationSchema.validate(student);

    // data validation using zod
    // const zodParseData = studentValidationSchema.parse(studentData);

    const result = await UserService.createStudentIntoDB(password, studentData);
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error.details,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: 'Student is create a successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const userControllers = {
  createStudent,
};
