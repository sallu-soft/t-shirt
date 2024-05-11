'use client'
import { useRouter, useSearchParams } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const message = searchParams?.get('message');

  const HandleClick = () => {
    router.push("/");
  };
  return (
    <div className="text-2xl flex h-[90vh] items-center justify-center">
      Payment Error: {message}
      <br />
      <button
        className="p-4 bg-green font-semibold text-lg "
        onClick={() => HandleClick()}
      >
        Go to Home
      </button>
    </div>
  );
};

export default ErrorPage;
