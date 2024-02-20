import { Rating } from "@smastrom/react-rating"
import { formatDistanceToNow} from "date-fns"
const ReviewComment = ({review}) => {

    return (
        <div className='py-6 border-b flex justify-start gap-4 w-full'>

            <div className="flex gap-1 flex-col flex-1">
                <span className='text-sm font-bold'>{review.userid.email}</span>
                <p className='font-sm text-gray-600 max-w-[400px] mb-4'>{review.review}</p>
              
                <Rating style={{ maxWidth: 80 }} readOnly={true} value={review.stars} />
            </div>
            <div className="w-fit text-xs text-gray-600">
                {formatDistanceToNow(review?.createdAt, { addSuffix: true })}
            </div>


        </div>
    )
}

export default ReviewComment