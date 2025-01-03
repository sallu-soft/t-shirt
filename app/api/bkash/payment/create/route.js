import PendingOrder from "@/models/PendingOrder";
import axios from "axios";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";


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
      console.log(data);
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

  export async function POST(req,res){
    const requestBody = await req.json();
    
    const { name, address, mobile_no, whatsapp, totalPrice, user, cart, paymentMethod,delivery_charge } = requestBody;
    console.log(cart)
    
    // global.request = requestBody;
    console.log(requestBody)
    try {
      const referenceID = uuidv4();
      console.log(referenceID);
      await PendingOrder.create({ referenceID, ...requestBody });
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_BKASH_CREATE_PAYMENT_URL,
        {
          mode: "0011",
          payerReference: name,
          callbackURL: `${process.env.NEXT_PUBLIC_CORS}/api/bkash/payment/callback?referenceID=${referenceID}`,
          amount: totalPrice + delivery_charge,
          currency: "BDT",
          intent: "sale",
          merchantInvoiceNumber: "Inv" + referenceID.substring(0, 5),
        },
        {
          headers: await bkash_headers(),
        }
      );
    //   return res.status(200).json({ bkashURL: data.bkashURL, email: email });
      return NextResponse.json({ bkashURL: data.bkashURL},{referenceID},{status: 201});
    } catch (error) {
      return NextResponse.json({ error: error.message });
    }
}
