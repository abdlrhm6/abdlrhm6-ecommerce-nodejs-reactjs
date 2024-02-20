import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: Number
        }
    ],
    status: {
        type: String,
        default: "Pending",
    },
    total: {
        type: Number
    }
}, {
    timestamps: true
})

export const Order = mongoose.model("Order", OrderSchema)