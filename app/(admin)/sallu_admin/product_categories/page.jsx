'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { createCategory, getCategories } from '../actions'; // Import server actions

const ProductCategrory = () => {
  const [formData, setFormData] = useState({
    category_name: '',
    category_image: '',
  });
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [itemsPerPage] = useState(5); // Items per page

  // Fetch categories on mount
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('category_name', formData.category_name);
    formDataToSubmit.append('category_image', formData.category_image);

    try {
      await createCategory(formDataToSubmit);
      setFormData({
        category_name: '',
        category_image: '',
      });

      toast({
        title: 'Category added!',
        description: 'Your category has been successfully added.',
      });

      // Refetch categories after successful creation
      const updatedCategories = await getCategories();
      setCategories(updatedCategories);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to add category.',
      });
    }
  };

  // Pagination logic
  const indexOfLastCategory = currentPage * itemsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
  const currentCategories = categories?.slice(indexOfFirstCategory, indexOfLastCategory);

  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6 p-6 border border-primary_color bg-white shadow-lg rounded-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-primary_color">Add Category</h2>

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
          </div>
        </div>

        <div className="w-full flex items-center">
          <Button type="submit" className="w-fit bg-primary_color text-white">
            Add Category
          </Button>
        </div>
      </form>

      {/* Render Categories with Pagination */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Categories</h3>
        {categories.length > 0 ? (
          <>
            <table className="min-w-[50%] bg-white shadow-lg">
              <thead className="text-start">
                <tr>
                  <th className="py-2 text-start px-4 border-b">Category Name</th>
                  <th className="py-2 px-4 text-start border-b">Category Image</th>
                </tr>
              </thead>
              <tbody>
                {currentCategories?.map((category) => (
                  <tr key={category?._id} className="border-t">
                    <td className="py-2 px-4 border-b">
                      <h4 className="font-bold">{category?.category_name}</h4>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <img
                        src={`${category?.category_image}`}
                        alt={category?.category_name}
                        className="w-16 h-16"
                        width={200}
                        height={200}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex w-[50%] justify-between items-center mt-4">
              <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
              </Button>
            </div>
          </>
        ) : (
          <p>No categories available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductCategrory;
