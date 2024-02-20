import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    quantity: { type: Number, required: true },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Review"
    }]
})



export const Product = mongoose.model("Product", productSchema)