import { Order } from "../models/Order.model.js"
import { Review } from "../models/review.model.js"
import {Product} from "../models/product.model.js"



export const addReview = async (req, res) => {
  const { id } = req.user
  const { productId, reviewText, stars } = req.body
  const userOrders = await Order.find({
    userId: id
  })


  let userCanPostAReview = false
  for (const order of userOrders) {
    if (order.products.some((product) => product.product == productId)) {
      userCanPostAReview = true;
      break;
    }
  }

  if (userCanPostAReview === false) {
    return res.json({ error: "Cannot Post A Review, please buy this product first To make a review." })

  } else {
    const createdReview =await Review.create({
      userid: id,
      productid: productId,
      review: reviewText,
      stars
    })
    const productToUpdate = await Product.findById(productId)
    productToUpdate.reviews.push(createdReview._id)
    productToUpdate.save()

    return res.json({ success: "Review Added Successfully." })
  }
}