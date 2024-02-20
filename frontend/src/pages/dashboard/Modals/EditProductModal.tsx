import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { instance } from "../../../utils/axios"
import { useNavigate } from "react-router-dom"
import { token } from "../../../utils/token"

import ReactDOM from "react-dom"
import { fetchCategories } from "../category/Category"
import { fetchbrands } from "../brand/Brand"

export const EditProductModal = ({ show, id, cancelEdit, product }) => {
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [msg, setMsg] = useState()
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])



    const { register, handleSubmit, formState: { errors }, setValue } = useForm({

    })



    useEffect(() => {
        fetchCategories().then(data => setCategories(data))
        fetchbrands().then(data => setBrands(data))
        if (product?.name !== null) {
            setValue("name", product?.name);
        }
        if (product?.description !== null) {
            setValue("description", product?.description);
        }
        if (product?.price !== null) {
            setValue("price", product?.price);
        }
        if (product?.quantity !== null) {
            setValue("quantity", product?.quantity);
        }

    }, [product, setValue]);

    const save = async (newProduct) => {
        setError(null)
        setMsg(null)
        try {
            let response = null
            let imageName = null
            if (newProduct.image[0]) {
                const formData = new FormData()
                formData.append("image", newProduct.image[0])

                response = await instance.post("/products/product/upload", formData, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })

                imageName = response.data.image
            }

            const resp = await instance.patch("/products/product/" + id, { ...newProduct, image: imageName || product.image }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const result = resp.data
            if (result.success) {
                setMsg(result.success)
                navigate(`/admin/products`)

            }
        }catch (error) {
            if (error.response) {
                setError(error.response.data.error)
                console.log(error)

            }
        }
    }

        const hideModal = () => {
            navigate(`/admin/products`)
            cancelEdit(false)
        }
        if (!show || !product) return


        return ReactDOM.createPortal(
            <div className="w-screen h-screen fixed overflow-scroll pt-96 inset-0 bg-black/90 flex items-center justify-center" >

                <form onSubmit={handleSubmit(save)} >

                    {msg && (
                        <p className="px-4 py-5 my-4  bg-green-400 text-green-700">{msg}</p>
                    )}
                    {error && (
                        <div className="">
                            <p className="px-4 py-5 my-4  bg-red-400 text-red-700">{error}</p>
                        </div>
                    )}
                    <h1 className='text-4xl font-bold mb-8 text-white'>Edit this Product</h1>

                    <label htmlFor="name" className='text-sm text-white'> Product Name</label>
                    <input type="text" id="name" placeholder='Product Name' className='block px-4 py-2 outline-none border-2 border-black  w-full focus:outline-none mb-6'
                        {...register("name", {
                            required: true,
                            minLength: 6
                        })}
                    />
                    {errors.name && errors.name.type === "required" && (
                        <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">Product Name is required.</p>
                    )}
                    {errors.name && errors.name.type === "minLength" && (
                        <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">At least 6 characters.</p>
                    )}

                    <label htmlFor="desc" className='text-sm text-white'> Product Description</label>
                    <textarea id="desc" placeholder='Product Description' className='block px-4 py-2 outline-none border-2 border-black  w-full focus:outline-none mb-6 resize-none'
                        {...register("description", {
                            required: true,
                            minLength: 20
                        })}
                    />
                    {errors.description && errors.description.type === "required" && (
                        <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">Product description is required.</p>
                    )}
                    {errors.description && errors.description.type === "minLength" && (
                        <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">At least 20 characters.</p>
                    )}

                    <label htmlFor="price" className='text-sm text-white'> Product Price</label>
                    <input type="number" id="price" placeholder='Product Name' className='block px-4 py-2 outline-none border-2 border-black  w-full focus:outline-none mb-6'
                        {...register("price", {
                            required: true,
                            validate: (value) => {
                                return value > 0
                            }
                        })}
                    />

                    {errors.price && errors.price.type === "required" && (
                        <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">Product price is required.</p>
                    )}
                    {errors.price && errors.price.type === "validate" && (
                        <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">Price cannot be negative.</p>
                    )}

                    <label htmlFor="cat" className=' text-sm text-white'> Product Category</label>
                    <select id="cat" className="px-5 block py-2 bg-gray-200 w-full mt-2 mb-3"
                        {...register("category", { required: true })}
                    >
                        <option value="">Chgose Category </option>

                        {
                            categories.map((cat, index) => (
                                <option selected={cat.name == product.category.name}  key={index} value={cat._id}>{cat.name}</option>
                            ))
                        }
                    </select>

                    {errors.category && errors.category.type === "required" && (
                        <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">Product category is required.</p>
                    )}

                    <label htmlFor="brand" className=' text-sm text-white'> Product Brand</label>
                    <select id="brand" className="px-5 block py-2 bg-gray-200 w-full mt-2 mb-3"
                        {...register("brand", { required: true })}
                    >
                        <option value="">Choose Brand </option>

                        {
                            brands.map((br, index) => (
                                <option  selected={br.name == product.brand.name}  key={index} value={br._id}>{br.name}</option>
                            ))
                        }
                    </select>


                    {errors.brand && errors.brand.type === "required" && (
                        <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">Product brand is required.</p>
                    )}

                    <label htmlFor="q" className=' text-sm text-white'> Quantity In Stock</label>
                    <input type="number" id="q" placeholder='Product Name' className='block px-4 py-2 outline-none border-2 border-black  w-full focus:outline-none mb-6'
                        {...register("quantity", {
                            required: true,
                            validate: (value) => {
                                return value > 0
                            }

                        })}
                    />
                    {errors.quantity && errors.quantity.type === "required" && (
                        <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">Product quantity is required.</p>
                    )}
                    {errors.quantity && errors.quantity.type === "validate" && (
                        <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">quantity cannot be negative.</p>
                    )}

                    <input type="file" {...register("image")} />

                    {errors.image && errors.image.type === "required" && (
                        <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">Product image is required.</p>
                    )}
                    <button className="block bg-black text-white px-6 py-3 w-full  my-5 disabled:bg-gray-300 "> Save Product</button>

                    <button className="block bg-yellow-600 text-white px-6 py-3 w-full  my-5 disabled:bg-gray-300 "
                        onClick={hideModal}> Cancel</button>

                </form>
            </div>
            , document.getElementById("edit-modal"))
}