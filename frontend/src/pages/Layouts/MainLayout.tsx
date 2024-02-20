import {Outlet} from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import ScrollToTop from "../../components/ScrollToTop"
function MainLayout() {
  return (
    <div>
        <Navbar/>
        <ScrollToTop/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default MainLayout