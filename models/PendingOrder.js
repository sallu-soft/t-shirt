import mongoose from "mongoose";

const skuSchema = new mongoose.Schema({
    sku: { type: String, required: true },
    color: { type: String, default: "" },
    size: { type: String, default: "" },
    stock: { type: Number, required: true },
  });
  
  const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    title: { type: String, },
    price: { type: Number, },
    image: { type: String,  },
    quantity: { type: Number,},
    color: { type: String, default: "" },
    size: { type: String, default: "" },
    sku: { type: skuSchema,  },
  });
  
  const PendingOrderSchema = new mongoose.Schema(
    {
      referenceID: { type: String, unique: true, },
      name: { type: String,  },
      address: { type: String,  },
      mobile_no: { type: String,  },
      whatsapp: { type: String, default: "" },
      totalPrice: { type: Number, },
      delivery_charge: { type: Number, },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
      cart: { type: [cartItemSchema], required: true },
      paymentMethod: { type: String, },
    },
    {
      timestamps: true, // Automatically add createdAt and updatedAt fields
    }
  );

export default mongoose.models.PendingOrder || mongoose.model("PendingOrder", PendingOrderSchema);