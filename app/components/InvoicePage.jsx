'use client'
import React, {useRef} from 'react'
import {useReactToPrint} from 'react-to-print';
const InvoicePage = ({order}) => {
  console.log(order)
    const printRef = useRef();
    const handlePrint = useReactToPrint( {
        content:()=>printRef.current,
    })
    const mergedArray = Object?.entries(order?.adult_sizes || {}).concat(Object.entries(order?.child_sizes || {})).filter(([_, value]) => value > 0);
    const adultTotal = Object?.values(order?.adult_sizes || {}).reduce((acc, curr) => acc + curr, 0);
const childTotal = Object?.values(order?.child_sizes || {}).reduce((acc, curr) => acc + curr, 0);
    const totalQty = adultTotal+childTotal
    const totalPrice = ((order?.total_price) + (order?.delivery_charge || 0));
  return (
    <>
        <div className="w-[60%] mx-auto my-3 flex justify-end"><button className="px-6 py-2 rounded-md shadow-lg bg-blue-600 text-white" onClick={()=>handlePrint()}>Print</button></div>
      <div
        ref={printRef}
        className="w-[1150px] h-[1620px] flex gap-y-9 flex-col mx-auto bg-white m-3 shadow-xl p-10 px-[80px]"
      >
        <div className="h-[50%] pt-10">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Logo</h2>
            <h2 className="text-2xl font-bold items-center flex flex-col">
              Invoice #{order?._id.substring(order?._id.length - 5)}
              <br />
            </h2>

            <div className="">
              <h3 className="text-2xl font-semibold">Sallu Garments</h3>
              <p>
                <span className="font-semibold">Mobile No</span> : 01888283737
              </p>
              <p>
                <span className="font-semibold">Gmail</span> : Sallu@gmail.com
              </p>
              <p>
                291, Jomider Palace, Fakirapool,
                <br /> Motijheel, Dhaka-1000{" "}
              </p>
            </div>
          </div>
          <div>
            {/* <table class="mt-8 table-auto w-full border-collapse border shadow-lg border-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-4 py-2">Product</th>
                  <th class="px-4 py-2">Sizes</th>
                  <th class="px-4 py-2">Total QTY</th>
                  <th class="px-4 py-2">TOTAL PRICE</th>
                </tr>
              </thead>
              <tbody class="text-gray-700">
                <tr>
                  <td class="border px-4 py-2 text-center">T-Shirt</td>
                  <td class="border px-4 py-2 text-center">{mergedArray?.map(([key,value]) =>{
                           return <span className="px-2 py-1 flex-wrap text-md m-1 bg-white  uppercase font-semibold rounded text-gray-900" key={value}>{`${key} : ${value}`}</span>
                        })}</td>
                  <td class="border px-4 py-2 text-center"> 
                        {totalQty}</td>
                  <td class="border px-4 py-2 text-center">{order?.total_price}</td>
                </tr>

                <tr class="bg-gray-100">
                  <td class="border px-4 py-2" colspan="2"></td>
                  <td class="border px-4 py-2 text-end">Delivery Charge</td>
                  <td class="border px-4 py-2 text-center">{order?.delivery_charge}</td>
                </tr>
                <tr class="bg-gray-100">
                  <td class="border px-4 py-2" colspan="2"></td>
                  <td class="border px-4 py-2 text-end">TOTAL</td>
                  <td class="border px-4 py-2 text-center font-semibold">
                  {order?.total_price+order?.delivery_charge}
                  </td>
                </tr>
              </tbody>
            </table> */}
            <div className="overflow-x-auto w-full p-4">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-gray-800 border-b">
            <th className="py-2 px-3 text-left">Product ID</th>
            <th className="py-2 px-3 text-left">Title</th>
            <th className="py-2 px-3 text-left">Color</th>
            <th className="py-2 px-3 text-left">Price</th>
            <th className="py-2 px-3 text-left">Quantity</th>
            <th className="py-2 px-3 text-left">Size</th>
          </tr>
        </thead>
        <tbody>
          {order?.ordered_items.map((item) => (
            <tr key={item._id} className="border-b hover:bg-gray-50">
              
              <td className="py-2 px-3">{item.product?.slice(0,8)}</td>
              <td className="py-2 px-3">{item.title}</td>
              <td className="py-2 px-3">{item.color || '—'}</td>
              <td className="py-2 px-3">{item.price}</td>
              <td className="py-2 px-3">{item.quantity}</td>
              <td className="py-2 px-3">{item.size || '—'}</td>
            </tr>
            
          ))}
           <tr class="">
                  <td class="border px-4 py-2" colspan="4"></td>
                  <td class="border px-4 py-2 text-end">Delivery Charge</td>
                  <td class="border px-4 py-2 text-center">{order?.delivery_charge}</td>
                </tr>
                <tr class="">
                  <td class="border px-4 py-2" colspan="4"></td>
                  <td class="border px-4 py-2 text-end">TOTAL</td>
                  <td class="border px-4 py-2 text-center font-semibold">
                  {totalPrice}
                  </td>
                </tr>
        </tbody>
      </table>
    </div>
            <div className="flex justify-between items-end mt-[300px]">
                <p className="border-t border-gray-400 border-dashed px-4">Authority Signature</p>
                <p className="border-t border-gray-400 border-dashed px-4">Customer Signature</p>
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default InvoicePage;
// 'use client'
// import React from 'react'

// const InvoicePage = () => {
//   return (
//     <div>InvoicePage</div>
//   )
// }

// export default InvoicePage