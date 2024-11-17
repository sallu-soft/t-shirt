import { fetchSingleProduct } from "@/app/(admin)/sallu_admin/actions";

import SingleProduct from "@/app/components/SingleProduct";

export async function generateMetadata({ params }) {
  // Fetch product details based on the `params.title`
  const { product } = await fetchSingleProduct(params.title);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
      metadataBase: new URL(
        process.env.FRONTEND_URL || "http://localhost:3000"
      ),
    };
  }

  return {
    title: product.title,
    description: product.description || "Check out this amazing product!",
    openGraph: {
      title: product.title,
      description: product.description || "Check out this amazing product!",
      images: [
        {
          url: product?.images?.[0] || "/sallu_1.png",
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description || "Check out this amazing product!",
      images: [product?.images?.[0] || "/fallback-image.jpg"],
    },
  };
}
const SingleProductPage = async ({ params }) => {
  const { product } = await fetchSingleProduct(params.title);

  if (product.length <= 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* CSS Spinner */}
        <div
          className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-primary_color border-gray-200 rounded-full"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        {/* Text */}
        <p className="ml-4 text-2xl text-primary_color font-semibold">
          Loading Product...
        </p>
      </div>
    );
  }

  return (
    <>
      <SingleProduct product={product} />
    </>
  );
};

export default SingleProductPage;
