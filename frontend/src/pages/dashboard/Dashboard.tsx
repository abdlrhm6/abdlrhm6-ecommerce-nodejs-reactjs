import { useForm } from "react-hook-form";
import { fetchbrands } from "./brand/Brand";
import { fetchCategories } from "./category/Category";
import { useState, useEffect } from "react"
import { instance } from "../../utils/axios";
import { token } from "../../utils/token";

const Dashboard = () => {

    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [error, setError] = useState("")
    const [msg, setMsg] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm()

    useEffect(() => {
        fetchCategories().then(data => setCategories(data))
        fetchbrands().then(data => setBrands(data))

    }, [])

    const save = async (product) => {
        setMsg("")
        setError("")
        const formData = new FormData()
        formData.append("image",product.image[0])
        try {
            const { data } = await instance.post("products/product/upload", formData, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

           if(data.image){
            const response = await instance.post("products/product", {...product,image: data.image },{
                headers: {
                    authorization: `Bearer ${token}`
                }})
            const result =  response.data
            if(result.success){
                
                setMsg(result.success)
            }
           }
        } catch (error) {
            if(error.response){
                setError(error.response.data.error)
                console.log(error)
                
            }
        }
    }
    return (
        <div className="min-h-screen p-10">
            <form onSubmit={handleSubmit(save)} >

                {msg && (
                    <p className="px-4 py-5 my-4  bg-green-400 text-green-700">{msg}</p>
                )}
                {error && (
                    <div className="">
                        <p className="px-4 py-5 my-4  bg-red-400 text-red-700">{error}</p>
                    </div>
                )}
                <h1 className='text-4xl font-bold mb-8'>Adding A New Product</h1>

                <label htmlFor="name" className='text-gray-500 text-sm'> Product Name</label>
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

                <label htmlFor="desc" className='text-gray-500 text-sm'> Product Description</label>
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

                <label htmlFor="price" className='text-gray-500 text-sm'> Product Price</label>
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

                <label htmlFor="cat" className='text-gray-500 text-sm'> Product Category</label>
                <select id="cat" className="px-5 block py-2 bg-gray-200 w-full mt-2 mb-3"
                    {...register("category", { required: true })}
                >
                    <option value="">Choose Category </option>

                    {
                        categories.map((cat, index) => (
                            <option key={index} value={cat._id}>{cat.name}</option>
                        ))
                    }
                </select>

                {errors.category && errors.category.type === "required" && (
                    <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">Product category is required.</p>
                )}

                <label htmlFor="brand" className='text-gray-500 text-sm'> Product Brand</label>
                <select id="brand" className="px-5 block py-2 bg-gray-200 w-full mt-2 mb-3"
                    {...register("brand", { required: true })}
                >
                    <option value="">Choose Brand </option>

                    {
                        brands.map((br, index) => (
                            <option key={index} value={br._id}>{br.name}</option>
                        ))
                    }
                </select>


                {errors.brand && errors.brand.type === "required" && (
                    <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">Product brand is required.</p>
                )}

                <label htmlFor="q" className='text-gray-500 text-sm'> Quantity In Stock</label>
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

                <input type="file" {...register("image", {
                    required: true
                })} />

                {errors.image && errors.image.type === "required" && (
                    <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">Product image is required.</p>
                )}
                <button className="block bg-black text-white px-6 py-3 w-full  my-5 disabled:bg-gray-300 "> Save Product</button>
            </form>
        </div>
    );
};

export default Dashboard;
