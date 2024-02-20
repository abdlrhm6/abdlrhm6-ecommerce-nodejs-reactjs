import { useState, useEffect } from "react"
import { instance } from "../../utils/axios"
import { token } from "../../utils/token"


function OrdersList() {
    const [orders, setorders] = useState([])
    const [msg, setmsg] = useState("")
    
    useEffect(() => {
        async function getOrders() {
            const { data } = await instance.get("/orders/order/admin", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            return data.orders
        }
        getOrders().then(data => setorders(data))
    }, [])


    const ship = async (id) => {
        const { data } = await instance.post(`/orders/order/admin/ship/${id}`,null, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        if (data.success) {
            setmsg(data.success)
        }
    }
    return (

        <div className="min-h-screen p-10">
            <h1 className='text-4xl font-bold mb-8'>Managing Orders</h1>
            {msg && (
                <p className="px-4 py-5 my-4  bg-green-400 text-green-700">{msg}</p>
            )}
            <div className="flex flex-col divide-y-2">


                {!!orders.length && orders.map(order => (
                    <div className="bg-gray-300 px-4 p-4 flex gap-9" key={order._id}>
                        <div className="">

                            order Status : <span className='font-bold'>{order.status}</span> <br />
                            Order Initialized on :<span className='font-bold'>{order.createdAt.split("T")[0]}</span> <br />
                            Total price : <span className='font-bold'>{order.total / 100} $ </span><br />

                        </div>
                        <div className="flex gap-2">

                            {
                                order?.products?.map((p, index) => (
                                    <div className="w-[140px] border-black flex flex-col" key={index}>
                                        <img src={`/images/${p.product?.image}`} className='w-[60px]' />
                                        <div className="">
                                            <h2 className='font-bold'>{p.product?.name}</h2>
                                            <p className='underline'>{p.product?.price} $</p>
                                        </div>
                                        <span>Quantity: x{p.quantity}</span>
                                    </div>
                                ))
                            }
                        </div>
                        {
                            order?.status.toLowerCase() === 'pending' ? (
                                <div className="p-3">
                                    <h2 className="font-bold">This Orders is paid</h2>
                                    <p>and it is waiting for delievery.</p>
                                    <button
                                        onClick={() => ship(order._id)}
                                        className="px-4 py-2 bg-black text-white">Ship Now</button>
                                </div>
                            ) : (
                                <div className="p-3">
                                    <h2 className="font-bold">This Orders is shipped</h2>
                                    <p>and it is waiting for client review.</p>
                                </div>
                            )
                        }
                    </div>

                ))}
            </div>
        </div>

    )
}

export default OrdersList