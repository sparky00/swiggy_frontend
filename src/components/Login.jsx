import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../utils/authSlice';
import { useNavigate } from 'react-router-dom';
import { SWIGGY_API } from "../utils/constants";
import Register from './Register';
// import './Login.css'; // Import the custom CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await fetch(`${SWIGGY_API}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                   },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            console.log(data);

            // Dispatch login action with user and token
            dispatch(login({ user: data, token: data.token }));

            // Redirect to the protected route
            navigate('/home');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
       {show ? <Register show={show} setShow={setShow} />:
        <div className="login-container">
            <div className="login-form">
                <h2>Swiggy Login</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button onClick={handleLogin}>Login</button>
              
                <a className="allredy-account" onClick={()=>setShow(!show)}>Do not have account ?</a>
            </div>
            
        </div>
    }
    </>
    );
};

export default Login;
