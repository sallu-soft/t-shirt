
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/db";
import Order from "@/models/Orders";

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

export async function GET(req,res) {
  console.log("POST request Callback")
  
  const url = req.url;
  const urlParams = new URLSearchParams(url.split('?')[1]);
  const paymentID = urlParams?.get('paymentID');
  const status = urlParams?.get('status');
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
      console.log("hellow world from Exicute api"+data)
      if (data && data.statusCode === "0000") {
        // const data = getSharedRequest(); // retrieve the requestBody from the shared request object
        
        // const { name, address, mobile_no, whatsapp, childSizes, adultSizes, totalPrice, model } = requestBody;
        
        const globalData = global.request;
        console.log(globalData)
        await connectMongoDB();
        await Order.create({name:globalData?.name,address:globalData?.address,mobile_no:globalData?.mobile_no, whatsapp_no:globalData?.whatsapp,total_price:globalData?.totalPrice,adult_sizes:globalData?.adultSizes,model:globalData?.model, child_sizes:globalData?.childSizes, payment_method:globalData?.paymentMethod,isPaid:true});

        console.log(data)
        console.log("successfully exicute from Exicute")
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CORS}/bkash_message/success`);
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
};

