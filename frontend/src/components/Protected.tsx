import { Navigate } from "react-router-dom"
import { useStore } from "../store"

function Protected({children}) {
   
    const user =useStore(state =>state.user)
    
    if (!user){  return <Navigate to="/login"/>}
  return (
    <>{children}</>
  )
}

export default Protected