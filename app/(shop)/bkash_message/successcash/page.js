'use client'

// export default Success;
import { Suspense } from 'react';
import { useRouter } from "next/navigation";

const Success = () => {
  const router = useRouter();
  const HandleClick = () => {
    router.push("/");
  };
  return (
    <div className="h-[90vh] flex justify-center items-center">
     অভিনন্দন!! আপনার অর্ডারটি সম্পন্ন হয়েছে।<br />
      <button
        className="p-4 bg-green font-semibold text-lg "
        onClick={() => HandleClick()}
      >
        Go to Home
      </button>
    </div>
  );
};

const SuccessWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Success />
  </Suspense>
);

export default SuccessWithSuspense;