import { Link, Navigate, Outlet } from "react-router-dom"
import { useStore } from "../../store"
function AdminLayout() {

    const user = useStore( state=>state.user)

    if(user?.role !=='admin') return <Navigate to="/"/>
    return (
        <div>

            <div className="flex flex-col md:flex-row md:gap-2 gap-10 pt-10 mb-[200px]">
                <div className=" md:min-w-[300px] p-4 border flex flex-col gap-5">
                    <Link to="/admin" className="bg-gray-200  px-6 py-3 font-bold">Add A Product</Link>

                    <Link to="/admin/add-category" className="bg-gray-200  px-6 py-3 font-bold">Add A Category</Link>

                    <Link to="/admin/add-brand" className="bg-gray-200  px-6 py-3 font-bold">Add A Brand</Link>

                    <Link to="/admin/orders" className="bg-gray-200  px-6 py-3 font-bold">Manage Orders</Link>
                    <hr />
                    <Link to="/admin/categories" className="bg-black  px-6 py-3 font-bold text-white">Categories List</Link>
                    <Link to="/admin/brands" className="bg-black  px-6 py-3 font-bold text-white">Brands List</Link>
                    <Link to="/admin/products" className="bg-black  px-6 py-3 font-bold text-white">Products List</Link>

                </div>
                <div className="flex-grow">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout