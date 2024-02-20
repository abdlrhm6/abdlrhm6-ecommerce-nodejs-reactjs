/* eslint-disable react-refresh/only-export-components */

import { useState, useEffect } from "react"
import { instance } from "../../utils/axios"
import { token } from "../../utils/token"
import { Link } from "react-router-dom"
import { DeleteModal } from "./Modals/DeleteModal"
import { EditProductModal } from "./Modals/EditProductModal"


export async function fetchProducts() {
    const { data } = await instance.get("/products/product/dashboard", {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return data.products
}

export default function ProductList() {
    const [products, setproducts] = useState([])
    const [showDelete,setShowDelete] = useState(false)
    const [id,setid] = useState()
    const [productName,setProductName] = useState(null)
    const [showEdit,setshowEdit] = useState(false)
    const [prductToEdit,setproductToEdit] = useState(null)
    useEffect(() => {

        fetchProducts().then(data => setproducts(data))
    }, [showDelete,showEdit])

    const deleteProduct = (id,name)=> {
        setShowDelete(true)
        setid(id)
        setProductName((name))
    }
    const editProduct =(product) => {
        setshowEdit(true)
        setid(product._id)
        setproductToEdit(product)
    }
    return (
        <div className="min-h-screen p-10 w-full overflow-hidden">
            <DeleteModal show={showDelete} id={id} toDelete="product" closeModal={setShowDelete} categoryName={productName}/>
            <EditProductModal show={showEdit} id={id} cancelEdit={setshowEdit} product={prductToEdit}/>
            <h1 className='text-4xl font-bold mb-8'>Products List</h1>
            <div className="flex flex-col p-2">

                {
                    products.length == 0 && (
                        <>
                            <h1>No Product Added Yet </h1>
                            <Link to="/admin" className=' w-fit px-4 py-2 my-3 bg-black text-white'>Add One Now</Link>

                        </>
                    )
                }


                <>
                    {
                        products ? (
                            products.map((product, index) => (

                                <div key={index} className="px-4 py-3 bg-gray-300 border-b-2 flex items-center gap-4 justify-between">
                                    <div className="w-[100px] border-black border-4">
                                        <img src={`../../../../images/${product.image}`} alt="" />

                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="font-bold text-xl">  {product.name}</h2>
                                        <p>{product.description}</p>
                                        <span className="font-bold text-2xl">{product.price} $</span>
                                        <p>Available in stock <span className="font-bold">{product.quantity}</span></p>
                                    </div>

                                    <div className="flex flex-col">
                                        <p>category :</p>
                                        <h2 className="font-bold text-xl">  {product?.category?.name}</h2>

                                        <p>brand :</p>
                                        <h2 className="font-bold text-xl">  {product?.brand?.name}</h2>  
                                        
                                    </div>

                                    <div className="flex flex-col gap-4 px-4">
                                        <button className='px-4 py-1 bg-red-700 text-white'
                                        onClick={()=>deleteProduct(product._id,product.name)}
                                        >Delete</button>
                                        <button className='px-4 py-1 bg-black text-white'
                                        onClick={()=> editProduct(product)}
                                        >Edit</button>
                                    </div>
                                </div>
                            ))
                        ) : (<p>loading....</p>)
                    }

                </>

            </div>
        </div>
    )
}

