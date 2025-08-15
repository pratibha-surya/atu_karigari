import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { login } from '../../api/auth'; 
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';


const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext); 

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  
  const onSubmit = async ({ email, password }) => {
  try {
    const res = await login({ email, password });
    const accessToken = res?.data?.accessToken;

    if (accessToken) {
      await loginUser(accessToken); // ✅ wait until user is set
      toast.success('Login successful');
      navigate('/profile'); // ✅ only navigate when ready
    } else {
      toast.error('Login failed: No token received');
    }
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      'An error occurred while logging in. Please try again.';
    toast.error(message);
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        
        <div className="mb-4">
          <input
            type="email"
            {...register('email')}
            placeholder="Email"
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

      
        <div className="mb-4">
          <input
            type="password"
            {...register('password')}
            placeholder="Password"
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

      
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

       
        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
