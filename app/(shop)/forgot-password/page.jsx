// 'use client'
// import React, { useState } from 'react';
// import { forgotPasswordAction } from '@/app/(admin)/sallu_admin/actions';
// import { toast } from '@/components/ui/use-toast';

// const ForgotPassword = () => {
//   const [emailOrPhone, setEmailOrPhone] = useState('');
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     console.log("beforeSubmit")
//     const response = await forgotPasswordAction(emailOrPhone);
//     console.log("beforeSubmit")
//     if (response.success) {
//       toast({
//         title: 'Check your inbox',
//         description: 'A password reset link has been sent to your email or phone.',
//       });
//     } else {
//       setError(response.message || 'Failed to request password reset');
//     }
//   };

//   return (
//     <div className="forgot-password-container">
//       <h2>Forgot Password</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Email or Phone</label>
//         <input
//           type="text"
//           value={emailOrPhone}
//           onChange={(e) => setEmailOrPhone(e.target.value)}
//           required
//         />
//         <button type="submit">Request Reset Link</button>
//         {error && <p className="error-message">{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;

'use client'
import React, { useState } from 'react';
import { forgotPasswordAction } from '@/app/(admin)/sallu_admin/actions';
import { toast } from '@/components/ui/use-toast';

const ForgotPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const response = await forgotPasswordAction(emailOrPhone);
    if (response.success) {
      toast({
        title: 'Check your inbox',
        description: 'A password reset link has been sent to your email or phone.',
      });
    } else {
      setError(response.message || 'Failed to request password reset');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-gray-600">Email or Phone</label>
          <input
            type="text"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email or phone"
          />
          <button
            type="submit"
            className="w-full bg-primary_color hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Request Reset Link
          </button>
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;