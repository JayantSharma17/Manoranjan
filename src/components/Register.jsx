import React, { useState } from 'react'
import './CSS/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BaseURL, message } from '../Global'
import { BallTriangle } from 'react-loader-spinner'




const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const navigate= useNavigate();

  const handleRegister = async () => {
    setLoader(true);
    try {
      console.log(username, email, password)
      if (!username || !email || !password) {
        message('All input fields are required')
      }
      const payload = { username, email, password }
      let res = await axios.post(`${BaseURL}/register-user`, payload);
      console.log(res)
      if (res.status === 201) {
        message('Your account is created successfully')
        navigate('/login')
      }
      else {
        message('Something went wrong')
      }
      setLoader(false);


    }
    catch (e) {
      setLoader(false);

      console.log(e);
      message(e.response.data.message)

    }
  }
  return (
    <div className='login'>

      <div className='loginDiv' >
        <h1>Create your Account</h1>
        <input type="text" placeholder='Full Name' value={username} onChange={(e) => { setUsername(e.target.value) }} />
        <input type="text" placeholder='Email Id' value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <input type="text" placeholder='Create Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
        <BallTriangle
          height={50}
          width={50}
          radius={5}
          color="white"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={loader}
        />
        <button onClick={handleRegister}>Create Account</button>
        <p>Already have an account?<Link to={'/login'}>Login</Link></p>
      </div>

    </div>
  )
}

export default Register