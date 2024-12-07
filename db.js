import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // Options are no longer necessary with modern drivers
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error; // Optional: Rethrow the error for debugging
  }
};

export default connectMongoDB;