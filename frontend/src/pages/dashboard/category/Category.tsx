/* eslint-disable react-refresh/only-export-components */

import { useState, useEffect } from "react"
import { instance } from "../../../utils/axios"
import { Link } from "react-router-dom"
import { EditModal } from "../Modals/EditModal"
import { DeleteModal } from "../Modals/DeleteModal"
import { token } from "../../../utils/token"

export async function fetchCategories() {
    const { data } = await instance.get("/categories/category", {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
   return data.categories
}

export default function Category() {
    const [categories, setCategories] = useState([])
    const [show, setShow] = useState(null)
    const [deleteShow, setDeleteShow] = useState(null)
    const [id, setid] = useState(null)
    const [categoryName, setCategoryName] = useState(null)


    

    useEffect(() => {

       fetchCategories().then(data =>setCategories(data))
    }, [show, deleteShow])

    const editCategory = (id, name) => {
        setid(id)
        setCategoryName(name)
        setShow(true)
    }
    const deleteCategory = (id, name) => {
        setid(id)
        setCategoryName(name)
        setDeleteShow(true)
    }
    return (
        <div className="min-h-screen p-10 w-full overflow-hidden">
            <EditModal toEdit="category" show={show} id={id} cancelEdit={setShow} categoryName={categoryName} />
            <DeleteModal id={id} toDelete="category" show={deleteShow} categoryName={categoryName} closeModal={setDeleteShow} />
            <h1 className='text-4xl font-bold mb-8'>Categories List</h1>
            <div className="flex flex-col p-2">

                {
                    categories.length == 0 && (
                        <>
                            <h1>No Categories Added Yet </h1>
                            <Link to="/admin/add-category" className=' w-fit px-4 py-2 my-3 bg-black text-white'>Add One Now</Link>

                        </>
                    )
                }


                <>
                    {
                        categories ? (
                            categories.map((cat, index) => (

                                <div key={index} className="px-4 py-3 bg-gray-300 border-b-2 flex items-center justify-between">
                                    <div className="">
                                        {cat.name}
                                    </div>

                                    <div className="flex gap-4 px-4">
                                        <button className='px-4 py-1 bg-red-700 text-white'
                                            onClick={() => deleteCategory(cat._id, cat.name)}
                                        >Delete</button>
                                        <button className='px-4 py-1 bg-black text-white'
                                            onClick={() => editCategory(cat._id, cat.name)}
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

