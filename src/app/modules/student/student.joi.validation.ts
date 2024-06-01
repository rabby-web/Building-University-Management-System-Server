// import Joi from 'joi';

// // create a schema validation using joy
// const userNameValidationSchema = Joi.object({
//   firstName: Joi.string()
//     .trim()
//     .max(20)
//     .regex(/^[A-Z][a-z]*$/)
//     .messages({
//       'string.base': 'First name must be a string',
//       'string.empty': 'First name is required',
//       'string.max': 'Name cannot be more than 20 characters',
//       'string.pattern.base': '{#value} is not in capitalize format',
//     })
//     .required(),
//   middleName: Joi.string().trim().allow(''),
//   lastName: Joi.string()
//     .trim()
//     .pattern(/^[A-Za-z]+$/)
//     .messages({
//       'string.base': 'Last name must be a string',
//       'string.empty': 'Last name is required',
//       'string.pattern.base': '{#value} is not valid',
//     })
//     .required(),
// });

// // Guardian Schema
// const guardianValidationSchema = Joi.object({
//   fatherName: Joi.string().trim().required(),
//   fatherOccupation: Joi.string().trim().required(),
//   fatherContactNo: Joi.string().trim().required(),
//   motherName: Joi.string().trim().required(),
//   motherOccupation: Joi.string().trim().required(),
//   motherContactNo: Joi.string().trim().required(),
// });

// // LocalGuardian Schema
// const localGuardianValidationSchema = Joi.object({
//   name: Joi.string().trim().required(),
//   occupation: Joi.string().trim().required(),
//   contactNo: Joi.string().trim().required(),
//   address: Joi.string().trim().required(),
// });

// // Student Schema
// const studentValidationSchema = Joi.object({
//   id: Joi.string().trim().required(),
//   name: userNameValidationSchema.required(),
//   gender: Joi.string().trim().valid('male', 'female', 'other').required(),
//   dateOfBirth: Joi.string().trim(),
//   email: Joi.string().trim().email().required(),
//   contactNo: Joi.string().trim().required(),
//   emergencyContactNo: Joi.string().trim().required(),
//   bloodGroup: Joi.string()
//     .trim()
//     .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
//   permanentAddress: Joi.string().trim().required(),
//   presentAddress: Joi.string().trim().required(),
//   guardian: guardianValidationSchema.required(),
//   localGuardian: localGuardianValidationSchema.required(),
//   profileImage: Joi.string().trim().allow(''),
//   isActive: Joi.string().trim().valid('active', 'blocked').default('active'),
// });

// export default studentValidationSchema;
