import React, { useState } from 'react'
import './CSS/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { BallTriangle } from 'react-loader-spinner'
import axios from 'axios'
import { BaseURL, message } from '../Global'
import { useNavbarContext } from '../App'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const { setReloadNavbar,reloadNavbar } = useNavbarContext(); // Access the context

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      
      console.log(email, password)
      if (!email || !password) {
        message('All input fields are required')
        return
      }
      setLoader(true);
      const payload = { email, password }
      let res = await axios.post(`${BaseURL}/login-user`, payload);
      console.log(res.data.token)
      console.log(res.data.response._id)
      localStorage.setItem("token",res.data.token)
      localStorage.setItem("userId",res.data.response._id)
      setLoader(false);
      setReloadNavbar(!reloadNavbar)

      if (res.status === 200) {
        message('Logged In successfully')
        navigate('/')
      }
    }
    catch (error) {
      setLoader(false);
      if (error.response) {
        if (error.response.status === 400) {
        message('Invalid login Credentials');

        }
      } else {
        message('Network Error')

      }

    }
  }
  return (
    <div className='login'>

      <div className='loginDiv'>
        <h1>User Login</h1>
        <input type="text" placeholder='Email Id' value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <input type="text" placeholder='Your Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
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
        <button onClick={handleLogin}>{' Login '}</button>
        <p>Don't have an account?<Link to={'/register'}>SignUp</Link></p>
      </div>

    </div>
  )
}

export default Login