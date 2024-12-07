import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bgimage from '../images/loginbg.jpg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
     
      const response = await axios.post('http://localhost:5001/login', { email, password });
    
      localStorage.setItem('authToken', response.data.token);
  
      localStorage.setItem('username', response.data.user.name);   
      localStorage.setItem('division', response.data.user.division); 
      localStorage.setItem('id', response.data.user.id); 
      localStorage.setItem('role', response.data.user.role); 
      console.log(response); 
    
      navigate('/home');
    } catch (error) {
      
      setErrorMessage('Invalid credentials. Please try again.');
    }
    
  };
  
  

  return (
    <div>
      <img className='absolute h-[100vh] bg-red-200' alt='bg' src={bgimage} />
      <div id='wrapper_login' className="absolute z-10  left-[55%]  py-[30vh] w-[30vw]">
        <h1 className='mb-8 text-5xl font-bold text-center font-inter'> ARCHIEVER </h1>
        <h1 className='text-xl font-light text-center'> Silahkan masuk ke akun anda! </h1>
        <div>
          <form onSubmit={handleSubmit} className='grid grid-cols-1'>
            <label htmlFor='email'>
              <span className="block font-semibold mb-1 text-slate-700 after:content-['*'] after:text-pink-700 after:ml-0.5 font-inter">Email</span>
              <input
                type="email"
                id="email"
                placeholder="Email..."
                className="block w-full px-3 py-3 border rounded shadow text-md placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label htmlFor='password'>
              <span className="block font-semibold mb-1 text-slate-700 after:content-['*'] after:text-pink-700 after:ml-0.5 font-inter">Password</span>
              <input
                type="password"
                id="password"
                placeholder="Password..."
                className="block w-full px-3 py-3 border rounded shadow text-md placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <button type='submit' className='my-4 p-3 bg-[#566861] rounded-lg text-lg font-inter text-white '>Masuk</button>
          </form>
          <form>
            <button>Lupa kata sandi?</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
