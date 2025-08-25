// src/pages/Register.js
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function RegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const emailFromGoogle = new URLSearchParams(location.search).get('email');
  const nameFromGoogle = new URLSearchParams(location.search).get('name');

  const [fullName, setFullName] = useState(nameFromGoogle || '');
  const [email, setEmail] = useState(emailFromGoogle || '');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!fullName) errors.fullName = 'Full name is required';
    if (!email || !emailRegex.test(email))
      errors.email = 'Please enter a valid email address';
    if (!phone || !phoneRegex.test(phone))
      errors.phone = 'Please enter a valid 10-digit phone number';
    if (!password || !passwordRegex.test(password)) {
      errors.password = 'Password must include one uppercase, one lowercase, one number, and one special character';
    }
    if (password !== confirmPassword)
      errors.confirmPassword = 'Passwords do not match';

    setErrorMessage(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async () => {
    setErrorMessage({});
    setSuccessMessage('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        { fullName, email, phone, password }
      );

      if (res.status === 201) {
        setSuccessMessage('Registration successful! Redirecting to OTP verification...');
        setTimeout(() => {
          navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
        }, 2000);
      } else {
        setErrorMessage({ general: res.data.message || 'Registration failed' });
      }
    } catch (error) {
      setErrorMessage({
        general: error.response?.data?.message || 'Registration failed: User already exists or server error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative"
         style={{
           backgroundImage: `url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80')`
         }}>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative flex min-h-screen">
        {/* Left side - Welcome text */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Let's Get Started
          </h1>
          <p className="text-white text-opacity-90 text-lg md:text-xl max-w-lg leading-relaxed">
            Create your account to join our community. Unlock exclusive features and personalized experiences designed just for you.
          </p>
        </div>

        {/* Right side - Register form */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-full max-w-md">
            {/* Glassmorphism container */}
            <div className="backdrop-blur-xl bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Sign Up</h2>

              {/* Full Name Input */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent backdrop-blur-sm"
                />
                {errorMessage.fullName && (
                  <p className="text-red-300 text-sm mt-1">{errorMessage.fullName}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  readOnly={!!emailFromGoogle}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent backdrop-blur-sm"
                />
                {errorMessage.email && (
                  <p className="text-red-300 text-sm mt-1">{errorMessage.email}</p>
                )}
              </div>

              {/* Phone Input */}
              <div className="mb-4">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent backdrop-blur-sm"
                />
                {errorMessage.phone && (
                  <p className="text-red-300 text-sm mt-1">{errorMessage.phone}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="mb-4 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent backdrop-blur-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-opacity-70 hover:text-opacity-100 text-sm"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
                {errorMessage.password && (
                  <p className="text-red-300 text-sm mt-1">{errorMessage.password}</p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="mb-6 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent backdrop-blur-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-opacity-70 hover:text-opacity-100 text-sm"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
                {errorMessage.confirmPassword && (
                  <p className="text-red-300 text-sm mt-1">{errorMessage.confirmPassword}</p>
                )}
              </div>

              {/* Error/Success Messages */}
              {errorMessage.general && (
                <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-400 border-opacity-50 rounded-lg">
                  <p className="text-red-200 text-sm text-center">{errorMessage.general}</p>
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 bg-green-500 bg-opacity-20 border border-green-400 border-opacity-50 rounded-lg">
                  <p className="text-green-200 text-sm text-center">{successMessage}</p>
                </div>
              )}

              {/* Register Button */}
              <button
                onClick={handleRegister}
                disabled={isLoading}
                className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 mb-6"
              >
                {isLoading ? 'Creating Account...' : 'Sign up'}
              </button>

              {/* Divider */}
              <div className="flex items-center mb-6">
                <hr className="flex-grow border-t border-white border-opacity-30" />
                <span className="mx-4 text-white text-opacity-70 text-sm">OR</span>
                <hr className="flex-grow border-t border-white border-opacity-30" />
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3 mb-6">
                <button className="w-full py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>Continue with Google</span>
                </button>

                <button className="w-full py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>Continue with Twitter</span>
                </button>

                <button className="w-full py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>Continue with GitHub</span>
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <span className="text-white text-opacity-70 text-sm">
                  Already a Member?{' '}
                  <button
                    onClick={() => navigate('/login')}
                    className="text-white hover:text-opacity-80 underline font-medium"
                  >
                    Sign in here
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
