import mongoose from "mongoose"

const brandySchema = new mongoose.Schema({
    name: {type: String,required: true}
} , {timestamps: true})

export const Brand = mongoose.model("Brand",brandySchema)