'use client';
import { createUserAction, loginUserAction } from '@/app/(admin)/sallu_admin/actions';
import { toast } from '@/components/ui/use-toast';
import { UserContext } from '@/provider/UsersContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { z } from 'zod';

// Define the Zod schema for form validation
const loginSchema = z.object({
 
  phone: z.string().min(11, 'Phone number must be at least 11 digits').max(11, 'Phone number is too long').regex(/^\d+$/, 'Phone number must contain only digits'),
  
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const LoginForm = () => {
    const router = useRouter()
  const [formData, setFormData] = useState({
   
    password: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(''); // State for storing errors
  const { updateUser } = useContext(UserContext);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 
  // const handleSubmit = async (e) => {

  //   const formDataToSubmit = new FormData();
  //   formDataToSubmit.append('phone', formData.phone);
  //   formDataToSubmit.append('password', formData.password);

  //   const userData = Object.fromEntries(formDataToSubmit.entries()); // Convert FormData to an object
  //   const result = loginSchema.safeParse(userData);

  //   if (!result.success) {
  //     setErrors(result.error.format());
  //   } else {
  //     setErrors({});

  //     try {
  //       // Call the server action for login
  //       const response = await loginUserAction(userData);
  //       await (response.user)
  //       if (response.success) {
  //         toast({
  //           title: 'Login Successful',
  //           description: 'You have been logged in successfully.',
  //         });
  //         router.push('/'); // Redirect user after successful login
  //       } else {
  //         toast({
  //           title: 'Error',
  //           description: response.message || 'Login failed.',
  //         });
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       toast({
  //         title: 'Error',
  //         description: 'Failed to log in.',
  //       });
  //     }
  //   }
  // };
  const handleSubmit = async (e) => {
  
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('phone', formData.phone);
    formDataToSubmit.append('password', formData.password);
  
    const userData = Object.fromEntries(formDataToSubmit.entries()); // Convert FormData to an object
    const result = loginSchema.safeParse(userData);
  
    if (!result.success) {
      setErrors(result.error.format());
    } else {
      setErrors({});
  
      try {
        // Call the server action for login
        const response = await loginUserAction(userData);
        console.log(response)
        // Check if login was successful and user data exists
        if (response.success && response.user) {
          // Store user data in localStorage
          await updateUser({
            phone: formData.phone,
            ...response.user // Assuming response contains user details like name, token, etc.
          });
          
          toast({
            title: 'Login Successful',
            description: 'You have been logged in successfully.',
          });
          
          // Redirect user after successful login
          if(response?.user?.role === 'admin'){
            router.push('/sallu_admin')
          }else{
            router.push('/'); // or wherever you want to redirect
          }
          

        } else {
          toast({
            title: 'Error',
            description: response.message || 'Login failed.',
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'Failed to log in.',
        });
      }
    }
  };
  return (
    <div className="flex items-center justify-center py-14 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-primary_color mb-4">লগইন করুন</h2>
        <p className="text-center font-semibold text-gray-600 mb-4">নিচের তথ্যগুলো পুরন করুন :</p>
        <form action={handleSubmit} autoComplete="off" className="space-y-4">
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">মোবাইল নাম্বার</label>
            <input
              type="text"
              name="phone"
              id="phone"
              required
              autoComplete="off"
              className={`mt-1 block w-full p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm`}
              placeholder="01XXXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone._errors[0]}</p>}
          </div>
         
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">পাসওয়ার্ড</label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              required
              className={`mt-1 block w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm`}
              placeholder="........"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password._errors[0]}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-transparent text-primary_color border border-primary_color  font-semibold rounded-md hover:bg-primary_color hover:text-white transition-all duration-250 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black"
          >
            Login
          </button>
          {status && <p className="text-green-500 mt-4 text-center">{status}</p>}
        </form>

        <p className="text-center text-gray-600 mt-4">
          Dont have an account?{' '}
          <Link href="/register" className="text-yellow-600 hover:underline">Register</Link>
        </p>
        {/* <Link href="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</Link> */}
      </div>
    </div>
  );
};

export default LoginForm;
