import { instance } from "../../../utils/axios"
import { useNavigate } from "react-router-dom"
import ReactDOM from "react-dom"
import { token } from "../../../utils/token"


export const DeleteModal = ({ show, id, categoryName, toDelete, closeModal }) => {
    const navigate = useNavigate()

    const path = toDelete == 'category' ? "/categories/category/" + id : toDelete =='brand' ? "/brands/brand/" + id : "/products/product/"+id



    const save = async (e) => {

        e.preventDefault()

        try {
            const { data } = await instance.delete(path, {
                headers:{
                    authorization:  `Bearer ${token}`
                  }
            })
            if (data.success) {
                navigate(`/admin/${toDelete == 'category' ? "categories" : toDelete =="brand" ? "brands": "products"}`)
                closeModal(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const hideModal = () => {
        navigate(`/admin/${toDelete == 'category' ? "categories" : toDelete =="brand" ? "brands": "products"}`)
        closeModal(false)
    }
    if (!show || !categoryName) return


    return ReactDOM.createPortal(
        <div className="w-screen h-screen fixed inset-0 bg-black/90 flex items-center justify-center" >

           
            <form onSubmit={save}>

                <h1 className='text-4xl font-bold mb-8 text-white'>Delete</h1>



                <div className="text-2xl my-4 text-white">Are you sure you want to delete this {toDelete}?</div>
                <span className="font-bold text-white my-6 text-4xl"> {categoryName}</span>
                <button type='submit' className="block disabled:bg-gray-500 bg-black text-white px-4 py-2 w-full  my-3"> Delete</button>
                <button
                    className="block disabled:bg-gray-500 bg-yellow-600 text-white px-4 py-2 w-full  my-3"
                    onClick={hideModal}>close</button>
            </form>
        </div >
        , document.getElementById("edit-modal"))
}