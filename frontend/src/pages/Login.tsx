import { useForm } from "react-hook-form"
import { instance } from "../utils/axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useStore } from "../store"

const Login = () => {
    const login = useStore((state)=> state.login)

    const navigate = useNavigate()
    const [error, setError] = useState()
    const { register, formState: { errors }, handleSubmit } = useForm()
    const loginUser = async (formData: { email: string, password: string }) => {
        try {
            const { data } = await instance.post("/auth/login", formData)
            if (data.success) {
                localStorage.setItem("user", JSON.stringify(data.user))
                login(data.user)
                navigate("/")
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error)
            }
        }
    }

    return (

        <div>
            <div className="min-h-screen flex items-center justify-center">

                <form className='min-w-[400px] shadow-sm px-7 py-8 border-[1.7px] border-black '
                    onSubmit={handleSubmit(loginUser)}>
                    <h1 className='text-4xl font-bold mb-8'>Login To Your Account</h1>

                    {error && (
                        <div className="">
                            <p className="px-4 py-5 my-4  bg-red-400 text-red-700">{error}</p>
                        </div>
                    )}

                    <label htmlFor="email" className='text-gray-500 text-sm'> Email</label>
                    <input type="email" id="email" placeholder='email@example.com' className='block px-4 py-2 outline-none border-b-2 border-black  w-full focus:outline-none my-3'
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Invalid email address',
                            }
                        })}
                    />

                    {errors.email && errors.email.type === "required" && (
                        <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">Email is required.</p>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                        <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">Email is in a wrong format.</p>
                    )}

                    <label htmlFor="pass" className='text-gray-500 text-sm'> Password</label>
                    <input type="password" id="pass" placeholder='* * * * * * * *' className='block px-4 py-2 outline-none border-b-2 border-black  w-full focus:outline-none my-3'

                        {...register("password", {
                            required: true,
                            minLength: 6
                        })}
                    />
                    {errors.password && errors.password.type === "required" && (
                        <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">password is required.</p>
                    )}
                    {errors.password && errors.password.type === "minLength" && (
                        <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">at least 6 characters are required</p>
                    )}
                    <button className='bg-black py-2 text-white w-full mt-4'>Login</button>

                </form>

            </div>
        </div>
    )
}

export default Login