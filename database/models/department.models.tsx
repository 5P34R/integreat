import mongoose from "mongoose";
import { Schema } from 'mongoose';

const departmentSchema = new Schema({
    name: { type: String, required: true, unique: true },
    address : { type: String, required: true },
    doctors: [{ type: Schema.Types.ObjectId, ref: 'Doctor', required: true }],
    // other fields for department
  });
  
  const Department = mongoose.models.Department || mongoose.model('Department', departmentSchema);

  export default Department;