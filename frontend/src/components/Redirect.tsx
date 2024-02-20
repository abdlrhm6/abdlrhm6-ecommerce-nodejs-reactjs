import { Navigate } from "react-router-dom"
import { useStore } from "../store"

function Redirect({to,component}) {
    const user =useStore(state =>state.user)
    if(user) return <Navigate to={to}/>
    return (
    <>
        {component}
    </>
  )
}

export default Redirect