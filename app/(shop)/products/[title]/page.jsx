import { fetchSingleProduct } from "@/app/(admin)/sallu_admin/actions";
import RelatedCatProduct from "@/app/components/RelatedCatProduct";

import SingleProduct from "@/app/components/SingleProduct";

export async function generateMetadata({ params }) {
  const siteBaseUrl = process.env.FRONTEND_URL || "http://localhost:3000";

  // Fetch product details based on the `params.title`
  const { product } = await fetchSingleProduct(params.title);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
      metadataBase: new URL(siteBaseUrl),
    };
  }

  return {
    title: product.title,
    description: product.description || "Check out this amazing product!",
    metadataBase: new URL(siteBaseUrl),
    openGraph: {
      title: product.title,
      description: product.description || "Check out this amazing product!",
      images: [
        {
          url: new URL(product?.images?.[0] || "/sallu_1.png", siteBaseUrl),
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
      images: [
        new URL(product?.images?.[0] || "/sallu_1.png", siteBaseUrl),
      ],
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
      <div className="xl:w-[70%] lg:w-[90%] w-[95%] mx-auto">
        <h2 className="text-primary_color font-semibold text-xl">Related Products</h2>
        <RelatedCatProduct product={product} />
      </div>
    </>
  );
};

export default SingleProductPage;
