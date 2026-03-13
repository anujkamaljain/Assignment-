require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const existingUser = await User.findOne({ username: "testuser" });
    
    if (existingUser) {
      console.log("Test user already exists");
      process.exit(0);
    }
    
    await User.create({
      username: "testuser",
      password: "Test123",
    });
    
    console.log("Test user created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding user:", error);
    process.exit(1);
  }
};

seedUser();
