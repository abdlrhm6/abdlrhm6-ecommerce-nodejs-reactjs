
import CartItem from '../components/CartItem'
import { useCartStore , useStore } from '../store'
import { instance } from '../utils/axios'

const Cart = () => {
  const products = useCartStore(state => state.items)
  const user = useStore(state => state.user)


  const calculateSubTotal = () => {
    let totalPrice = 0
    products?.map(prod => {
      totalPrice += (prod.qty * prod.price)
    })
    return totalPrice
  }

  const checkout = async () => {
    instance.post("/products/create-checkout-session", {products,userId:user?._id}).then(data => {
     window.location.href= data.data.url
    })
  }
  return (
    <div>
      <div className="mt-10 min-h-screen mb-[200px] mx-14">
        <h1 className='text-6xl font-bold mb-10'>My Cart</h1>
        <div className="flex flex-col">
          {
            products?.map(prod => (
              <CartItem product={prod} />
            ))
          }
          {
            products?.length > 0 ? (
              <div className="flex justify-between mt-10">
                <div className="text-6xl font-bold mb-10">
                  Total Price : <strong>{calculateSubTotal()} $</strong>
                </div>
                <button className='bg-black px-6 py-2 text-white'
                  onClick={checkout}
                >Procced to checkout</button>
              </div>
            ) : (
              <div className="text-6xl font-bold mb-10">Your Cart Is Empty</div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Cart