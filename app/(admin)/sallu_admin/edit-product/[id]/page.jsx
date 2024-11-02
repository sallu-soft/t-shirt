'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RxCross2 } from 'react-icons/rx'
import { toast } from '@/components/ui/use-toast'
// import { createProduct, getCategories } from '../actions'
import { editProduct, fetchSingleProduct, getCategories } from '../../actions'
import Image from 'next/image'

const EditProduct = ({params}) => {
  const [formData, setFormData] = useState([])
  const [categories, setCategories] = useState([]);
  const [imagesToRemove, setImagesToRemove] = useState([]);
  useEffect(() => {
    async function fetchCategories() {
      try {
        const {categories} = await getCategories();
        setCategories(categories); // Set the fetched categories
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }

    fetchCategories();
  }, []);
  useEffect(() => {
    async function getSingleProduct() {
      try {
        const {product} = await fetchSingleProduct(params.id);
        setFormData(product); // Set the fetched categories
        
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }

    getSingleProduct();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImagesChange = (event) => {
    const files = Array.from(event.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };
  const handleArrayChange = (e) => {
    const { name, value } = e.target
    const arrayValues = value.split(',').map((item) => item.trim()) // Split and trim spaces
    setFormData((prev) => ({
      ...prev,
      [name]: arrayValues,
    }))
  }
  // Example handleRemoveImage function in your React component:
const handleRemoveImage = (index) => {
  const removedImage = formData.images[index]; // Get the image URL that is being removed
  setImagesToRemove((prev) => [...prev, removedImage]); // Track this image as removed
  setFormData((prev) => ({
    ...prev,
    images: prev.images.filter((_, i) => i !== index), // Remove from the displayed images
  }));
};

  
    console.log(formData);
  
    // Form submission logic
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Constructing FormData object
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('title', formData.title);
        formDataToSubmit.append('description', formData.description);
        formDataToSubmit.append('price', formData.price);
        formDataToSubmit.append('category', formData.category);
        formDataToSubmit.append('discount', formData.discount);
        formDataToSubmit.append('purchase_price', formData.purchase_price);
        formDataToSubmit.append('stock', formData.stock);
      
        // Add sizes and colors as JSON
        
        const skusWithGeneratedSku = formData?.skus?.map((skuItem) => ({
          ...skuItem,
          sku: `${skuItem.size}-${skuItem.color}-${Date.now()}`
        }));
        formDataToSubmit.append("skus", JSON.stringify(skusWithGeneratedSku));
        // Append each new image file
        formData.images.forEach((image) => {
          formDataToSubmit.append('images', image);
        });
        // Append the images to be removed
        imagesToRemove.forEach((image) => {
          formDataToSubmit.append('removedImages', image);
        });
  
      try {
        // Send formDataToSubmit to server action
        await editProduct(formDataToSubmit ,params.id);
  
        // setFormData({
        //   title: '',
        //   description: '',
        //   price: '',
        //   purchase_price:'',
        //   discount:'',
        //   stock: '',
        //   images: [],
        //   category: '',
        //   sizes: '',
        //   colors: '',
        // });
  
        toast({
          title: 'Product Edited!',
          description: 'Your Product has been Successfully Edited.',
        });
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'Failed to Edit Product.',
        });
      }
    };
    const handleAddSKU = () => {
      setFormData((prev) => ({
        ...prev,
        skus: [...(prev?.skus || []), { size: '', color: '', stock: 0 }],
      }));
    };
  
    const handleSKUChange = (index, field, value) => {
      setFormData((prev) => {
        const newSkus = [...prev.skus];
        newSkus[index] = { ...newSkus[index], [field]: value };
        return { ...prev, skus: newSkus };
      });
    };
  
    const handleRemoveSKU = (indexToRemove) => {
      setFormData((prev) => ({
        ...prev,
        skus: prev?.skus?.filter((_, index) => index !== indexToRemove),
      }));
    };
  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 border border-primary_color bg-white shadow-lg rounded-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-primary_color">Add Product</h2>

      {/* Product Title */}
      <div className='grid grid-cols-3 gap-6 w-full'>
        {/* Product Category */}
      <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Product Category
            </label>
            <select
              id="category"
              name="category"
              value={formData?.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md p-2 border-gray-200 border"
              required
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category._id} value={category.category_name}>
                  {category.category_name}
                </option>
              ))}
            </select>
      </div>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="Product Name"
          value={formData?.title}
          onChange={handleChange}
          className="mt-1 block w-full"
          required
        />
      </div>

      

      
      {/* Product Price */}
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Product Price
        </label>
        <Input
          id="price"
          name="price"
          type="number"
          placeholder="Product Price"
          value={formData?.price}
          onChange={handleChange}
          className="mt-1 block w-full"
          required
        />
      </div>
      {/* Product Purchase Price */}
      <div>
        <label htmlFor="purchase_price" className="block text-sm font-medium text-gray-700">
          Product Purchase Price
        </label>
        <Input
          id="purchase_price"
          name="purchase_price"
          type="number"
          placeholder="Product Purchase Price"
          value={formData?.purchase_price}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
      </div>
      {/* Product Discount */}
      <div>
        <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
          Product Discount
        </label>
        <Input
          id="discount"
          name="discount"
          type="number"
          placeholder="Product Discount"
          value={formData?.discount}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
      </div>
      {/* <div>
        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
          Product Stock
        </label>
        <Input
          id="stock"
          name="stock"
          type="number"
          placeholder="Product Stock"
          value={formData?.stock}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
      </div> */}
      

      

      {/* Product Stock */}
     
      {/* Product Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Product Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Product Description"
          value={formData?.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md p-2 border-gray-200 border"
          rows={2}
          required
        ></textarea>
      </div>
      {/* Product Images */}
      <div>
  <label htmlFor="images" className="block text-sm font-medium text-gray-700">
    Product Images
  </label>
  <Input
    id="images"
    name="images"
    type="file"
    multiple
    accept="image/*"
    onChange={handleImagesChange}
    className="mt-1 block w-full"
  />
  {formData?.images?.length > 0 && (
    <div className="mt-2 text-sm text-gray-600">
      <ul className="flex gap-x-2">
        {formData?.images.map((image, index) => (
          <li className="bg-primary_color text-white p-1 rounded-lg flex items-center" key={index}>
          
            <Image width="100" height="100" src={image} alt={index+image} />
            <button
              type="button"
              className="ml-2 text-white hover:text-red-700"
              onClick={() => handleRemoveImage(index)}
            >
              <RxCross2 />
            </button>
           
          </li>
        ))}
      </ul>
    </div>
  )}
</div>
  
<div className="col-span-3">
  <h3 className="text-lg font-semibold mt-4">Product Variants (SKU)</h3>
  <Button type="button" onClick={handleAddSKU} className="mt-2">Add Variant</Button>
  {formData?.skus?.map((sku, index) => (
    <div key={index} className="flex items-center space-x-4 mt-2">
      <Input
        type="text"
        placeholder="Size"
        value={sku.size}
        onChange={(e) => handleSKUChange(index, 'size', e.target.value)}
        
      />
      <Input
        type="text"
        placeholder="Color"
        value={sku.color}
        onChange={(e) => handleSKUChange(index, 'color', e.target.value)}
        
      />
      <Input
        type="number"
        placeholder="Stock"
        value={sku.stock}
        onChange={(e) => handleSKUChange(index, 'stock', parseInt(e.target.value))}
        required
      />
      <button type="button" onClick={() => handleRemoveSKU(index)}>
        <RxCross2 />
      </button>
    </div>
  ))}
</div>
      </div>

      {/* Submit Button */}
      <div className="w-full flex items-center justify-center">
        <Button type="submit" className="w-fit bg-primary_color text-white">
          Add Product
        </Button>
      </div>
    </form>
  )
}

export default EditProduct
