import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import categoryRouter from "./routes/category.route.js"
import brandRouter from "./routes/brand.route.js"
import productRouter from "./routes/product.route.js"
import orderRouter from "./routes/order.route.js"
import reviewRouter from "./routes/review.route.js"
import cors from "cors"

dotenv.config()
const app = express()
const port = process.env.PORT || 4000

import Stripe from "stripe";
import { Order } from "./models/Order.model.js";
import { Product } from "./models/product.model.js";
const stripe = Stripe("sk_test_51OiwDjGBqHGn9PeYCsXgIUOKMrLPuh4GMAg3S9K9gnLX3EKTSHZTriOa5UYZfFPFFuyKgEGkjsYAG4MROqprtGIy00giYdN6DH")

const endpointSecret = "whsec_a10ffc696df94cb6ebc36389fbe17e9605eb7ab5f62404de318c889dffc508de";

app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);

    } catch (err) {
        console.log(err.message)
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }


    let session = event.data.object

    if (event.type === 'checkout.session.completed') {
        const checkoutSession = await stripe.checkout.sessions.retrieve(session.id, { expand: ['line_items'] });
        const lineItems = checkoutSession.line_items.data;



        const userId = session.metadata.userId
        const itemsId = JSON.parse(session.metadata.cartItems).map(item => new mongoose.Types.ObjectId(item))
        let productList = []
        for (let item of lineItems) {
            const productId = await Product.findOne({ name: item.description })
            const quantity = item.quantity
            productList.push({
                product: productId._id,
                quantity: quantity
            })
        }

        const order = await Order.create({
            userId,
            products: productList,
            total: session.amount_total
        })


    }
    response.send().end();
});

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}))
app.use("/api/auth", authRouter)
app.use("/api/categories", categoryRouter)
app.use("/api/brands", brandRouter)
app.use("/api/products", productRouter)
app.use("/api/orders", orderRouter)
app.use("/api/reviews", reviewRouter)

app.use((error, req, res, next) => {
    return res.status(500).json({ error })
})


try {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))
    })
} catch (err) { console.log("Cannot connect to DB") }