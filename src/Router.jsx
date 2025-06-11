import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}) =>{
    const loggedIn = localStorage.getItem('username');
    return loggedIn ? children : <Navigate to='/login' />
}

export default ProtectedRoute