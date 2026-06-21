import mongoose, { Schema, Document } from 'mongoose';

export interface IProfile extends Document {
  fullName: string;
  tagline: string;
  bio: string;
  university: string;
  studyProgram: string;
  profession: string;
  email: string;
  whatsapp?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  instagramUrl?: string;
  resumeUrl?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    tagline: { type: String, required: true },
    bio: { type: String, required: true },
    university: { type: String, required: true },
    studyProgram: { type: String, required: true },
    profession: { type: String, required: true },
    email: { type: String, required: true },
    whatsapp: { type: String },
    linkedinUrl: { type: String },
    githubUrl: { type: String },
    instagramUrl: { type: String },
    resumeUrl: { type: String },
    profileImage: { type: String },
  },
  { timestamps: true }
);

export const Profile = mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);
