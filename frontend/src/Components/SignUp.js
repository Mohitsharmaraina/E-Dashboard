import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPass] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('auth');
        if (auth) {
            navigate('/')
        }

    })
    const validate = () => {
        let errorObj = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name.trim()) {
            errorObj.name = "Name is required.";
        }
        if (!emailRegex.test(email)) {
            errorObj.email = "Invalid email format.";
        }
        if (password.length < 6) {
            errorObj.password = "Password must be at least 6 characters.";
        }

        setErrors(errorObj);
        return Object.keys(errorObj).length === 0;
    };


    const collectData = async () => {
        if (!validate()) return;

        let result = await fetch(`${API_BASE_URL}/register`, {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'content-type': 'application/json'
            }
        });
        result = await result.json();

        if (name !== "" && email !== "" && password !== "" && result.auth) {

            localStorage.setItem("user", JSON.stringify(result.result));
            localStorage.setItem("auth", JSON.stringify(result.auth));
            navigate('/');
        }
        else {
            alert('Enter all fields')
            navigate('/signup')
        }
    }
    return (
        <div className="register">
            <h2>Enter sign up details</h2>
            <input className="sign-up" value={name} type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)}></input>
            {errors.name && <span className="error">{errors.name}</span>}

            <input className="sign-up" value={email} type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}></input>
            {errors.email && <span className="error">{errors.email}</span>}

            <input className="sign-up" value={password} type="password" placeholder="Enter your password" onChange={(e) => setPass(e.target.value)}></input>
            {errors.password && <span className="error">{errors.password}</span>}

            <button type="button" id="signUpBtn" onClick={collectData}>SignUp</button><br /><br />

            <p>Already Registered?</p>
            <Link to={'/login'}>Login here</Link>

        </div>
    )
}
export default SignUp;