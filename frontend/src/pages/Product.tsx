/* eslint-disable react-refresh/only-export-components */
import {  useParams } from "react-router-dom";
import NewsLetter from "../components/NewsLetter";
import ProductCard from "../components/ProductCard";
// import ReviewComment from "../components/ReviewComment";
import { instance } from "../utils/axios";
import { useState, useEffect } from "react"
import { token } from "../utils/token";
import { useCartStore } from "../store";
import ReviewComment from "../components/ReviewComment";
import Feedback from "../components/Feedback";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { productType } from "../utils/types";



const Product = () => {

  const getProductByid = async (id) => {
    const { data } = await instance.get("/products/product/" + id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  }

  const getRelatedProducts = async (category: string) => {
    const { data } = await instance.get(`/products/product/category?category=${category}`)
    return data.products

  }
  const { id } = useParams()
  const [product, setProduct] = useState<productType>(null)
  const [products, setProducts] = useState([])
  const [rating, setRating] = useState()
  const cartProducts = useCartStore(state => state.items)
  const addToCart = useCartStore(state => state.addProduct)

  useEffect(() => {
    getProductByid(id).then((data) => {
      if (data && data.product?.category?.name) {
        setProduct(data?.product)
        setRating(data?.averageRating)
        getRelatedProducts(data?.category?.name).then(data => setProducts(data))
      }
    })
  }, [id])

  const productIsAdded = (id) => {
    return cartProducts.filter(prod => prod._id === id).length
  }
  return (
    <div>
      <div className="min-h-screen">

        <div className="flex p-10 max-w-[900px] mx-auto gap-16 justify-between flex-col md:flex-row mb-[200px]">
          <img src={`../../images/${product?.image}`} alt="" className="w-[350px]" />
          <div className="flex flex-col min-w-[300px]">
            <div className="border-b-2 border-gray-400 pb-7">
              <h1 className="font-bold text-7xl">
                <span className="text-lg font-normal line-through">130$</span>
              </h1>
              <div className="flex gap-4 mt-2">
              <Rating style={{ maxWidth: 140 }} readOnly={true} value={rating} />
                <span>{isNaN(rating)? "No Review Yet" : rating} / 5</span>
              </div>
              <div className="font-bold text-9xl mt-8 w-fit relative">
                {product?.price}
                <span className="absolute -top-3 -right-1 text-3xl">$</span>
              </div>
            </div>
            <div className="flex justify-between py-7 border-b-2 border-gray-400">
              <div className="flex flex-col gap-2">
                <span className="font-bold">Product Details :</span>
                <div className="font-bold text-xl">
                  {product?.name}
                </div>
                <p>{product?.description}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button disabled={!!productIsAdded(product?._id)} className="disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-black w-full px-4 py-4 bg-black text-white mt-4"
                onClick={() => addToCart(product)}
              > {productIsAdded(product?._id) ? "Product Added To Cart" : "Add To Cart"}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-[200px]">
          <h1 className="font-bold text-8xl mx-auto">Your Feedback is</h1>
          <h2 className="font-bold text-5xl mx-auto mb-20">Important For Us</h2>
          <Feedback productId={product?._id}/>
          <div className="flex rounded-md divide-y-2 border p-10 flex-col mb-10 mx-7 mt-6">
            {
              product?.reviews.map((review , index) => <ReviewComment review={review} key={index} />)
            }
          </div>
        </div>
        <div className="flex flex-col mb-[200px] mx-7">
          <h1 className="font-bold text-8xl mx-auto">Your Might Also Like</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 my-10 gap-10">
            {
              products.map(prod => (
                <ProductCard product={prod} />
              ))
            }
          </div>
        </div>
        <NewsLetter />
      </div>
    </div>
  );
};

export default Product;
