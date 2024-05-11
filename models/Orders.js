import mongoose, {Schema} from "mongoose";


const orderSchema = new Schema(
    {
        name:String,
        address:String,
        mobile_no:String,
        whatsapp_no:String,
        adult_sizes:Object,
        child_sizes:Object,
        total_price:Number,
        isPaid:Boolean,
        model:String,
        payment_method:String,
        status: {
            type: String,
            enum : ['Pending','Shipped','Delivered'],
            default: 'Pending'
        },
    },
    {
        timestamps:true,
    }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;