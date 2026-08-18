import React, { useState, useEffect } from 'react'
import { FaEnvelope, FaLock, FaGraduationCap, FaSpinner } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/ui/Input'
import { toast } from 'react-toastify'
import type { LoginResponse } from '../../type/auth.type'
import { useLogin } from '../../hooks/auth/useAuth'

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { mutateAsync: login, isPending: isLoading } = useLogin();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData) as LoginResponse;
        const validRoles = ['Admin', 'Principal', 'Secretary'];
        
        if (validRoles.includes(user.role)) {
          redirectBasedOnRole(user.role);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
          toast.error('Unauthorized access. Please contact support.');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
      }
    }
  }, []);

  const redirectBasedOnRole = (role: string) => {
    switch (role) {
      case 'Admin':
        navigate('/admin', { replace: true });
        break;
      case 'Principal':
        navigate('/manager', { replace: true });
        break;
      case 'Secretary':
        navigate('/secretary', { replace: true });
        break;
      default:
        navigate('/', { replace: true });
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    

    if (!email || !email.trim()) {
      setError('Please enter a valid email address');
      toast.error('Invalid email format');
      return;
    }

    if (!password || !password.trim()) {
      setError('Password is require');
      toast.error('Password is require');
      return;
    }

    try {
      const response = await login({
        email: email,
        password: password,
      });

      if (!response.token || !response.role) {
        throw new Error('Invalid response from server');
      }

      localStorage.setItem('token', response.token);
      localStorage.setItem('userData', JSON.stringify(response));
      
      const validRoles = ['Admin', 'Principal', 'Secretary'];
      if (!validRoles.includes(response.role)) {
        toast.warning('You do not have permission to access this system');
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setError('Access denied. You do not have the required permissions.');
        return;
      }
      
      toast.success(`Welcome back, ${response.name || 'User'}!`);
      redirectBasedOnRole(response.role);

    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || 'Invalid email or password';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg border border-blue-gray-100 w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-dark-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-dark-blue-600/20">
              <FaGraduationCap className="text-white text-3xl" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-dark-blue-800">Login</h1>
          <p className="text-sm text-blue-gray-500 mt-1">Welcome back! Please login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            title="Email Address"
            placeholder="Enter your email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<FaEnvelope className="text-gray-400" size={18} />}
            required
          />

          <Input
            title="Password"
            placeholder="Enter your password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<FaLock className="text-gray-400" size={18} />}
            required
          />

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full cursor-pointer py-2.5 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-dark-blue-600 hover:bg-dark-blue-700'
            }`}
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" size={20} />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login