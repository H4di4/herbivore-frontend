import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();

  const [isRegister, setIsRegister] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      console.log('token set:', localStorage.getItem('token'));
      localStorage.removeItem('jwtToken');
      console.log('jwtToken after removal:', localStorage.getItem('jwtToken'));


      navigate('/profile');  // Navigate to homepage or dashboard on success
    } catch (err) {
      setError(t('invalidEmailOrPassword'));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/register', { firstName, lastName, email, password });
      alert(t('registrationSuccess'));
      resetForm();
      setIsRegister(false);
    } catch (err) {
      setError(err.response?.data?.msg || t('registrationFailed') || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8">
          <div>
            <h2 className="text-center text-2xl tracking-wider text-neutral-800">
              {isRegister ? t('signup') : t('login')}
            </h2>
            <p className="mt-4 text-center text-[16px] text-neutral-800">
              {isRegister ? t('pleaseFill') : t('enterEmailPassword')}
            </p>
            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
          </div>

          <form
            onSubmit={isRegister ? handleRegister : handleLogin}
            className="mt-8 space-y-6"
          >
            <div className="space-y-4">
              {isRegister && (
                <>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 h-[50px] w-[450px] px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-black focus:border-black"
                    placeholder={t('firstName')}
                  />
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 h-[50px] w-[450px] px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-black focus:border-black"
                    placeholder={t('lastName')}
                  />
                </>
              )}

              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 h-[50px] w-[450px] px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-black focus:border-black"
                placeholder={t('email')}
              />

              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 h-[50px] w-[450px] px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-black focus:border-black"
                placeholder={t('password')}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-[450px] h-[46px] flex justify-center font-normal text-[16px] py-2 px-4 border border-transparent bg-[rgb(59,59,59)] text-white"
              >
                {isRegister ? t('createAccount') : t('loginBtn')}
              </button>
            </div>
          </form>

          <div className="text-center text-sm text-neutral-800">
            {isRegister ? (
              <p className="mb-8">
                {t('alreadyHaveAccount')}{' '}
                <button
                  onClick={() => {
                    resetForm();
                    setIsRegister(false);
                  }}
                  className="text-neutral-800"
                >
                  {t('loginBtn')}
                </button>
              </p>
            ) : (
              <p className="mb-8">
                {t('dontHaveAccount')}{' '}
                <button
                  onClick={() => {
                    resetForm();
                    setIsRegister(true);
                  }}
                  className="text-neutral-800"
                >
                  {t('signUpBtn')}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-36">
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
};

export default Login;
