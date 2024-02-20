/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react"
import { instance } from "../../../utils/axios"
import { Link } from "react-router-dom"
import { EditModal } from "../Modals/EditModal"
import { DeleteModal } from "../Modals/DeleteModal"
import { token } from "../../../utils/token"

export async function fetchbrands() {
    const { data } = await instance.get("/brands/brand", {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return data.brands
}
export default function Category() {
    const [brands, setbrands] = useState([])
    const [show, setShow] = useState(null)
    const [deleteShow, setDeleteShow] = useState(null)
    const [id, setid] = useState(null)
    const [categoryName, setCategoryName] = useState(null)

    

    useEffect(() => {
        fetchbrands().then(data => setbrands(data))
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
        <div className="min-h-screen p-10">

            <EditModal toEdit="brand" show={show} id={id} cancelEdit={setShow} categoryName={categoryName} />
            <DeleteModal id={id} toDelete="brand" show={deleteShow} categoryName={categoryName} closeModal={setDeleteShow} />
            <h1 className='text-4xl font-bold mb-8'>brands List</h1>
            <div className="flex flex-col p-2">

                {brands?.length == 0 && (
                    <>
                        <h1>No brands Added Yet </h1>
                        <Link to="/admin/add-brand" className=' w-fit px-4 py-2 my-3 bg-black text-white'>Add One Now</Link>

                    </>
                )}


                <>
                    {
                        brands ? (
                            brands.map((br, index) => (

                                <div key={index} className="px-4 py-3 bg-gray-300 border-b-2 flex items-center justify-between">
                                    <div className="">
                                        {br.name}
                                    </div>

                                    <div className="flex gap-4 px-4">
                                        <button className='px-4 py-1 bg-red-700 text-white'
                                            onClick={() => deleteCategory(br._id, br.name)}
                                        >Delete</button>
                                        <button className='px-4 py-1 bg-black text-white'
                                            onClick={() => editCategory(br._id, br.name)}
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
