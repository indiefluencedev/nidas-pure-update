import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Component/providers/AuthContext';
import GoogleSignInButton from '../Component/GoogleSignInButton';

// A single, reusable input component for a cleaner form structure
const FormInput = ({ type = 'text', placeholder, value, onChange, readOnly = false, hasError = false }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    readOnly={readOnly}
    className={`w-full bg-transparent text-white rounded-sm placeholder-emerald-400 border-b-2
                ${hasError ? 'border-red-500' : 'border-white/30'}
                focus:outline-none focus:border-emerald-400 transition-colors duration-300 py-2 text-lg
                ${readOnly ? 'cursor-not-allowed opacity-70' : ''}`}
  />
);

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [tab, setTab] = useState('login');
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [errorLogin, setErrorLogin] = useState('');
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const emailFromGoogle = new URLSearchParams(location.search).get('email');
  const nameFromGoogle = new URLSearchParams(location.search).get('name');
  const [fullName, setFullName] = useState(nameFromGoogle || '');
  const [emailReg, setEmailReg] = useState(emailFromGoogle || '');
  const [phone, setPhone] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorReg, setErrorReg] = useState({});
  const [successReg, setSuccessReg] = useState('');
  const [isLoadingReg, setIsLoadingReg] = useState(false);

  // --- Handlers (preserved from your original logic) ---

  const handleEmailLogin = async () => {
    setErrorLogin('');
    setIsLoadingLogin(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email: emailLogin, password: passwordLogin }
      );
      if (response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        await login(response.data.user, response.data.token);
        navigate('/');
      } else {
        setErrorLogin('Login failed. Please try again.');
      }
    } catch (error) {
      if (error.response?.status === 400)
        setErrorLogin('Invalid email or password.');
      else if (error.response?.status === 403)
        setErrorLogin('Please verify your email before logging in.');
      else
        setErrorLogin('An unexpected error occurred.');
    } finally {
      setIsLoadingLogin(false);
    }
  };

  const handleGoogleSuccess = async (googleToken, googleUserData) => {
    try {
      await login(googleUserData, googleToken);
      localStorage.setItem('token', googleToken);
      localStorage.setItem('user', JSON.stringify(googleUserData));
      navigate('/');
    } catch (error) {
      setErrorLogin('Google Login failed. Please try again.');
    }
  };

  const validateRegForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!fullName) errors.fullName = 'Full name is required';
    if (!emailReg || !emailRegex.test(emailReg))
      errors.email = 'A valid email is required';
    if (!phone || !phoneRegex.test(phone))
      errors.phone = 'A valid 10-digit phone number is required';
    if (!passwordReg || !passwordRegex.test(passwordReg))
      errors.password =
        'Password must be 8+ characters with uppercase, lowercase, number, and special character.';
    if (passwordReg !== confirmPassword)
      errors.confirmPassword = 'Passwords do not match';
    setErrorReg(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async () => {
    setErrorReg({});
    setSuccessReg('');
    if (!validateRegForm()) return;
    setIsLoadingReg(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        { fullName, email: emailReg, phone, password: passwordReg }
      );
      if (res.status === 201) {
        setSuccessReg('Success! Redirecting to OTP verification...');
        setTimeout(() => {
          navigate(`/verify-otp?email=${encodeURIComponent(emailReg)}`);
        }, 2000);
      } else {
        setErrorReg({ general: res.data.message || 'Registration failed.' });
      }
    } catch (error) {
      setErrorReg({
        general:
          error.response?.data?.message ||
          'Registration failed. The user may already exist.',
      });
    } finally {
      setIsLoadingReg(false);
    }
  };

  const autofillFixStyle = `
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px #00000050 inset !important;
        -webkit-text-fill-color: #fff !important;
        caret-color: #fff !important;
    }
  `;

  return (
    <>
      <style>{autofillFixStyle}</style>
      <div
        className="min-h-screen w-full bg-cover bg-center flex items-center justify-center py-20"
        style={{
          backgroundImage:
            "url('https://swbiyzvytjfdktklumyu.supabase.co/storage/v1/object/public/product-images/assets/ningyu-1l8MWtcx6tI-unsplash.jpg')",
        }}
      >
        <div className="w-full max-w-6xl mx-auto rounded-lg shadow-2xl flex flex-col lg:flex-row my-8">

          {/* LEFT PANEL: Clear Glass (Hidden on Mobile) */}
         <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 backdrop-blur-lg bg-white/10 border-b lg:border-b-0 lg:border-r border-white/20 text-left">
  {/* By removing 'items-center', the content block aligns to the left */}
  <div className="max-w-md">
    <h1 className="text-5xl font-bold text-white mb-6">
      Let's Get Started
    </h1>
    <p className="text-white/90 text-xl leading-relaxed">
      Join us to unlock a world of possibilities. Your journey begins with a single step.
    </p>
  </div>
</div>


          {/* RIGHT PANEL: Dark Glass & Form */}
          <div className="w-[350px]  mx-auto  lg:w-1/2 flex flex-col justify-center py-8  backdrop-blur-lg bg-white/10 rounded-lg lg:rounded-none">
            <div className="w-full max-w-md mx-auto h-auto md:h-[600px] px-5 flex flex-col">

              {/* TABS */}
              <div className="flex-shrink-0 flex justify-center mb-8 p-1 bg-black/20 rounded-lg space-x-2">
                 <button
                  onClick={() => setTab('login')}
                  className={`w-full font-semibold text-md px-4 py-2 rounded-md transition-all ${
                    tab === 'login' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-300 hover:bg-black/30'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setTab('register')}
                  className={`w-full font-semibold text-md px-4 py-2 rounded-md transition-all ${
                    tab === 'register' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-300 hover:bg-black/30'
                  }`}
                >
                  Register
                </button>
              </div>

              {/* FORM AREA */}
              <div className="flex-grow overflow-y-auto pr-2 space-y-6">
                {tab === 'login' ? (
                  <>
                    <h2 className="text-3xl font-bold rounded-sm  text-emerald-600 text-center">Sign In</h2>
                    <FormInput
                      type="email"
                      placeholder="Your Email"
                      value={emailLogin}
                      onChange={(e) => setEmailLogin(e.target.value)}
                    />
                    <div className="relative">
                       <FormInput
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={passwordLogin}
                        onChange={(e) => setPasswordLogin(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white text-sm"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    {errorLogin && (
                      <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-md">
                        <p className="text-red-300 text-sm text-center">{errorLogin}</p>
                      </div>
                    )}
                    <button
                      onClick={handleEmailLogin}
                      disabled={isLoadingLogin}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md transition-all disabled:opacity-60 text-lg"
                    >
                      {isLoadingLogin ? 'Signing In...' : 'Sign In'}
                    </button>
                    <div className="text-center text-sm text-gray-300">
                      Don't have an account?{' '}
                      <button
                        className="text-emerald-400 font-semibold hover:underline"
                        onClick={() => setTab('register')}
                      >
                        Register
                      </button>
                    </div>
                    <div className="flex items-center">
                      <hr className="flex-grow border-t border-white/20" />
                      <span className="mx-4 text-gray-400 text-xs">OR</span>
                      <hr className="flex-grow border-t border-white/20" />
                    </div>
                    <GoogleSignInButton onGoogleSuccess={handleGoogleSuccess} />
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-white text-center">Create Account</h2>
                    <FormInput
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      hasError={!!errorReg.fullName}
                    />
                    {errorReg.fullName && <p className="text-red-400 text-xs -mt-5 pl-1">{errorReg.fullName}</p>}

                    <FormInput
                      type="email"
                      placeholder="Email Address"
                      value={emailReg}
                      readOnly={!!emailFromGoogle}
                      onChange={(e) => setEmailReg(e.target.value)}
                      hasError={!!errorReg.email}
                    />
                    {errorReg.email && <p className="text-red-400 text-xs -mt-5 pl-1">{errorReg.email}</p>}

                    <FormInput
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      hasError={!!errorReg.phone}
                    />
                    {errorReg.phone && <p className="text-red-400 text-xs -mt-5 pl-1">{errorReg.phone}</p>}

                    <div className="relative">
                      <FormInput
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create Password"
                        value={passwordReg}
                        onChange={(e) => setPasswordReg(e.target.value)}
                        hasError={!!errorReg.password}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white text-sm"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    {errorReg.password && <p className="text-red-400 text-xs -mt-5 pl-1">{errorReg.password}</p>}

                    <div className="relative">
                      <FormInput
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Repeat Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        hasError={!!errorReg.confirmPassword}
                      />
                    </div>
                    {errorReg.confirmPassword && <p className="text-red-400 text-xs -mt-5 pl-1">{errorReg.confirmPassword}</p>}

                    {errorReg.general && (
                      <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-md">
                        <p className="text-red-300 text-sm text-center">{errorReg.general}</p>
                      </div>
                    )}
                    {successReg && (
                      <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-md">
                        <p className="text-green-300 text-sm text-center">{successReg}</p>
                      </div>
                    )}

                    <button
                      onClick={handleRegister}
                      disabled={isLoadingReg}
                      className="w-full py-3 mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md transition-all disabled:opacity-60 text-lg"
                    >
                      {isLoadingReg ? 'Creating Account...' : 'Sign Up'}
                    </button>
                    <div className="text-center text-sm text-gray-300">
                      Already a member?{' '}
                      <button
                        className="text-emerald-400 font-semibold hover:underline"
                        onClick={() => setTab('login')}
                      >
                        Login
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
