import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true, // User name is required
    trim: true, // Removes whitespace
  },
  email: {
    type: String,
    required: true, // Email is required
    unique: true, // Each email must be unique
    trim: true,
    lowercase: true, // Converts email to lowercase
  },
  password: {
    type: String,
    required: true, // Password is required
  },
  role: {
    type: String,
    enum: ['user', 'admin','main'], // Role can be either 'user' or 'admin'
    default: 'user', // Default role is 'user'
  },
  isActive: {
    type: Boolean,
    default: true, // User is active by default
  },
  address: String,
  phone: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String, // String for storing avatar URL or file path
  },
  resetPasswordToken: {
    type: String, // Token for password reset functionality
  },
  resetPasswordExpires: {
    type: Date, // Expiration date for password reset token
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the current date when the user is created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically set the current date when the user is updated
  },
});

// Set up pre-save middleware to automatically update the `updatedAt` field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Export User model
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;