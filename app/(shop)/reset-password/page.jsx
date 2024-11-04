'use client'
import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetPasswordAction } from '@/app/(admin)/sallu_admin/actions';

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
    console.log(token)
  const handleSubmit = async () => {
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const response = await resetPasswordAction({ token, password });
    if (response.success) {
      router.push('/login');
    } else {
      setError(response.message || 'Failed to reset password');
    }
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
    <div className="flex items-center justify-center py-14 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-primary_color mb-4">Reset Password</h2>
        <p className="text-center font-semibold text-gray-600 mb-4">Please fill in the Passwords below:</p>
        <form action={handleSubmit} autoComplete="off" className="space-y-4">
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
              className={`mt-1 block w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm`}
              placeholder="Password"
             
            />
            
          </div>
         
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
             type="password"
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
            required
              className={`mt-1 block w-full p-2 border ${error? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm`}
              placeholder="Confirm Password"
              
            />
          
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-transparent text-primary_color border border-primary_color  font-semibold rounded-md hover:bg-primary_color hover:text-white transition-all duration-250 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black"
          >
            Reset Password
          </button>
          {error && <p className="error-message">{error}</p>}
          
        </form>

        

      </div>
    </div>
    </Suspense>
  );
};

export default ResetPassword;