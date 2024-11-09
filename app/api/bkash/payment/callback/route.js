import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/db";
import { createOrder, reduceProductStock } from "@/app/(admin)/sallu_admin/actions";
import { emptyCart } from "@/provider/CartContext";

const bkash_auth = async () => {
  try {
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_BKASH_GRANT_TOKEN_URL,
      {
        app_key: process.env.NEXT_PUBLIC_BKASH_APP_KEY,
        app_secret: process.env.NEXT_PUBLIC_BKASH_APP_SECRET,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          username: process.env.NEXT_PUBLIC_BKASH_USERNAME,
          password: process.env.NEXT_PUBLIC_BKASH_PASSWORD,
        },
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
};

const bkash_headers = async () => {
  const authData = await bkash_auth();
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: authData.id_token,
    "x-app-key": process.env.NEXT_PUBLIC_BKASH_APP_KEY || "",
  };
};

export async function GET(req, res) {
  console.log("POST request Callback");

  const url = req.url;
  const urlParams = new URLSearchParams(url.split("?")[1]);
  const paymentID = urlParams?.get("paymentID");
  const status = urlParams?.get("status");
  if (status === "cancel" || status === "failure") {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_CORS}/bkash_message/error?message=${status}`
    );
  }
  if (status === "success") {
    try {
      console.log("hellow world from Exicute api started");

      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_BKASH_EXECUTE_PAYMENT_URL,
        { paymentID },
        {
          headers: await bkash_headers(),
        }
      );
      console.log("hellow world from Exicute api" + data);
      if (data && data.statusCode === "0000") {
        // const data = getSharedRequest(); // retrieve the requestBody from the shared request object

        // const { name, address, mobile_no, whatsapp, childSizes, adultSizes, totalPrice, model } = requestBody;

        const globalData = global.request;
        console.log(globalData);
        try {
          // Connect to MongoDB and create the order
          await connectMongoDB();
          await createOrder(globalData);
          console.log("Order created successfully");
      
          // Reduce the product stock for each item in the cart
          for (const item of globalData?.cart) {
            await reduceProductStock(item.product, item.sku, item.quantity);
          }
      
          // Empty the cart after the order and stock reduction are complete
          
      
          console.log("Product stock reduced and cart emptied");
      
          // Redirect to the success page
          return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CORS}/bkash_message/success`);
        } catch (error) {
          console.error("Error during payment execution or order creation:", error);
          return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CORS}/bkash_message/error`);
        }
        // console.log(data);
        // console.log("successfully exicute from Exicute");
        // return NextResponse.redirect(
        //   `${process.env.NEXT_PUBLIC_CORS}/bkash_message/success`
        // );
      } else {
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_CORS}/bkash_message/error?message=${data.statusMessage}`
        );
      }
    } catch (error) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_CORS}/bkash_message/error?message=${error.message}`
      );
    }
  }
}
