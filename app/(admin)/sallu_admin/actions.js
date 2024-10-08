
'use server';

import connectMongoDB from '@/db';
import Category from '@/models/Category';
import Product from '@/models/Product'; // Import the Product model
import fs from 'fs';
import { revalidatePath } from 'next/cache';
import path from 'path';

// Create the uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), 'public/uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export const createProduct = async (formData) => {
  console.log('Server action: createProduct function called');
  console.log('Received formData:', formData);

  try {
    await connectMongoDB();

    // Extract form fields from formData
    const title = formData.get('title');
    const description = formData.get('description');
    const price = parseFloat(formData.get('price'));
    const category = formData.get('category');
    const discount = formData.get('discount');
    const purchase_price = formData.get('purchase_price');
    const stock = formData.get('stock');

    // Parse sizes and colors (sent as JSON strings)
    const sizesString = formData.get('sizes');
    const colorsString = formData.get('colors');

    const sizes = sizesString ? JSON.parse(sizesString) : [];
    const colors = colorsString ? JSON.parse(colorsString) : [];

    // Handle image uploads
    const images = formData.getAll('images'); // Retrieve all image files from formData
    if (!images || images.length === 0) {
      throw new Error('Images array cannot be empty');
    }

    // Save uploaded images locally
    const imageUrls = [];
    for (const image of images) {
      const fileName = `${Date.now()}-${image.name}`; // Create a unique file name
      const filePath = path.join(uploadsDir, fileName); // Define the path to save the file

      // Use the File API to read the file and write it to the local filesystem
      const buffer = await image.arrayBuffer(); // Read the file as a buffer
      fs.writeFileSync(filePath, Buffer.from(buffer)); // Write the buffer to a file

      // Store the image URL (relative path)
      imageUrls.push(`/uploads/${fileName}`);
    }

    // Prepare the product data
    const productData = {
      title,
      description,
      price,
      images: imageUrls, // Use the URLs of the saved images
      category,
      sizes,
      colors,
      stock,
      discount,
      purchase_price
    };

    // Create and save the product in MongoDB
    const newProduct = await Product.create(productData);
    console.log('Product created:', newProduct);

    // Convert the Mongoose document to a plain object before returning
    const plainProduct = newProduct.toObject(); // Convert to a plain object

    // Optionally remove any non-serializable properties, like __v or _id if needed
    const { __v, _id, createdAt, ...returnableProduct } = plainProduct;

    return returnableProduct; // Return the plain product object without Mongoose properties
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Error creating Product');
  }
};
export const fetchProducts = async (page = 1, limit = 12) => {
  await connectMongoDB();
  
  // Count total products for pagination
  const totalProducts = await Product.countDocuments();
  
  // Fetch paginated products
  const products = await Product.find()
    .skip((page - 1) * limit)
    .limit(limit);
  
  const totalPages = Math.ceil(totalProducts / limit);
  
  return { products, totalPages };
};
export const fetchProduct = async () => {
  await connectMongoDB();
  
  // Fetch all products from the database
  const products = await Product.find().lean();
  
  return { products };
};
export const fetchProductByCategory = async (category) => {
  await connectMongoDB();
  
  // Fetch all products from the database
  const productsByCat = await Product.find({category}).lean();
  
  return { productsByCat };
};
export const deleteProduct = async (formData) => {
  await connectMongoDB();
  // Extracting todo ID from formData
  const post_id = formData.get("id")
  try {
      // Deleting the todo with the specified ID
      await Product.deleteOne({_id: post_id});
      revalidatePath("/sallu_admin/product_list");
      // Returning a success message after deleting the todo
      return ('Product deleted');
  } catch (error) {
      // Returning an error message if todo deletion fails
      return {message: 'error deleting product'};
  }
};
export const createCategory = async (formData) => {
  console.log('Server action: createCategory function called');
  console.log('Received formData:', formData);

  try {
    await connectMongoDB();

    // Extract the category name from formData
    const category_name = formData.get('category_name');

    // Get the image file from formData
    const image = formData.get('category_image');
    if (!image) {
      throw new Error('Category image cannot be empty');
    }

    // Define the directory where the images will be saved
    const uploadsDir = path.join(process.cwd(), 'public', 'category'); // Use 'public/category' folder for images

    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Create a unique file name for the image
    const fileName = `${Date.now()}-${image.name}`;
    const filePath = path.join(uploadsDir, fileName);

    // Save the image to the local filesystem
    const buffer = await image.arrayBuffer(); // Read the file as a buffer
    fs.writeFileSync(filePath, Buffer.from(buffer)); // Write the buffer to a file

    // Store the relative image URL
    const imageUrl = `/category/${fileName}`;

    // Prepare the category data
    const categoryData = {
      category_name,
      category_image: imageUrl, // Save the image URL
    };
    console.log(categoryData)
    // Create and save the category in MongoDB
    const newCategory = await Category.create(categoryData);
    console.log('Category created:', newCategory);

    // Convert the Mongoose document to a plain object before returning
    const plainCategory = newCategory.toObject(); // Convert to a plain object

    // Optionally remove non-serializable properties before returning (e.g., _id, __v)
    const { __v, _id, createdAt, ...returnableCategory } = plainCategory;

    return returnableCategory; // Return the plain object
  } catch (error) {
    console.error('Error creating category:', error);
    throw new Error('Error creating Category');
  }
};
export const getCategories = async () => {
  try {
    await connectMongoDB();

    // Fetch all categories
    const categories = await Category.find().lean(); // .lean() to get plain objects

    return {categories};
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
};
