// To seed the database with some initial users
// To run:
// 1. cd backend
// 2. node src/seeds/user.seed.js

import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // Female Users
  {
    email: "wei.ling@example.com",
    fullName: "Tan Wei Ling",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=weiling&backgroundColor=b6e3f4",
  },
  {
    email: "xinyi.ho@example.com",
    fullName: "Ho Xin Yi",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=xinyi&backgroundColor=c0aede",
  },
  {
    email: "priya.sharma@example.com",
    fullName: "Priya Sharma",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya&backgroundColor=d1d4f9",
  },
  {
    email: "siti.ahmad@example.com",
    fullName: "Siti Nur Ahmad",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=siti&backgroundColor=ffd5dc",
  },
  {
    email: "mei.fong@example.com",
    fullName: "Lim Mei Fong",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=meifong&backgroundColor=ffdfbf",
  },
  {
    email: "aiko.tanaka@example.com",
    fullName: "Tanaka Aiko",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=aiko&backgroundColor=ffdfbf",
  },
  {
    email: "huiwen.chen@example.com",
    fullName: "Chen Hui Wen",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=huiwen&backgroundColor=b6e3f4",
  },
  {
    email: "nurul.huda@example.com",
    fullName: "Nurul Huda",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=nurul&backgroundColor=c0aede",
  },

  // Male Users
  {
    email: "junwei.lee@example.com",
    fullName: "Lee Jun Wei",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=junwei&backgroundColor=b6e3f4",
  },
  {
    email: "rajesh.kumar@example.com",
    fullName: "Rajesh Kumar",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh&backgroundColor=d1d4f9",
  },
  {
    email: "wei.ming@example.com",
    fullName: "Ong Wei Ming",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=weiming&backgroundColor=c0aede",
  },
  {
    email: "arif.ridwan@example.com",
    fullName: "Muhammad Arif Ridwan",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=arif&backgroundColor=ffd5dc",
  },
  {
    email: "kenji.yamamoto@example.com",
    fullName: "Yamamoto Kenji",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=kenji&backgroundColor=ffdfbf",
  },
  {
    email: "zhihao.ng@example.com",
    fullName: "Ng Zhi Hao",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhihao&backgroundColor=b6e3f4",
  },
  {
    email: "faizal.rahman@example.com",
    fullName: "Faizal Rahman",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=faizal&backgroundColor=c0aede",
  },
  {
    email: "minho.park@example.com",
    fullName: "Park Min Ho",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=minho&backgroundColor=d1d4f9",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();