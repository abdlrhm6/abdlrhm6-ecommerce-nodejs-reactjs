import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    productid: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    stars: {type: Number},
    review: {type: String, required: true}
},{timestamps: true})


export const Review = mongoose.model("Review", reviewSchema)