// import { StudentModel } from '../student.model';

import { Student } from '../student.model';
import { TStudent } from './student.interface';

// create student
const createStudentIntoDB = async (studentData: TStudent) => {
  // static methods
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }
  const result = await Student.create(studentData); //built in static method

  // const student = new Student(studentData); //create an instance
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists');
  // }

  // const result = await student.save(); //built in instance method
  return result;
};

// find all student
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
// find single student
const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
// find single student
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
