import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../config';
const Login = ()=>{
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

     useEffect(()=>{
            const auth = localStorage.getItem('auth');
            if(auth){
            navigate('/')
            }
        
        })

    const validate = async()=>{
        let result = await fetch(`${API_BASE_URL}/login`,{
            method:'post',
            body:JSON.stringify({email, password}),
            headers:{
                'content-type':'application/json'
            }
        

        })
        let resp = await result.json();
        
        if(email!=="" && password!=="" && resp.auth ){
            localStorage.setItem('user', JSON.stringify(resp.user))
            localStorage.setItem('auth', JSON.stringify(resp.auth))
            navigate('/')
        }
        else{
            alert('no user found')
            navigate('/login')
        }
    }
    
    return(
        <div className="login-container">
            <input className="login" type="email" placeholder="enter email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <input className="login" type="password" placeholder="enter password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <button id="login-btn" onClick={validate}>Login</button>
        </div>
    )
}
export default Login;