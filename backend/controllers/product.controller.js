import { validateProductBody } from "../utils/validation.js";
import { Product } from "../models/product.model.js";
import { Brand } from "../models/brand.model.js";
import { Category } from "../models/category.model.js";
import Stripe from "stripe";
const stripe = Stripe("sk_test_51OiwDjGBqHGn9PeYCsXgIUOKMrLPuh4GMAg3S9K9gnLX3EKTSHZTriOa5UYZfFPFFuyKgEGkjsYAG4MROqprtGIy00giYdN6DH")

export const saveProduct = async (req, res, next) => {

    const { error, value } = validateProductBody(req.body)
    if (error) {
        const errorMessages = error.details.map(e => e.message)
        return res.status(400).json({ error: errorMessages })
    }
    const productExists = await Product.findOne({ name: value.name })
    if (productExists) {
        return res.status(400).json({ error: "This product already exists" })
    }
    try {
        const savedProduct = await Product.create({ ...value })
        return res.status(201).json({ success: "Product Added successfully" })
    } catch (e) {
        next(e.message)
    }
    res.json()
}

export const getAllProducts = async (req, res) => {

    const page = +req.query.page - 1 || 0
    const search = req.query.search || ""
    const limit = +req.query.limit || 6
    let price = +req.query.price
    let sort = req.query.sort || "price"
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort])

    let sortBy = {}
    if (sort[1]) {
        sortBy[sort[0]] = sort[1]
    } else {
        sortBy[sort[0]] = "asc"
    }



    let categories = await Category.find()
    let brands = await Brand.find()
    categories = categories.map(cat => cat.name)
    brands = brands.map(brand => brand.name)


    const category = req.query.category ? req.query.category.split(",") : categories
    const brand = req.query.brand ? req.query.brand.split(",") : brands

    let products = await Product.find({
        name: { $regex: search, $options: "i" },
        $and: [{ price: { $lte: price === 200 ? 1000 : price + 100 } }, { price: { $gte: price === 1000 ? 0 : price } }]
    })

        .sort(sortBy)
        .populate(['category', 'brand'])
        .exec()

    let totalProducts = products.filter(p => {
        return category.includes(p.category.name) && brand.includes(p.brand.name)
    }).length

    products = products.filter(p => {
        return category.includes(p.category.name) && brand.includes(p.brand.name)
    }).slice(page * limit, (page * limit) + limit)

    let total = products.length

    res.json({ total, page: page + 1, limit, products, brands, categories, totalProducts })

}

export const getProductById = async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id).populate("category").populate({
        path: 'reviews',
        populate: {
            path: 'userid',
            select: 'email'
        }
    })


    const totalRating =  product.reviews.reduce((acc,review) => {
        return acc+review.stars
    }, 0)

    const averageRating = (totalRating / product.reviews.length).toFixed(2)

    return res.status(200).json({ product ,averageRating})

}
export const deleteProduct = async (req, res, next) => {
    const { id } = req.params
    try {
        await Product.findByIdAndDelete(id)
        return res.status(200).json({ success: "product deleted" })
    } catch (e) {
        next("Product to delete does not exists")
    }
}

export const updateProduct = async (req, res, next) => {
    const { id } = req.params
    const { error, value } = validateProductBody(req.body)
    if (error) {
        return res.status(400).json({ error: error.message })
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { ...value }, { new: true })
        return res.status(200).json({ success: "Product updated successfully" })
    } catch (e) {
        next("Product not found")
    }

}

export const dashBoardProducts = async (req, res) => {
    const products = await Product.find().populate(["brand", "category"])
    return res.status(200).json({ products })
}

export const fetchByCategory = async (req, res) => {
    const { category } = req.query
    let products = await Product.find().populate(["category"]);
    products = products.filter(prod => prod.category.name === category).slice(0, 6)
    return res.status(200).json({ products })
}


export const checkout = async (req, res) => {
    const { products } = req.body
    const productList = products.map(p => {
        return { id: p._id, name: p.name, description: p.description, quantity: p.qty }
    })

    for (const p of productList) {
        const priceFromDbWithCentes = await Product.findById(p.id)
        p.price = priceFromDbWithCentes.price * 100
    }
  
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: productList.map(item => {
            return {
                price_data: {
                    unit_amount: item.price,
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        description: item.description,
                    }
                },
                quantity: item.quantity
            }
        }),
        metadata: {
            userId: req.body.userId,
            cartItems: JSON.stringify(req.body.products.map(p => p._id))
        },
        mode: 'payment',
        success_url: `http://localhost:5173/success`,
        cancel_url: `http://localhost:5173/cancel`,
    })
    return res.status(200).json({ url: session.url })
}