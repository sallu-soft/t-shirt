import mongoose, {Schema} from "mongoose";


const categorySchema = new Schema({
    category_name: {
      type: String,
      required: true, // Category title is required
      trim: true, // Removes whitespace
    },
   
    category_image: {
      type: Object, // Array of strings for image URLs or paths
      required: true, // At least one image is required
    },
    
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the current date when the Category is created
    },
  });

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;