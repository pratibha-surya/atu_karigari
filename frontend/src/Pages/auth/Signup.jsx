import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signup } from '../../api/auth'; 
import { useNavigate, Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthContext from '../context/AuthContext';
import { useContext, useState } from 'react';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await signup(data);
      console.log('Signup response:', res);

      const accessToken = res?.data?.accessToken;
      if (!accessToken) {
        throw new Error('Access token not received');
      }

      
      loginUser(accessToken);
      toast.success('Signup successful! You are now logged in.');

      
      navigate('/login');  

    } catch (err) {
      console.error('Signup error:', err.response || err);
      const message = err?.response?.data?.message || err.message || 'An unexpected error occurred';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-sm relative">
        <h2 className="text-2xl font-semibold mb-4 text-center">Signup</h2>

        
        <div className="mb-4">
          <input
            type="email"
            {...register('email')}
            placeholder="Email"
            aria-invalid={errors.email ? 'true' : 'false'}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        
        <div className="mb-4 relative">
          <input
            type={passwordVisible ? 'text' : 'password'}
            {...register('password')}
            placeholder="Password"
            aria-invalid={errors.password ? 'true' : 'false'}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`}
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(prev => !prev)}
            className="absolute right-4 top-4 text-gray-500"
          >
            👁️
          </button>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isLoading ? 'Signing up...' : 'Signup'}
        </button>

       
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
