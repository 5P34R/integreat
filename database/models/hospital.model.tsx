import mongoose from "mongoose";
import { Schema } from 'mongoose';

const hospitalSchema = new Schema({
    name: { type: String, required: true, unique: true },
    address : { type: String, required: true },
    user : { type: Schema.Types.ObjectId, ref: 'User', required: true },
    departments: [{ type: Schema.Types.ObjectId, ref: 'Department', required: false }],
  });
const Hospital= mongoose.models.Hospital || mongoose.model('Hospital', hospitalSchema);

export default Hospital;