import { Link } from "react-router-dom"
import { productType } from "../utils/types";

const ProductCard = ({ product }: { product: productType }) => {

    return (
        <div className="overflow-hidden">
            <Link to={`/product/${product?._id}`}>
                <div className='flex flex-col gap-3 '>
                    <img src={`../../images/${product.image}`} alt="" className='w-full bg-cover' />
                    <div className="flex fex-col md:flex-row justify-between items-center p-4">
                        <div className="">
                            <h1 className='font-bold capitalize'>{product?.name}</h1>
                            <span className='font-xs text-gray-500 block min-h-[60px]'>{product?.description?.slice(1, 25)}...</span>
                        </div>
                        <div className="">
                            <div className='font-bold text-6xl  relative'>
                                {product?.price}
                                <span className='absolute top-0 right-0 text-xs'>$</span>
                            </div>
                        </div>
                    </div>

                    <div className='bg-black py-3 text-white flex gap-2 justify-center items-center'>
                        <button >More Details</button>
                        <img src="/images/shop-cart.png" alt="" />
                    </div>

                </div>
            </Link>
        </div>
    )
}

export default ProductCard