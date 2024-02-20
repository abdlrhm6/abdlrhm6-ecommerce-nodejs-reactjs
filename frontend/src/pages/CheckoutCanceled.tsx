import { Link } from "react-router-dom"

function CheckoutCanceled() {
  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <h1 className="font-bold text-4xl text-red-600">Payement is canceled.</h1>
      <Link to="/store" className=" my-4 bg-black text-bold text-white px-5 py-3">Continue Shopping.</Link>
    </div>
  )
}

export default CheckoutCanceled