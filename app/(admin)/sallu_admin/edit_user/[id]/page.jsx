'use client';
import { createUserAction, editUserAction, fetchSingleUser } from '@/app/(admin)/sallu_admin/actions';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';

// Define the Zod schema for form validation
const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(11, 'Phone number must be at least 11 digits').max(11, 'Phone number is too long').regex(/^\d+$/, 'Phone number must contain only digits'),
  address: z.string().min(5, 'Address must be at least 5 characters long'),
  password: z.string(),
});

const EditUser = ({params}) => {
    const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(''); // State for storing errors

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(()=>{
    const FetchSingleUser = async() => {
        const {user} = await fetchSingleUser(params.id);
        setFormData({...user,password:""})
    }
    FetchSingleUser();
  },[])
  const handleSubmit = async (e) => {
  
    // Constructing FormData object for user data
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('email', formData.email);
    formDataToSubmit.append('phone', formData.phone);
    formDataToSubmit.append('address', formData.address);
    formDataToSubmit.append('password', formData.password);
  
    // Client-side Zod validation
    const userData = Object.fromEntries(formDataToSubmit.entries()); // Convert FormData to an object for validation
    const result = registerSchema.safeParse(userData); // Use the Zod schema for validation
  
    if (!result.success) {
      const errorMessages = result.error.format();
      setErrors(errorMessages); // Show errors on the form
    } else {
      setErrors({}); // Clear errors if valid
  
      try {
        // Send formDataToSubmit to server action
        await editUserAction(params.id,formDataToSubmit);
  
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          password: '',
          address: '',
          phone: '',
        });
  
        toast({
          title: 'User Edited!',
          description: 'Your account has been successfully edited.',
        });
        router.push('/sallu_admin/users_list');
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'Failed to edit user.',
        });
      }
    }
  };
  
  return (
    <div className="flex items-center justify-center py-14 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-primary_color mb-4">Edit the User</h2>
        <p className="text-center font-semibold text-gray-600 mb-4">Please fill in the information below:</p>
        <form action={handleSubmit} autoComplete="off" className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              autoComplete="off"
              className={`mt-1 block w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm`}
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name._errors[0]}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              className={`mt-1 block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm`}
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email._errors[0]}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              required
              autoComplete="off"
              className={`mt-1 block w-full p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm`}
              placeholder="Phone No"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone._errors[0]}</p>}
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Full Address</label>
            <input
              type="text"
              name="address"
              id="address"
              required
              autoComplete="off"
              className={`mt-1 block w-full p-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm`}
              placeholder="Type Address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address._errors[0]}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              className={`mt-1 block w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm`}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password._errors[0]}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-transparent text-primary_color border border-primary_color  font-semibold rounded-md hover:bg-primary_color hover:text-white transition-all duration-250 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black"
          >
            Edit Account
          </button>
          {status && <p className="text-green-500 mt-4 text-center">{status}</p>}
        </form>

       
      </div>
    </div>
  );
};

export default EditUser;