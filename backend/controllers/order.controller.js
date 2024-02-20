import { Order } from "../models/Order.model.js"

export const getCustomerOrder = async (req, res) => {
    const userId = req.user.id
    const orders = await Order.find({ userId: userId }).populate("products.product")
    return res.status(200).json({ orders })

}


export const getAdminOrders = async (req,res) => {
    const orders = await Order.find().populate("products.product")
    return res.status(200).json({ orders })
    
}

export const shipOrder = async (req,res) => {
    const {id} =  req.params

    console.log(id)
    await Order.findByIdAndUpdate(id,{status: "Shipped"})
    return res.json({success: "Product Shipped successfully"})
}