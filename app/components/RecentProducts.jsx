
import React from 'react';
import ProductCard from './ProductCard';
import { fetch12Product} from '@/app/(admin)/sallu_admin/actions';
import { Context } from '@/provider/ContextProvider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const RecentProducts = async () => {
  // const [products, setProducts] = useState([]);
  
  const {products} = await fetch12Product()
  return (
    <div className="w-full items-center flex justify-center">
     
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-col-2 gap-3">
        {products?.map((product, ind) => (
          <ProductCard key={product._id} product={product} /> 
        ))}
      </div>
     
      {/* {loading && <div>Loading...</div>}
      {!hasMore && <div>No more products</div>} */}
    </div>
  );
};

export default RecentProducts;