import { useForm } from "react-hook-form"
import { useState } from "react"
import { instance } from "../../../utils/axios"
import { token } from "../../../utils/token"

const AddCategory = () => {
  const [error, setError] = useState()
  const [msg, setMsg] = useState()

 
  const { register, handleSubmit, formState: { errors } } = useForm()
  const save = async (formData) => {
    setError(null)
    setMsg(null)
    try {
      const { data } = await instance.post("/categories/category", formData,{
        headers:{
          authorization:  `Bearer ${token}`
        }
      })
      if (data.success) {
        setMsg(data.success)
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error)
        console.log(err)
      }
    }
  }
  return (
    <div className="min-h-screen p-10">
      <form onSubmit={handleSubmit(save)} >

        <h1 className='text-4xl font-bold mb-8'>Adding A New Category</h1>

        {msg && (
          <p className="px-4 py-5 my-4  bg-green-400 text-green-700">{msg}</p>
        )}
        {error && (
          <div className="">
            <p className="px-4 py-5 my-4  bg-red-400 text-red-700">{error}</p>
          </div>
        )}

        <label htmlFor="name" className='text-gray-500 text-sm'> Category Name</label>
        <input type="text" id="name" placeholder='Category Name' className='block px-4 py-2 outline-none border-2 border-black  w-full focus:outline-none mb-6'{...register("name", {
          required: true,
          minLength: 6
        })}
        />
        {errors.name && errors.name.type === 'required' && (
          <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">Brand Name is required</p>

        )}

        {errors.name && errors.name.type === 'minLength' && (
          <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700"> AT least 6 characters are required.</p>

        )}

        <button type='submit' className="block  bg-black text-white px-4 py-2 w-full  my-3"> Save</button>
      </form>
    </div>
  )
}

export default AddCategory