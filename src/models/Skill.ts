import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: string;
  icon?: string;
  level: number; // 1-100
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    icon: { type: String },
    level: { type: Number, required: true, min: 1, max: 100 },
  },
  { timestamps: true }
);

export const Skill = mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
