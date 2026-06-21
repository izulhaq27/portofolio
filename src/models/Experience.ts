import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  title: string;
  organization: string;
  date: string;
  type: string;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    organization: { type: String, required: true },
    date: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Experience = mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);
