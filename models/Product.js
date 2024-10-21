import mongoose, {Schema} from "mongoose";


const productSchema = new Schema({
    title: {
      type: String,
      required: true, // Product title is required
      trim: true, // Removes whitespace
    },
    description: {
      type: String,
      required: true, // Product description is required
      trim: true,
    },
    price: {
      type: Number,
      required: true, // Product price is required
      min: 0, // Price cannot be negative
    },
    stock: {
      type: Number,
      required: true, // Product price is required
      min: 0, // Price cannot be negative
    },
    discount: {
      type: Number, // Product price is required
      min: 0, // Price cannot be negative
    },
    purchase_price: {
      type: Number, // Product price is required
      min: 0, // Price cannot be negative
    },

    images: {
      type: [String], // Array of strings for image URLs or paths
      required: true, // At least one image is required
    },
    category: {
      type: String,
      required: true, // Optional: limit category to these values
    },
    sizes: {
      type: [String], // Array of strings for product sizes, e.g., ['S', 'M', 'L', 'XL']
      
    },
    colors: {
      type: [String], // Array of strings for product colors, e.g., ['Red', 'Green', 'Blue']
      
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the current date when the product is created
    },
  });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;