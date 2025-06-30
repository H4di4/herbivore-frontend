import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/admin/login', { email, password },);
      
      console.log('Login response:', res.data);
      const { token } = res.data;
      localStorage.setItem('token', token);


      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-white mt-10">
      <h1 className='font-normal text-3xl mb-0 text-center'>ADMIN PANEL</h1>

      <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8">
          <div>
            <h2 className="text-center text-2xl tracking-wider text-neutral-800">LOGIN</h2>
            <p className="mt-4 text-center text-[16px] text-neutral-800">
              Enter your email and password to login:
            </p>
            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 h-[50px] w-[450px] px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-black focus:border-black"
                  placeholder="E-mail"
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 h-[50px] w-[450px] px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-black focus:border-black"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-[450px] h-[50px] flex justify-center py-2 px-4 border border-transparent text-lg tracking-wider bg-stone-800 text-white"
              >
                LOGIN
              </button>
            </div>
          </form>

          <div className="text-center text-sm text-neutral-800">
            <p className="mb-8">
              Don't have an account? <a href="#" className="text-neutral-800">Sign up</a>
            </p>
            <p className="mt-2">
              <a href="#" className="text-neutral-800">Manage subscriptions</a>
            </p>
          </div>
        </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default AdminLogin;
