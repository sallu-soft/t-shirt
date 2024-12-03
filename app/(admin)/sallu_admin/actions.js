
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
import { sendPasswordResetEmail } from '@/lib/sendPasswordResetEmail';
import { v4 as uuidv4 } from 'uuid';
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
    // Connect to MongoDB
    await connectMongoDB();
    console.log('Connected to MongoDB');

    // Extract form data fields
    const title = formData.get('title');
    const description = formData.get('description');
    const price = parseFloat(formData.get('price'));
    const category = formData.get('category');
    const discount = formData.get('discount');
    const purchase_price = formData.get('purchase_price');
    const stockOnly = formData.get('stock');

    const stockByVariantString = formData.get('skus');
    const stockByVariant = stockByVariantString ? JSON.parse(stockByVariantString) : [];
    const stock = stockByVariant.length > 0 ? stockByVariant : [{ sku: 'default', stock: stockOnly }];

    // Handle image uploads
    const images = formData.getAll('images');
    const imageUrls = [];

    if (images && images.length > 0) {
      // Set upload directory
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

      // Ensure the uploads directory exists
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Process and save each image
      for (const image of images) {
        try {
          const fileName = `${Date.now()}-${image.name}`;
          const filePath = path.join(uploadsDir, fileName);

          // Convert image file to Buffer and save it to the file system
          const buffer = Buffer.from(await image.arrayBuffer());
          await fs.promises.writeFile(filePath, buffer);

          // Store the relative URL for the saved image
          imageUrls.push(`/uploads/${fileName}`);
        } catch (error) {
          console.error(`Error writing file ${image.name}:`, error);
        }
      }
    } else {
      console.log("No images provided, skipping image upload.");
    }

    // Prepare product data
    const productData = {
      title,
      description,
      price,
      images: imageUrls,
      category,
      discount,
      skus: stock,
      purchase_price,
    };

    console.log('Product data to be saved:', productData);

    // Create and save product in database
    const newProduct = await Product.create(productData);
    console.log('Product created:', newProduct);

    // Return the new product excluding metadata fields
    const plainProduct = newProduct.toObject();
    const { __v, _id, createdAt, ...returnableProduct } = plainProduct;

    return returnableProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Error creating Product', error);
  }
};

// export const createOrder = async (formData) => {
//   console.log('Server action: createOrder function called');
//   console.log('Received formData:', formData);

//   try {
//     await connectMongoDB();

    
//     const isFormData = formData instanceof FormData;
//     const name = isFormData ? formData.get('name') : formData?.name;
//     const address = isFormData ? formData.get('address') : formData?.address;
//     const mobile_no = isFormData ? formData.get('mobile_no') : formData?.mobile_no;
//     const whatsapp = isFormData ? formData.get('whatsapp') : formData?.whatsapp;
//     const delivery_charge = parseFloat(isFormData ? formData.get('delivery_charge') : formData?.delivery_charge);
//     const totalPrice = parseFloat(isFormData ? formData.get('totalPrice') : formData?.totalPrice);
//     const paymentMethod = isFormData ? formData.get('paymentMethod') : formData?.paymentMethod;
//     const user = isFormData ? formData.get('user') : formData?.user;

//     // Parse cart (sent as a JSON string)
//     const cartString = isFormData ? formData.get('cart') : formData?.cart;
//     const cart = cartString ? JSON.parse(cartString) : [];

//     // Validate that the cart is not empty
//     if (!cart || cart.length === 0) {
//       throw new Error('Cart cannot be empty');
//     }

//     // Prepare the order data
//     const orderData = {
//       name,
//       address,
//       mobile_no,
//       whatsapp,
//       ordered_items:cart,
//       delivery_charge,
//       total_price:totalPrice,
//       payment_method:paymentMethod,
//       user
//     };
    
//     // Create and save the order in MongoDB
//     const newOrder = await Order.create(orderData);
//     console.log('Order created:', newOrder);

//     // Convert the Mongoose document to a plain object before returning
//     const plainOrder = newOrder.toObject(); // Convert to a plain object

//     // Optionally remove any non-serializable properties, like __v or _id if needed
//     const { __v, _id, createdAt, ...returnableOrder } = plainOrder;

//     return returnableOrder; // Return the plain order object without Mongoose properties
//   } catch (error) {
//     console.error('Error creating order:', error);
//     throw new Error('Error creating Order');
//   }
// };

export const createOrder = async (formData) => {
  console.log('Server action: createOrder function called');
  console.log('Received formData:', formData);

  try {
    await connectMongoDB();

    // Check if formData is a FormData object or a plain object
    const isFormData = formData instanceof FormData;

    // Extract form fields based on whether formData is a FormData object or a plain object
    const name = isFormData ? formData.get('name') : formData?.name;
    const address = isFormData ? formData.get('address') : formData?.address;
    const mobile_no = isFormData ? formData.get('mobile_no') : formData?.mobile_no;
    const whatsapp = isFormData ? formData.get('whatsapp') : formData?.whatsapp;
    const delivery_charge = parseFloat(isFormData ? formData.get('delivery_charge') : formData?.delivery_charge);
    const totalPrice = parseFloat(isFormData ? formData.get('totalPrice') : formData?.totalPrice);
    const paymentMethod = isFormData ? formData.get('paymentMethod') : formData?.paymentMethod;
    const user = isFormData ? formData.get('user') : formData?.user;

    // Get cart data and ensure it's not parsed if it's already an object
    const cartData = isFormData ? formData.get('cart') : formData?.cart;
    const cart = typeof cartData === 'string' ? JSON.parse(cartData) : cartData;

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
      ordered_items: cart,
      delivery_charge,
      total_price: totalPrice,
      payment_method: paymentMethod,
      user,
    };

    // Create and save the order in MongoDB
    const newOrder = await Order.create(orderData);

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
export const reduceProductStock = async (productId, skuData, quantityToSubtract) => {
  try {
    await connectMongoDB();

    // Find the product by its ID
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    // Find the SKU that matches the specified size and color
    const sku = product.skus.find(
      (sku) => sku.size === skuData.size && sku.color === skuData.color
    );

    if (!sku) {
      throw new Error('SKU not found for this product');
    }

    // Ensure there is enough stock in the SKU
    if (sku.stock < quantityToSubtract) {
      throw new Error('Insufficient stock for this SKU');
    }

    // Subtract the quantity from the SKU stock
    sku.stock -= quantityToSubtract;

    // Save the updated product back to the database
    const updatedProduct = await product.save();

    console.log('SKU stock updated:', sku);

    return updatedProduct.toObject(); // Return the updated product object
  } catch (error) {
    console.error('Error updating SKU stock:', error);
    throw new Error('Error updating SKU stock');
  }
};


export const editProduct = async (formData, id) => {
  console.log('Server action: editProduct function called');
  console.log('Received formData:', formData);

  try {
    await connectMongoDB();

    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }

    const title = formData.get('title') || product.title;
    const description = formData.get('description') || product.description;
    const price = parseFloat(formData.get('price')) || product.price;
    const category = formData.get('category') || product.category;
    const discount = formData.get('discount') || product.discount;
    const purchase_price = formData.get('purchase_price') || product.purchase_price;

    // const stockByVariantString = formData.get('skus');
    // const stockByVariant = stockByVariantString ? JSON.parse(stockByVariantString) : product.skus || [];
    const stockByVariantString = formData.get('skus');
let stockByVariant;

if (stockByVariantString && stockByVariantString.trim() !== "") {
  try {
    stockByVariant = JSON.parse(stockByVariantString);
  } catch (error) {
    console.error("Error parsing stockByVariantString:", error);
    stockByVariant = product.skus || []; // Fallback to existing product skus if parsing fails
  }
} else {
  stockByVariant = product.skus || []; // Default to existing skus if skus field is not provided
}
    const images = formData.getAll('images');
    let imageUrls = [...product.images];
    const removedImages = formData.getAll('removedImages') || [];

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

    if (removedImages.length > 0) {
      for (const removedImage of removedImages) {
        if (typeof removedImage === 'string') {
          imageUrls = imageUrls.filter((url) => url !== removedImage);

          const filePath = path.join(uploadsDir, path.basename(removedImage));
          try {
            await unlink(filePath);
            console.log(`Deleted removed image: ${filePath}`);
          } catch (err) {
            console.error(`Error deleting image: ${filePath}`, err);
          }
        }
      }
    }

    if (images && images.length > 0) {
      for (const image of images) {
        if (image instanceof File) {
          const fileName = `${Date.now()}-${image.name}`;
          const filePath = path.join(uploadsDir, fileName);

          const buffer = Buffer.from(await image.arrayBuffer());
          await writeFile(filePath, buffer);
          imageUrls.push(`/uploads/${fileName}`);
        }
      }
    }

    const updatedProductData = {
      title,
      description,
      price,
      images: imageUrls,
      category,
      skus: stockByVariant,
      discount,
      purchase_price,
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedProductData, { new: true });
    console.log('Product updated:', updatedProduct);

    revalidatePath("/sallu_admin/product_list");

    const plainProduct = updatedProduct.toObject();
    const { __v, _id, createdAt, ...returnableProduct } = plainProduct;

    return returnableProduct;
  } catch (error) {
    console.error('Error editing product:', error);
    throw new Error('Error editing Product', error);
  }
};



export const fetchProducts = async (page = 1, limit = 12) => {
  try {
    await connectMongoDB();

    // Count total products for pagination
    const totalProducts = await Product.countDocuments();

    // Fetch paginated products
    const products = await Product.find()
      .sort({ createdAt: -1 }) // Sort by most recent products
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const totalPages = Math.ceil(totalProducts / limit);

    return { products, totalPages };
  } catch (error) {
    console.error("Error fetching products from database:", error);
    throw error;
  }
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
  const serializedOrders = orders.map(order => ({
    ...order,
    _id: order._id.toString(),
    createdAt: order.createdAt ? order.createdAt.toISOString() : null,
    updatedAt: order.updatedAt ? order.updatedAt.toISOString() : null,
    user: order.user.toString(), // Convert user ID to string if it's a reference
    ordered_items: order.ordered_items.map(item => ({
      ...item,
      _id: item._id.toString(), // Serialize each item's _id if it exists
      // Add additional transformations here if the item has other non-serializable fields
    })),
  }));
  
  return { orders: serializedOrders };
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
  const product = await Product.findById(id).lean()
  
  return {product};
};
// export const fetchProductByTitle = async (title) => {
//   await connectMongoDB();

//   try {
//     // Use a case-insensitive search with regex for more flexibility
//     const products = await Product.find({ title: { $regex: title, $options: 'i' } });
//     return { products };
//   } catch (error) {
//     console.error('Error fetching products by title:', error);
//     return { products: [] }; // Return an empty array on error
//   }
// };


export async function fetchProductByTitle(title3) {
  // Avoid repeated connections in every call
  if (!global.isMongoConnected) {
    await connectMongoDB();
    global.isMongoConnected = true;
  }

  try {
    const products = await Product.find({ title: { $regex: title3, $options: "i" } });
    return { products };
  } catch (error) {
    console.error("Error fetching products by title:", error);
    return { products: [] };
  }
}
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
    delivery_charge: order.delivery_charge,
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
// export async function createUserAction(formData) {
//   await connectMongoDB(); 

  
//   const name = formData.get('name');
//   const email = formData.get('email');
//   const password = formData.get('password');
//   const phone = formData.get('phone');
//   const address = formData.get('address');
//   const role = formData.get('role');
//   const avatar = formData.get('avatar'); 

  
//   const existingUser = await User.findOne({ phone:phone, name});
//   if (existingUser) {
//     throw new Error('User with this Phone already exists');
//   }

  
//   const hashedPassword = await bcrypt.hash(password, 10);

  
//   const newUser = new User({
//     name,
//     password: hashedPassword,
//     phone,
//     address,
//     role,
//     avatar,
//   });

 
//   const savedUser = await newUser.save();
//   revalidatePath("/sallu_admin/users_list")
  
//   return savedUser.toObject(); 
// }

export async function createUserAction(formData) {
  await connectMongoDB();

  const name = formData.get('name');
  let email = formData.get('email') || null;  // If no email, set to null
  const password = formData.get('password');
  const phone = formData.get('phone');
  const address = formData.get('address');
  const role = formData.get('role');
  const avatar = formData.get('avatar');

  // Ensure no duplicate entry based on phone or name
  const existingUser = await User.findOne({ phone: phone, name });
  if (existingUser) {
    throw new Error('User with this Phone already exists');
  }

  // If email is provided (non-empty), check for uniqueness
  if (email && email !== "") {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      throw new Error('User with this email already exists');
    }
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user with email set to null if no email is provided
  const newUser = new User({
    name,
    password: hashedPassword,
    phone,
    address,
    role,
    avatar,
  });

  // Save the new user to the database
  const savedUser = await newUser.save();
  
  // Trigger page revalidation
  revalidatePath("/sallu_admin/users_list");

  return savedUser.toObject(); 
}


export async function fetchProduct() {
  await connectMongoDB();
  
  const products = await Product.find();
  
  // Manually convert to plain objects
  // const plainProducts = products.map(product => product.toObject());
  const serializedProducts = products.map((product) => ({
    _id: product._id.toString(),
    title: product.title,
    description: product.description,
    price: product.price,
    discount: product.discount,
    purchase_price: product.purchase_price,
    images: product.images,
    category: product.category,
    createdAt: product.createdAt.toISOString(),
    skus: product.skus.map((sku) => ({
      color: sku.color,
      size: sku.size,
      sku: sku.sku,
      stock: sku.stock,
    })),
    stock: product.stock,
  }));
  return { products: serializedProducts };
}
export async function fetch12Product() {
  await connectMongoDB();
  
  const products = await Product.find()
    .sort({ createdAt: -1 }) // Sort by creation date in descending order
    .limit(12);               // Limit to the last 12 products
  
  // Manually convert to plain objects
  const serializedProducts = products.map((product) => ({
    _id: product._id.toString(),
    title: product.title,
    description: product.description,
    price: product.price,
    discount: product.discount,
    purchase_price: product.purchase_price,
    images: product.images,
    category: product.category,
    createdAt: product.createdAt.toISOString(),
    skus: product.skus.map((sku) => ({
      color: sku.color,
      size: sku.size,
      sku: sku.sku,
      stock: sku.stock,
    })),
    stock: product.stock,
  }));

  return { products: serializedProducts };

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

    return {
      categories: categories.map(item => ({
        _id: item._id.toString(), // Convert ObjectId to string
        category_name: item.category_name,
        category_image: item.category_image,
        
      })),
    };
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

// forgot password

export async function forgotPasswordAction(emailOrPhone) {
  try {
    await connectMongoDB();
    const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    // Generate reset token and expiration
    const resetToken = uuidv4();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 86400000; // 1 hour
    await user.save();

    // Send reset email (or SMS if using phone number)
    await sendPasswordResetEmail(user.email, resetToken);

    return { success: true, message: 'Password reset link sent' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to send password reset link' };
  }
}

export async function resetPasswordAction({ token, password }) {
  try {
    await connectMongoDB();
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    
    if (!user) {
      console.log("Token mismatch or token expired");
      console.log("Provided token:", token);
      console.log("Token in database:", user?.resetPasswordToken);
      console.log("Expiration time:", user?.resetPasswordExpires);
      console.log("Current time:", new Date(Date.now()).toISOString());
      return { success: false, message: 'Invalid or expired reset token' };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return { success: true, message: 'Password reset successful' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to reset password' };
  }
}