'use client'
import { useRouter, useSearchParams } from "next/navigation";

const Success = () => {
  const router = useRouter();
  // const searchParams = useSearchParams()
  // const message = searchParams?.get('message');
  const HandleClick = () => {
    router.push("/");
  };
  return (
    <div className="h-[90vh] flex justify-center items-center">
      Your Payment has Successfully Done!!<br />
      <button
        className="p-4 bg-green font-semibold text-lg "
        onClick={() => HandleClick()}
      >
        Go to Home
      </button>
    </div>
  );
};

export default Success;
