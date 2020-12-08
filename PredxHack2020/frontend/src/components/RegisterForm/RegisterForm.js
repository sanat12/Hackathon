import React, { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {register} from '../../redux/actions/authAction'
import './RegisterForm.css'
import { message} from 'antd';

function RegisterForm() {
    let [username,setUsername] = useState('')
    let [email,setEmail] = useState('')
    let [password,setPassword] = useState('')
    let [confirm,setConfirm]=useState('')
    const dispatch = useDispatch()
    const err = useSelector(state => state.error)
    
   const ValidateEmail=(email)=> 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
  {
    return (true)
  }
    return (false)
}

    const error = (value) => {
        message.error(value);
      };
    
    const handleRegister = (event)=>{
        event.preventDefault();
        var n = username.charCodeAt(0);
        console.log(n)
        if(username.length<4||!((n>=97&&n<=122)||(n>=65&&n<=90))){
            error("Enter valid username!!")
        }
        else if(!ValidateEmail(email)){
            error("Please enter a valid email id!!")
        }
        else if(password!=confirm){
            error("Passwords do not match")
        }
        else{
        const newUser = {
            username,
            email,
            password
        }
        dispatch(register(newUser))
        clearInputFields()
        }
    }

    const clearInputFields = ()=>{
        setUsername('');
        setEmail('');
        setPassword('');
    }


    return (
        <div className='formContainer registerContainer' method='POST'>
            <form>
                <h1>Create Account</h1>
                <input type='text' placeholder='Username' value={username} onChange={(event)=>setUsername(event.target.value)}/>
                <input type='email' placeholder='Email' value={email} onChange={(event)=>setEmail(event.target.value)} />
                <input type='password' placeholder='Password' value={password} onChange={(event)=>setPassword(event.target.value)}/>
                <input type='password' placeholder='Confrirm Password' value={confirm} onChange={(event)=>setConfirm(event.target.value)}/>
                <button onClick={handleRegister}>Submit</button>
            </form>
        </div>
    )
}

export default RegisterForm
