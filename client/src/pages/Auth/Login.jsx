import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import toast from 'react-hot-toast';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/Auth';

const Login = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleForm = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        try {
            const response = await fetch(`${API_URL}/api/v1/auth/login`, {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            });


            if (response.ok) {
              const responseData = await response.json();
              setAuth({
                ...auth,
                user: responseData.user,
                token: responseData.token,
              });
              localStorage.setItem("auth", JSON.stringify(responseData));
              console.log(responseData.user);
              console.log(responseData.token);
              if(responseData.success===false) toast.error(responseData.message);
              else{
                 toast.success(responseData.message); 
                setTimeout(()=> navigate(location.state || "/"), 1000);
              }
            } else {
              const errorMessage = await response.json();
              toast.error(errorMessage.message); 
            }
            
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-slate-200">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                onChange={handleForm}
                value={user.email}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                minLength={6}
                onChange={handleForm}
                value={user.password}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
