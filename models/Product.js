
import mongoose, { Schema } from "mongoose";

const skuSchema = new Schema({
  sku: {
    type: String,
    required: true,
    unique: true, // Ensures each SKU is unique
    trim: true,
  },
  color: {
    type: String,
    required: false, // Required to define SKU characteristics
  },
  size: {
    type: String,
    required: false, // Required to define SKU characteristics
  },
  stock: {
    type: Number,
    required: true,
    min: 0, // Ensures stock can't be negative
  },
});

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
    
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    min: 0,
  },
  purchase_price: {
    type: Number,
    min: 0,
  },
  images: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  skus: [skuSchema], // Array of SKU objects with specific stock, size, and color
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;