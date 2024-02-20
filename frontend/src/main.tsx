import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom'
import Home from './pages/Home.tsx'
import MainLayout from './pages/Layouts/MainLayout.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Store from './pages/Store.tsx'
import Product from './pages/Product.tsx'
import Cart from './pages/Cart.tsx'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import AdminLayout from './pages/Layouts/AdminLayout.tsx'
import AddBrand from './pages/dashboard/brand/AddBrand.tsx'
import AddCategory from './pages/dashboard/category/AddCategory.tsx'
import Brand from './pages/dashboard/brand/Brand.tsx'
import Category from './pages/dashboard/category/Category.tsx'
import Protected from './components/Protected.tsx'
import Redirect from './components/Redirect.tsx'
import ProductList from './pages/dashboard/ProductList.tsx'
import CheckoutSuccess from './pages/CheckoutSuccess.tsx'
import CheckoutCanceled from './pages/CheckoutCanceled.tsx'
import OrderStatus from './pages/OrderStatus.tsx'
import OrdersList from "./pages/dashboard/OrdersList.tsx"
const routes = createBrowserRouter([
  {
    path: "/", element:<MainLayout/>,
    children:[
      {
        path: "/",element:<Home/>
      },
      {
        path: "/login",element:<Redirect to="/" component={<Login/>}/>
      },
      {
        path: "/register",element:<Redirect to="/" component={<Register/>}/>
      },
      {
        path: "/store",element:<Store/>
      },
      {
        path: "/product/:id",element:<Product/>
      },
      {
        path: "/cart",element:<Protected><Cart/></Protected>
      },
      {
        path: "/success",element:<CheckoutSuccess/>
      },
      {
        path: "/cancel",element:<CheckoutCanceled/>
      },
      {
        path: "/orders",element:<Protected><OrderStatus/></Protected>
      },
      {
        path: "/admin",element:<AdminLayout/>,
        children :[
          {
            path: '/admin' , element: <Protected><Dashboard/></Protected>
          },
          {
            path: '/admin/add-brand' , element: <Protected><AddBrand/></Protected>
          },
          {
            path: '/admin/add-category' , element: <Protected><AddCategory/></Protected>
          },
          {
            path: '/admin/brands' , element: <Protected><Brand/></Protected>
          },
          {
            path: '/admin/categories' , element: <Protected><Category/></Protected>
          },
          {
            path: '/admin/products' , element: <Protected><ProductList/></Protected>
          },
          {
            path: '/admin/orders' , element: <Protected><OrdersList/></Protected>
          },
          
        ]
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <RouterProvider router={routes}/>
  </React.StrictMode>,
)
