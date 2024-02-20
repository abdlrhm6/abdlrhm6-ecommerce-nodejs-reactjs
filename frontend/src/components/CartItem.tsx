import { useCartStore } from "../store"

const CartItem = ({product}) => {

  const increase = useCartStore(state => state.increaseQuantity)
  const decrease = useCartStore(state => state.decreaseQuantity)
  const removeFromCart = useCartStore(state => state.removeProduct)

  return (
    <div className='flex gap-10 md:gap-4  w-full border-b-2 py-10 flex-col md:flex-row '>
        <img src={`images/${product?.image}`} className=' w-full md:w-32' />
        <div className="flex flex-col flex-1 mt-6">
            <h2 className='font-bold text-3xl'>{product?.name}</h2>
            <p className='text-sm mb-2 text-gray-500 max-w-[500px]'>{product?.description}</p>
           

           
            <div className="flex gap-6 items-center  mx-auto md:mx-0  mt-6">
            <span className="font-bold w-[100px]">Quantity : {product?.qty}</span>
                <div className="flex w-[130px] justify-between">
                  <button className="w-10 h-10 bg-white border flex-1 border-black font-bold"
                  onClick={()=>increase(product)}
                  >
                    +
                  </button>
                  <button className="w-10 h-10 bg-black border text-white border-black font-bold">
                    1
                  </button>
                  <button className="w-10 h-10 bg-white border flex-1 border-black font-bold"
                   onClick={()=>decrease(product)}>
                    -
                  </button>
                  </div>
            </div>
        </div>
        <div className="flex flex-col items-center">
            <h2 className='text-8xl font-bold mb-10'>{product?.price} $</h2>
            <button className='bg-white border border-black px-6 py-2'
            onClick={()=> removeFromCart(product)}
            >Remove From Cart</button>
        </div>


    </div>
  )
}

export default CartItem