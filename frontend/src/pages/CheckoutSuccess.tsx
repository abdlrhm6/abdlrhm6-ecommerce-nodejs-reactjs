import { Link } from "react-router-dom"

function CheckoutSuccess() {
  return (
    <div className="flex items-center justify-center flex-col h-screen">
          <h1 className="font-bold text-4xl text-green-600">Order Received Successfully.</h1>
          <Link  to="/orders" className=" my-4 bg-black text-bold text-white px-5 py-3">See Your Order Status Now.</Link>
    </div>
  )
}

export default CheckoutSuccess