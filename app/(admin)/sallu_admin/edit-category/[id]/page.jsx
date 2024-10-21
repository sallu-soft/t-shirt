'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { getCategories, editCategory, getCategoryById } from '../../actions';

const EditProductCategory = ({ params }) => {
  const [formData, setFormData] = useState({
    category_name: '',
    category_image: '',
  });
  const [categoryImagePreview, setCategoryImagePreview] = useState('');

  // Fetch category by ID on mount
  useEffect(() => {
    async function fetchCategory() {
      try {
        // Fetch the specific category by ID
        const {category} = await getCategoryById(params.id); // Assuming you have an action to fetch the category by ID
        console.log(category)
        if (category) {
          // Set formData with existing category data
          setFormData({
            category_name: category.category_name,
            category_image: category.category_image, // Store the existing image (URL or path)
          });

          // Set image preview if category has an image
          setCategoryImagePreview(category.category_image);
        }
      } catch (error) {
        console.error('Failed to fetch category:', error);
      }
    }

    fetchCategory();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImagesChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        category_image: file,
      }));

      // Preview the newly selected image
      setCategoryImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('category_name', formData.category_name);
    formDataToSubmit.append('category_image', formData.category_image);

    try {
      await editCategory(params.id, formDataToSubmit); // Call the server action to edit the category

      toast({
        title: 'Category updated!',
        description: 'Your category has been successfully updated.',
      });

      // Optionally redirect or update the UI as needed
    } catch (error) {
      console.error('Error updating category:', error);
      toast({
        title: 'Error',
        description: 'Failed to update category.',
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6 p-6 border border-primary_color bg-white shadow-lg rounded-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-primary_color">Edit Category</h2>

        <div className="grid grid-cols-3 gap-6 w-full">
          <div>
            <label htmlFor="category_name" className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <Input
              id="category_name"
              name="category_name"
              type="text"
              placeholder="Category Name"
              value={formData.category_name}
              onChange={handleChange}
              className="mt-1 block w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Category Image
            </label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImagesChange}
              className="mt-1 block w-full"
            />

            {/* Display image preview */}
            {categoryImagePreview && (
              <div className="mt-2">
                <img src={categoryImagePreview} alt="Category Image Preview" className="h-20 w-20 object-cover" />
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex items-center">
          <Button type="submit" className="w-fit bg-primary_color text-white">
            Update Category
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProductCategory;
