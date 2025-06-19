
import { Navigate,Outlet } from "react-router-dom";

const PrivateComp = ()=>{
    const auth = localStorage.getItem('auth');
    return auth? <Outlet/>: <Navigate to='/signup'/>
}
export default PrivateComp;