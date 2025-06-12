import React, { useState } from 'react'
import {users} from './Utilities';
import {useNavigate} from 'react-router-dom';
import Button from './Inputs/Button';
import icoDirectory from '../assets/directory-icon.svg'


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
            <div className="login__accent"></div>
            <div className="login__title">
                <img src={icoDirectory} style={{width: '2rem'}} alt="" />
                <span>Parish Directory</span>
                </div>
            {/* <h4 className='login__header'>Login.</h4> */}
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
            <Button className="login__btn" type='submit'>Login</Button>
            </form>
        </div>
    </div>
)
}

export default Login