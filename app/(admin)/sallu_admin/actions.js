
'use server';

import connectMongoDB from '@/db';
import Category from '@/models/Category';
import Product from '@/models/Product'; // Import the Product model
import fs from 'fs';
import { revalidatePath } from 'next/cache';
import path from 'path';
import { writeFile, unlink, mkdir } from 'fs/promises';
import Order from '@/models/Orders';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { cookies } from 'next/headers';
// Create the uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), 'public/uploads');


// Helper to handle file writing with promises
// const writeFile = promisify(fs.writeFile);
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export async function editUserAction(userId, formData) {
  await connectMongoDB(); // Ensure the database is connected

  // Fetch the existing user by ID
  const existingUser = await User.findById(userId);

  if (!existingUser) {
    throw new Error('User not found');
  }

  // Extract user fields from formData (same as in createUserAction)
  const name = formData.get('name') || existingUser.name; // Use the existing name if not provided
  const email = formData.get('email') || existingUser.email;
  const password = formData.get('password'); // Optional, check below
  const phone = formData.get('phone') || existingUser.phone;
  const address = formData.get('address') || existingUser.address;
  const avatar = formData.get('avatar') || existingUser.avatar; // Optional avatar field

  // Check if a new password is provided
  if (password && password !== existingUser.password) {
    // If the password is changed, hash the new password
    existingUser.password = await bcrypt.hash(password, 10);
  }

  // Update the user's other fields
  existingUser.name = name;
  existingUser.email = email;
  existingUser.phone = phone;
  existingUser.address = address;
  existingUser.avatar = avatar;

  // Save the updated user back to the database
  const updatedUser = await existingUser.save();

  // Convert the Mongoose document to a plain object before returning
  return updatedUser.toObject(); // Return the updated user object
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

export const createOrder = async (formData) => {
  console.log('Server action: createOrder function called');
  console.log('Received formData:', formData);

  try {
    await connectMongoDB();

    // Extract form fields from formData
    const name = formData.get('name');
    const address = formData.get('address');
    const mobile_no = formData.get('mobile_no');
    const whatsapp = formData.get('whatsapp');
    const delivery_charge = parseFloat(formData.get('delivery_charge'));
    const totalPrice = parseFloat(formData.get('totalPrice'));
    const paymentMethod = formData.get('paymentMethod');
    const user = formData.get('user');

    // Parse cart (sent as a JSON string)
    const cartString = formData.get('cart');
    const cart = cartString ? JSON.parse(cartString) : [];

    // Validate that the cart is not empty
    if (!cart || cart.length === 0) {
      throw new Error('Cart cannot be empty');
    }

    // Prepare the order data
    const orderData = {
      name,
      address,
      mobile_no,
      whatsapp,
      ordered_items:cart,
      delivery_charge,
      total_price:totalPrice,
      payment_method:paymentMethod,
      user
    };

    // Create and save the order in MongoDB
    const newOrder = await Order.create(orderData);
    console.log('Order created:', newOrder);

    // Convert the Mongoose document to a plain object before returning
    const plainOrder = newOrder.toObject(); // Convert to a plain object

    // Optionally remove any non-serializable properties, like __v or _id if needed
    const { __v, _id, createdAt, ...returnableOrder } = plainOrder;

    return returnableOrder; // Return the plain order object without Mongoose properties
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Error creating Order');
  }
};
export const editProduct = async (formData, id) => {
  console.log('Server action: editProduct function called');
  console.log('Received formData:', formData);

  try {
    await connectMongoDB();

    // Find the product by its ID
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }

    // Extract form fields from formData
    const title = formData.get('title') || product.title;
    const description = formData.get('description') || product.description;
    const price = parseFloat(formData.get('price')) || product.price;
    const category = formData.get('category') || product.category;
    const discount = formData.get('discount') || product.discount;
    const purchase_price = formData.get('purchase_price') || product.purchase_price;
    const stock = formData.get('stock') || product.stock;

    // Parse sizes and colors (sent as JSON strings)
    const sizesString = formData.get('sizes');
    const colorsString = formData.get('colors');

    const sizes = sizesString ? JSON.parse(sizesString) : product.sizes;
    const colors = colorsString ? JSON.parse(colorsString) : product.colors;

    // Handle image uploads
    const images = formData.getAll('images'); // Retrieve all image files from formData
    let imageUrls = [...product.images]; // Start with existing images

    // Track images to be removed
    const removedImages = formData.getAll('removedImages') || []; // Get removed images from formData

    // Remove the images marked for deletion
    if (removedImages.length > 0) {
      for (const removedImage of removedImages) {
        // Remove from imageUrls array
        imageUrls = imageUrls.filter((url) => url !== removedImage);

        // Delete the image from the filesystem
        const filePath = path.join(uploadsDir, path.basename(removedImage));
        try {
          await unlink(filePath); // Delete the file from filesystem
          console.log(`Deleted removed image: ${filePath}`);
        } catch (err) {
          console.error(`Error deleting image: ${filePath}`, err);
        }
      }
    }

    // Process new images and add them
    if (images && images.length > 0) {
      for (const image of images) {
        if (image instanceof File) {
          // Create a unique file name
          const fileName = `${Date.now()}-${image.name}`;
          const filePath = path.join(uploadsDir, fileName);

          // Read the file data as a buffer
          const buffer = Buffer.from(await image.arrayBuffer());

          // Write the buffer to a file on the local filesystem
          await writeFile(filePath, buffer);

          // Store the image URL (relative path)
          imageUrls.push(`/uploads/${fileName}`);
        }
      }
    }

    // Prepare the updated product data
    const updatedProductData = {
      title,
      description,
      price,
      images: imageUrls, // Updated images (kept ones + new ones)
      category,
      sizes,
      colors,
      stock,
      discount,
      purchase_price,
    };

    // Update the product in MongoDB
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedProductData, { new: true });
    console.log('Product updated:', updatedProduct);

    revalidatePath("/sallu_admin/product_list"); // Revalidate the product list page after the update

    // Convert the Mongoose document to a plain object before returning
    const plainProduct = updatedProduct.toObject();

    // Optionally remove any non-serializable properties, like __v or _id if needed
    const { __v, _id, createdAt, ...returnableProduct } = plainProduct;

    return returnableProduct; // Return the plain product object without Mongoose properties
  } catch (error) {
    console.error('Error editing product:', error);
    throw new Error('Error editing Product');
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
export const fetchOrders = async (page = 1, limit = 12) => {
  await connectMongoDB();
  
  // Count total products for pagination
  const totalOrders = await Order.countDocuments();
  
  // Fetch paginated products
  const orders = await Order.find()
    .skip((page - 1) * limit)
    .limit(limit);
  
  const totalPages = Math.ceil(totalOrders / limit);
  
  return { orders, totalPages };
};
export const fetchUsers = async (page = 1, limit = 12) => {
  await connectMongoDB();
  
  // Count total products for pagination
  const totalUser = await User.countDocuments();
  
  // Fetch paginated products
  const users = await User.find()
    .skip((page - 1) * limit)
    .limit(limit);
  
  const totalPages = Math.ceil(totalUser / limit);
  
  return { users, totalPages };
};
export const ordersList = async (userId) => {
  await connectMongoDB();
  // Fetch paginated products
  const orders = await Order.find({user:userId}).lean();
  
  return { orders };
};
export const fetchSingleUser = async (id) => {
  await connectMongoDB();
  
  // Fetch paginated products
  const user = await User.findById(id)
  console.log(id)
  
  return {user};
};
export const getCategoryById = async (id) => {
  await connectMongoDB();
  
  // Fetch paginated products
  const category = await Category.findById(id)
  console.log(id)
  
  return {category};
};
export const fetchSingleProduct = async (id) => {
  await connectMongoDB();
  
  // Fetch paginated products
  const product = await Product.findById(id)
  console.log(id)
  
  return {product};
};
export const getOrder = async (id) => {
  await connectMongoDB();
  
  // Fetch paginated products
  const order = await Order.findById(id)
  
  return {
    _id: order._id.toString(), // Convert ObjectId to string
    name: order.name,
    address: order.address,
    mobile_no: order.mobile_no,
    ordered_items: order.ordered_items.map(item => ({
      _id: item._id.toString(), // Convert ObjectId to string
      product: item.product.toString(),
      title: item.title,
      color: item.color,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      image: item.image,
      stock: item.stock,
    })),
    total_price: order.total_price,
    payment_method: order.payment_method,
    payment_status: order.payment_status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt
  };
};
export const updateOrderStatus = async (id, newStatus) => {
  await connectMongoDB();

  const order = await Order.findById(id);
  if (order) {
    order.payment_status = newStatus;
    await order.save();
  }
};
export async function loginUserAction(formData) {
  try {
    // Validate form data with Zod
    

    // Connect to the database
    await connectMongoDB();

    // Find the user by phone number
    const user = await User.findOne({ phone: formData.phone });
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(formData.password, user.password);
    if (!isPasswordCorrect) {
      return { success: false, message: 'Incorrect password' };
    }
    const userCookie = {
      id: user._id.toString(),
      phone: user.phone,
    };

    // Serialize the userCookie object as a string
    cookies().set('session', JSON.stringify(userCookie), {
      httpOnly: false, // Ensure the cookie is not accessible via client-side JS
      secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
      path: '/', // Cookie is valid across the entire site
      maxAge: 60 * 60 * 24, // 1 day expiration
    });
    //Authentication successful
    return { success: true, message: 'Login successful', user };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'An error occurred during login' };
  }
}
export async function createUserAction(formData) {
  await connectMongoDB(); // Ensure the database is connected

  // Extract user fields from formData
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const phone = formData.get('phone');
  const address = formData.get('address');
  const avatar = formData.get('avatar'); // Optional avatar field

  // Check if the user with the email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user document
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    avatar, // If the user has an avatar URL
  });

  // Save the user to the database
  const savedUser = await newUser.save();
  revalidatePath("/sallu_admin/users_list")
  // Convert the Mongoose document to a plain object before returning
  return savedUser.toObject(); // Return the plain user object
}
// export const fetchProduct = async () => {
//   await connectMongoDB();
  
  
//   const products = await Product.find().lean();
  
//   return { products };
// };
export async function fetchProduct() {
  await connectMongoDB();
  
  const products = await Product.find();
  
  // Manually convert to plain objects
  const plainProducts = products.map(product => product.toObject());

  return { products: plainProducts };
}
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
export const deleteCategory = async (formData) => {
  await connectMongoDB();
  // Extracting todo ID from formData
  const post_id = formData.get("id")
  try {
      // Deleting the todo with the specified ID
      await Category.deleteOne({_id: post_id});
      revalidatePath("/sallu_admin/product_categories");
      // Returning a success message after deleting the todo
      return ('Category deleted');
  } catch (error) {
      // Returning an error message if todo deletion fails
      return {message: 'error deleting category'};
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
export const editCategory = async (id, formData) => {
  try {
    // Log FormData contents for debugging
    console.log('FormData entries:'+ formData);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    await connectMongoDB();

    // Find the category by its ID
    const category = await Category.findById(id);
    if (!category) {
      throw new Error('Category not found');
    }

    // Extract form fields from formData
    const category_name = formData.get('category_name') || category.category_name;

    // Handle image upload if a new image is provided
    let category_image = category.category_image; // Use the current image by default
    const newImageFile = formData.get('category_image'); // Get the uploaded image file

    if (newImageFile && newImageFile instanceof File) {
      // Validate file type
      const validTypes = ['image/jpeg','image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(newImageFile.type)) {
        throw new Error('Unsupported file type');
      }

      // Ensure uploads directory exists
      await mkdir(uploadsDir, { recursive: true });

      // Generate a unique file name
      const fileName = `${Date.now()}-${newImageFile.name}`;
      const filePath = path.join(uploadsDir, fileName);

      // Read the file data as a buffer directly
      const buffer = Buffer.from(await newImageFile.arrayBuffer());

      // Write the buffer to a file on the local filesystem using fs/promises
      await writeFile(filePath, buffer);

      // Set the new image path
      category_image = `/category/${fileName}`;

      // Remove the old image from the filesystem if it's being replaced
      if (category.category_image) {
        const oldImagePath = path.join(uploadsDir, path.basename(category.category_image));
        try {
          await unlink(oldImagePath);
          console.log(`Deleted old category image: ${oldImagePath}`);
        } catch (err) {
          console.error(`Error deleting old image: ${oldImagePath}`, err);
        }
      }
    }

    // Prepare the updated category data
    const updatedCategoryData = {
      category_name,
      category_image, // Either the new image or the existing one
    };

    // Update the category in MongoDB
    const updatedCategory = await Category.findByIdAndUpdate(id, updatedCategoryData, { new: true }).lean();
    console.log('Category updated:', updatedCategory);

    // Optionally remove non-serializable properties
    const { __v, _id, createdAt, ...returnableCategory } = updatedCategory;

    return returnableCategory; // Return the plain category object without Mongoose properties
  } catch (error) {
    console.error('Error editing category:', error);
    throw new Error('Error editing Category');
  }
};