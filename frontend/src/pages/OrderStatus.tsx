import { useEffect, useState } from 'react'
import { instance } from "../utils/axios"
import { token } from '../utils/token'

export default function OrderStatus() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        async function getOrders() {
            const { data } = await instance.get("/orders/order", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            return data.orders
        }
        getOrders().then(ordersList => setOrders(ordersList))
    }, [])

    console.log(orders)

    return (
        <div className='min-h-screen p-10'>

            <h1 className='text-3xl font-bold mb-4'>My orders</h1>

            <div className="flex flex-col divide-y-2">

                {!!orders.length && orders.map(order => (
                    <div className="bg-gray-300 px-4 p-4 flex gap-9">
                        <div className="">
                            order Status : <span className='font-bold'>{order.status}</span> <br />
                            Order Initialized on :<span className='font-bold'>{order.createdAt.split("T")[0]}</span> <br />
                            Total price : <span className='font-bold'>{order.total / 100} $ </span><br />
                            
                        </div>
                        <div className="flex gap-2">
                        
                            {   
                                order?.products?.map(p => (
                                    <div className="w-[140px] border-black flex flex-col">
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
                    </div>
                ))}
            </div>
        </div>
    )
}
