import { Schema, model, connect } from 'mongoose';
const bcrypt = require('bcrypt');
import {
  // StudentMethods,
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
import validator from 'validator';
import { func } from 'joi';
import config from '../../config';
// import config from './config';

// 2. Create a Schema corresponding to the document interface.

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Father contact number is required'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'Mother name is required'],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Mother contact number is required'],
  },
});
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Local guardian name is required'],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, 'Local guardian occupation is required'],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'Local guardian contact number is required'],
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'Local guardian address is required'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      trim: true,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      trim: true,
      required: [true, 'User Id is required'],
      unique: true,
      ref: 'User',
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Password is required'],
      maxlength: [20, 'Password can not be 20 characters'],
    },

    name: {
      type: userNameSchema,
      trim: true,
      required: [true, 'Student name is required'],
    },
    gender: {
      type: String,
      trim: true,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not valid',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: String, trim: true },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email type',
      },
    },
    contactNo: {
      type: String,
      trim: true,
      required: [true, 'Contact number is required'],
    },
    emergencyContactNo: {
      type: String,
      trim: true,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      trim: true,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    permanentAddress: {
      type: String,
      trim: true,
      required: [true, 'Permanent address is required'],
    },
    presentAddress: {
      type: String,
      trim: true,
      required: [true, 'Present address is required'],
    },
    guardian: {
      type: guardianSchema,
      trim: true,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      trim: true,
      required: [true, 'Local guardian information is required'],
    },
    profileImage: { type: String, trim: true },
    // isActive: {
    //   type: String,
    //   trim: true,
    //   enum: {
    //     values: ['active', 'blocked'],
    //     message: '{VALUE} is not a valid status',
    //   },
    //   default: 'active',
    // },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// pre save middleware/hook :=> will work on create() save()
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save the data');
  // hashing password and save into DB
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware/hook
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// query middle wear
studentSchema.pre('find', function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  // console.log(this);
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

// virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// [ {$match: {isDelete: {$ne: true}}},{ '$match': { id: '123456700' } } ]
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  // this.find({ isDeleted: { $ne: true } });
  next();
});

// creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// 3. Create a Model.
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
