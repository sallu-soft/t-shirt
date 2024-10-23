import React from "react";
import Image from "next/image";


const SearchProducts = ({ item }) => {
  return (
    <div className="flex items-center gap-4">
      <Image className="w-24" src={item.images[0]} alt="productImage" width={150} height={140} />
      <div>
        <p className="text-xs -mb-1">
          {item.category}
        </p>
        <p className="text-lg font-medium">{item.title}</p>
        <p className="text-xs">{item.description.substring(0, 100)}</p>
        <p className="text-sm flex items-center gap-1">
          price:{" "}
          <span className="font-semibold">
          {item.price - item.discount}
          </span>
          <span className="text-gray-600 line-through">
            {item.price}
          </span>
        </p>
      </div>
      <div className="flex-1 ml-auto text-right px-4">
        <p className="text-base font-semibold animate-bounce text-blue">
          Save {item.discount}  
        </p>
      </div>
    </div>
  );
};

export default SearchProducts;