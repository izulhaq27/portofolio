import mongoose from "mongoose";
import dotenv from "dotenv";

// Basic schema definition to bypass full app import issues
const ExperienceSchema = new mongoose.Schema({
  title: String,
  organization: String,
  date: String,
  type: String,
  description: String,
  order: Number,
}, { timestamps: true });

const Experience = mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);

async function seed() {
  try {
    dotenv.config({ path: ".env.local" });
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to DB");

    await Experience.deleteMany({}); // clear existing
    
    await Experience.create([
      {
        title: "Bachelor's Degree in Informatics Engineering",
        organization: "Nahdlatul Ulama Sunan Giri University",
        date: "Present",
        type: "Higher Education",
        description: "Currently studying Informatics Engineering, focusing on software development, computer science, and modern technologies.",
        order: 1
      },
      {
        title: "Senior High School (MA)",
        organization: "MAI Attanwir",
        date: "Graduated",
        type: "Secondary Education",
        description: "Completed senior high school education.",
        order: 2
      },
      {
        title: "Junior High School (MTs)",
        organization: "MTSAI Attanwir",
        date: "Graduated",
        type: "Secondary Education",
        description: "Completed junior high school education.",
        order: 3
      },
      {
        title: "Elementary School (MI)",
        organization: "MI Nurul Islam 1 Margomulyo",
        date: "Graduated",
        type: "Primary Education",
        description: "Completed primary education.",
        order: 4
      }
    ]);
    
    console.log("Seeded experiences!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
