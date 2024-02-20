import { useStore } from "../store"
import { instance } from "../utils/axios"
import { token } from "../utils/token"
import { useState } from "react"
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useForm } from "react-hook-form"

export default function Feedback({ productId }) {

    const [msg, setmsg] = useState("")
    const [success, setSuccess] = useState("")
    const [rating, setRating] = useState(0)
    const { register, formState: { errors }, handleSubmit , reset } = useForm()

    const user = useStore((state) => state.user)

    const handleRating = (rate: number) => {
        setRating(rate)
    }

    const submit = async(review) => {
        if(rating == 0) {
           setmsg("Rating should not be less than 1")
        }else{
            const { data } = await instance.post("/reviews/review", {
                productId,
                reviewText: review.review,
                stars: rating
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (data.error) setmsg(data.error)
            setSuccess(data.success)
            setRating(0)
        reset()
        }
    }
    if (user) return (
        <div className="flex flex-col gap-2 mx-7">
            <h3 className="font-bold ">Leave your feedback</h3>
            {msg && (
                <div className="">
                    <p className="px-4 py-5 my-4  bg-red-400 text-red-700">{msg}</p>
                </div>
            )}
            {success && (
                <div className="">
                    <p className="px-4 py-5 my-4  bg-green-400 text-green-700">{success}</p>
                </div>
            )}
            <div className="flex flex-col rounded-md border-2 p-10 gap-2">
                <div>
                    <Rating style={{ maxWidth: 140 }} value={rating} onChange={handleRating} />
                    <span className="font-bold">You are giving {rating}/5</span>
                </div>
                <form onSubmit={handleSubmit(submit)} className="w-full flex flex-col gap-2">
                    <textarea placeholder="Your feed back goes here"
                        className="resize-none bg-gray-300 px-10 py-5 placeholder:text-gray-500"
                        {...register("review", {
                            required: true
                        })}
                    ></textarea>

                    {errors.review && errors.review.type =='required' && (
                         <p className=" my-3 px-4 py-2 bg-red-400 -sm text-red-700">Review Text is required.</p>
                    )}
                    <button type="submit" className="bg-black text-white px-16 py-2 w-fit" >Send</button>
                </form>
            </div>
        </div>
    )
    return null
}
