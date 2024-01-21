import mongoose from "mongoose";

import { Schema } from 'mongoose';

const doctorSchema = new Schema({
    name: { type: String, required: true },
    schedules: [{ type: Schema.Types.ObjectId, ref: 'Schedule', required: true }],
  });

const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);

export default Doctor;