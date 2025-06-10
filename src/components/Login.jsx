import React, { useState } from 'react'
import {users} from './Utilities';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const onSubmitHandler = (e) =>{
        e.preventDefault();
        if(users[username] && users[username] === password){
            navigate('/directory')
            localStorage.setItem('username', username)
        } else{
             setError('Username or Password incorrect')
        }
    }

  return (
    <div className="login-wrap">
        <div className="login">
            <form action="" onSubmit={onSubmitHandler}>

            <div className="input-group">
                <label htmlFor="" className="login__label">Username</label>
                <input type="text" className="login__input" onChange={(e)=> setUsername(e.target.value)} value={username} />
                <div className="login__helper-text"></div>
            </div>
            <div className="input-group">
                <label htmlFor="" className="login__label">Password</label>
                <input type="password" className="login__input" onChange={(e) => setPassword(e.target.value)} value={password} />
                <div className="login__helper-text"></div>
            </div>
            {error && error}
            <button type="submit">Login</button>
            </form>
        </div>
    </div>
)
}

export default Login