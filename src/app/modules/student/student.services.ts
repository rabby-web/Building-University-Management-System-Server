// import { StudentModel } from '../student.model';

// import { Student } from '../student.model';
import { TStudent } from './student.interface';
import { Student } from './student.model';

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
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
