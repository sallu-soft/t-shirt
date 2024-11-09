import mongoose, {Schema} from "mongoose";


const orderSchema = new Schema(
    {
        name:String,
        address:String,
        mobile_no:String,
        whatsapp_no:String,
        ordered_items:[{
            color:String,
            image:String,
            price:Number,
            product:String,
            quantity:Number,
            size:String,
            stock:Number,
            title:String
        }],
        user:String,
        delivery_charge:Number,
        total_price:Number,
        is_paid:Boolean,
        payment_method: { type: String, enum: ['Cash', 'Bkash', 'Online'], required: true },
        payment_status: {
            type: String,
            enum : ['Pending','Shipped','Delivered','Cancelled'],
            default: 'Pending'
        },
    },
    {
        timestamps:true,
    }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;