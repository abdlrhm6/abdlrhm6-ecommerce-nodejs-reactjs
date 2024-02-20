import { useState } from "react"
import { useForm } from "react-hook-form"
import { instance } from "../utils/axios"


type userInfo = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}


const Register = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [msg, setMsg] = useState("")
    const { register, handleSubmit, formState: { errors }, watch } = useForm()

    const save = async (formData: userInfo) => {
        setLoading(true)

        try {
            const { data } = await instance.post("auth/register", formData)
            setMsg(data.message)
        } catch (err ) {
            if(err.response){
                setError(err.response.data.errors)
            }
        }
   
        setLoading(false)
    }

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center py-10">

                <form className='min-w-[400px] shadow-sm px-7 py-8 border-[1.7px] border-black'
                    onSubmit={handleSubmit(save)}>
                    <h1 className='text-4xl font-bold mb-8'>Creating An Account</h1>

                    {msg && (
                        <p className="px-4 py-5 my-4  bg-green-400 text-green-700">{msg}</p>
                    )}
                    {error && (
                        <div className="">
                                    <p className="px-4 py-5 my-4  bg-red-400 text-red-700">{error}</p>
                        </div>
                    )}

                    {/* {error && (
                        <div>
                            {error.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    )} */}
                    <label htmlFor="name" className='text-gray-500 text-sm'> Name</label>
                    <input type="text" id="name" placeholder='Name' className='block px-4 py-2 outline-none border-b-2 border-black  w-full focus:outline-none my-3'
                        {...register("username", { required: true, minLength: 6 })}
                    />
                    {errors.username && errors.username.type === 'required' && (
                        <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">this field is needed</p>
                    )}

                    {errors.username && errors.username.type === 'minLength' && (
                        <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">At least 6 characters are required</p>
                    )}
                    <label htmlFor="email" className='text-gray-500 text-sm'> Email</label>
                    <input type="email" id="email" placeholder='email@example.com' className='block px-4 py-2 outline-none border-b-2 border-black  w-full focus:outline-none my-3'
                        {...register("email", {
                            required: true, pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Invalid email address',
                            },
                        })} />
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


                    <label htmlFor="confirm" className='text-gray-500 text-sm'>Password Confirmation</label>
                    <input type="password" id="confirm" placeholder='* * * * * * * *' className='block px-4 py-2 outline-none border-b-2 border-black  w-full focus:outline-none my-3'
                        {...register("confirmPassword", {
                            required: true,
                            minLength: 6,
                            validate: (value: string) => {
                                const pass = watch("password")
                                return value === pass
                            }
                        })}
                    />

                    {errors.confirmPassword && errors.confirmPassword.type === "required" && (
                        <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">password confirmPasswordation is required.</p>
                    )}
                    {errors.confirmPassword && errors.confirmPassword.type === "minLength" && (
                        <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">at least 6 characters are required</p>
                    )}
                    {errors.confirmPassword && errors.confirmPassword.type === "validate" && (
                        <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">passwords must match</p>
                    )}

                    <button type='submit' className='bg-black py-2 text-white w-full mt-4'>{loading ? "..." : "Register"}</button>

                </form>

            </div>
        </div>
    )
}

export default Register